import inspect from "@rbxts/inspect";
import { DataStoreService } from "@rbxts/services";
import { ISignal } from "@rbxts/signals-tooling";
import { SignalFactory } from "../../factories/SignalFactory";
import { attemptTaskWithUnlimitedRetries } from "../../functions/AttemptTaskWithUnlimitedRetries";
import { IRewardsOpeningCoordinator } from "../../interfaces/IRewardsOpeningCoordinator";
import { BaseRewardContainer } from "./BaseRewardContainer";

function generateKey(player: Player, rewardsContainerName: string) {
	return `player_userId:${player.UserId}_rewardsContainerName:${rewardsContainerName}`;
}

const DEFAULT_DATASTORE_NAME = "RecurringTimeLockedRewardsContainerDefaultPersister";

const defaultPersister = {
	loadUnlockUnixTimestampForPlayerAsync: async (player: Player, rewardsContainerName: string) => {
		const dataStore = DataStoreService.GetDataStore(DEFAULT_DATASTORE_NAME);
		if (dataStore === undefined) {
			throw `Could not load data store`;
		}

		const currentData = await Promise.promisify(() =>
			dataStore.GetAsync(generateKey(player, rewardsContainerName)),
		);
		if (currentData === undefined) {
			return 0;
		}

		if (!typeIs(currentData, "number")) {
			warn(`Invalid data stored for player ${player.Name} - expected a number, got ${inspect(currentData)}`);
			return 0;
		}

		return currentData;
	},

	saveUnlockUnixTimestampForPlayerAsync: async (
		player: Player,
		unlockUnixTimestamp: number,
		rewardsContainerName: string,
	) => {
		const dataStore = DataStoreService.GetDataStore(DEFAULT_DATASTORE_NAME);
		if (dataStore === undefined) {
			throw `Could not load data store`;
		}

		dataStore.SetAsync(generateKey(player, rewardsContainerName), unlockUnixTimestamp);
	},
};

/**
 * A reward container that can be opened multiple times and persists its next unlock Unix timestamp between play sessions for each player
 * Once opened the container will lock itself for a given period of time
 * Useful for creating things like daily login reward systems
 */
export class RecurringTimeLockedRewardContainer extends BaseRewardContainer {
	private nextUnlockUnixTimestamp: number;
	private readonly nextUnlockUnixTimestampChanged: ISignal;

	/**
	 * Use the create method instead
	 * Set to protected only for unit testing
	 */
	protected constructor(
		private readonly dateTimeConstructor: DateTimeConstructor,
		private readonly name: string,
		private readonly recurrenceIntervalInSeconds: number,
		rewardedPlayer: Player,
		rewardsOpeningCoordinator: IRewardsOpeningCoordinator,
		signalFactory: SignalFactory,
		private readonly loadUnlockUnixTimestampForPlayerAsync: (
			player: Player,
			rewardsContainerName: string,
		) => Promise<number>,
		private readonly saveUnlockUnixTimestampForPlayerAsync: (
			player: Player,
			unlockUnixTimestamp: number,
			rewardsContainerName: string,
		) => Promise<void>,
	) {
		super(rewardedPlayer, rewardsOpeningCoordinator);

		this.nextUnlockUnixTimestampChanged = signalFactory.createInstance();

		this.nextUnlockUnixTimestamp = math.huge;

		this.loadUnlockUnixTimestampWithRetries();
	}

	/**
	 * Used to create a new instance
	 * @param this
	 * @param name A name to use for logging purposes
	 * @param recurrenceIntervalInSeconds The recurrence interval to use in between opening and unlocking
	 * @param rewardedPlayer The player to associate with the reward container
	 * @param rewardsOpeningCoordinator The opening coordinator to use upon opening
	 * @param persister A persister that is used to load and save the unlock unix timestamp for the player for this reward container.
	 * Note that if none is provided, a default one that uses DataStoreService will be used and for new players the reward container will be open immediately.
	 */
	public static create(
		this: void,
		name: string,
		recurrenceIntervalInSeconds: number,
		rewardedPlayer: Player,
		rewardsOpeningCoordinator: IRewardsOpeningCoordinator,
		persister?: {
			readonly loadUnlockUnixTimestampForPlayerAsync: (
				player: Player,
				rewardsContainerName: string,
			) => Promise<number>;
			readonly saveUnlockUnixTimestampForPlayerAsync: (
				player: Player,
				unlockUnixTimestamp: number,
				rewardsContainerName: string,
			) => Promise<void>;
		},
	) {
		if (persister === undefined) {
			persister = defaultPersister;
		}

		return new RecurringTimeLockedRewardContainer(
			DateTime,
			name,
			recurrenceIntervalInSeconds,
			rewardedPlayer,
			rewardsOpeningCoordinator,
			new SignalFactory(),
			persister.loadUnlockUnixTimestampForPlayerAsync,
			persister.saveUnlockUnixTimestampForPlayerAsync,
		);
	}

	public canOpen() {
		const currentUnixTimestamp = this.dateTimeConstructor.now().UnixTimestamp;
		return currentUnixTimestamp >= this.nextUnlockUnixTimestamp;
	}

	/**
	 * Hooks up a handler function to run when the next unlock Unix timestamp changes
	 * @param handler The function to run
	 */
	public connectToUnlockUnixTimestampChanges(handler: () => void) {
		return this.nextUnlockUnixTimestampChanged.Connect(handler);
	}

	/**
	 * Gets the next unlock Unix timestamp
	 */
	public getNextUnlockUnixTimestamp() {
		return this.nextUnlockUnixTimestamp;
	}

	public open() {
		this.openAsync().expect();
	}

	public async openAsync() {
		// this superOpenPromise thing is to get around a compiler bug
		// https://github.com/roblox-ts/roblox-ts/issues/1266
		const superOpenPromise = super.openAsync();

		await superOpenPromise.then(() => {
			const currentUnixTimestamp = this.dateTimeConstructor.now().UnixTimestamp;
			this.setNextUnlockUnixTimestamp(currentUnixTimestamp + this.recurrenceIntervalInSeconds);

			this.saveUnlockUnixTimestampWithRetries();
		});
	}

	private async loadUnlockUnixTimestampWithRetries() {
		attemptTaskWithUnlimitedRetries(async () => {
			this.setNextUnlockUnixTimestamp(
				await this.loadUnlockUnixTimestampForPlayerAsync(this.rewardedPlayer, this.name),
			);
		}, `Load Unlock Unix Timestamp for Player ${this.rewardedPlayer.Name}'s Rewards Container Named "${this.name}"`);
	}

	private async saveUnlockUnixTimestampWithRetries() {
		attemptTaskWithUnlimitedRetries(async () => {
			await this.saveUnlockUnixTimestampForPlayerAsync(
				this.rewardedPlayer,
				this.nextUnlockUnixTimestamp,
				this.name,
			);
		}, `Save Unlock Unix Timestamp for Player ${this.rewardedPlayer.Name}'s Rewards Container Named "${this.name}"`);
	}

	private setNextUnlockUnixTimestamp(newValue: number) {
		this.nextUnlockUnixTimestamp = newValue;
		this.nextUnlockUnixTimestampChanged.fire();
	}
}
