import inspect from "@rbxts/inspect";
import { DataStoreService } from "@rbxts/services";
import { ISignal } from "@rbxts/signals-tooling";
import { SignalFactory } from "factories/SignalFactory";
import { attemptTaskWithUnlimitedRetries } from "functions/AttemptTaskWithUnlimitedRetries";
import { IRewardsOpeningCoordinator } from "interfaces/IRewardsOpeningCoordinator";
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

export class RecurringTimeLockedRewardContainer extends BaseRewardContainer {
	private readonly nextUnlockUnixTimestampChanged: ISignal;

	private nextUnlockUnixTimestamp: number;

	private constructor(
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
		super(rewardedPlayer, rewardsOpeningCoordinator, signalFactory);

		this.nextUnlockUnixTimestampChanged = signalFactory.createInstance();

		this.nextUnlockUnixTimestamp = math.huge;

		this.loadUnlockUnixTimestampWithRetries();
	}

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

	public connectToUnlockUnixTimestampChanges(handler: () => void) {
		return this.nextUnlockUnixTimestampChanged.Connect(handler);
	}

	public getNextUnlockUnixTimestamp() {
		return this.nextUnlockUnixTimestamp;
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
