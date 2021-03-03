import { IRewardsOpeningCoordinator } from "../../interfaces/IRewardsOpeningCoordinator";
import { BaseRewardContainer } from "./BaseRewardContainer";

/**
 * A reward container that cannot be opened until the given unlock Unix timestamp
 * Meant to be opened only once
 * Useful for things like time-locked loot crates
 */
export class TimeLockedRewardContainer extends BaseRewardContainer {
	private hasBeenOpened = false;

	/**
	 * @hidden
	 * Use the create method instead
	 */
	private constructor(
		private readonly dateTimeConstructor: DateTimeConstructor,
		rewardedPlayer: Player,
		rewardsOpeningCoordinator: IRewardsOpeningCoordinator,
		public readonly unlockUnixTimestamp: number,
	) {
		super(rewardedPlayer, rewardsOpeningCoordinator);
	}

	/**
	 * Creates a new instance
	 * @param this
	 * @param rewardedPlayer The player to associate with the reward container
	 * @param rewardsOpeningCoordinator The opening coordinator to use upon opening
	 * @param unlockUnixTimestamp The timestamp after which the reward container can be opened
	 */
	public static create(
		this: void,
		rewardedPlayer: Player,
		rewardsOpeningCoordinator: IRewardsOpeningCoordinator,
		unlockUnixTimestamp: number,
	) {
		return new TimeLockedRewardContainer(DateTime, rewardedPlayer, rewardsOpeningCoordinator, unlockUnixTimestamp);
	}

	/**
	 * Gets the unlock Unix timestamp
	 */
	public getUnlockUnixTimestamp() {
		return this.unlockUnixTimestamp;
	}

	public canOpen() {
		if (this.hasBeenOpened) {
			return false;
		}

		const currentUnixTimestamp = this.dateTimeConstructor.now().UnixTimestamp;
		return currentUnixTimestamp >= this.unlockUnixTimestamp;
	}

	public open() {
		this.openAsync().expect();
	}

	public async openAsync() {
		// this superOpenPromise thing is to get around a compiler bug
		// https://github.com/roblox-ts/roblox-ts/issues/1266
		const superOpenPromise = super.openAsync();

		await superOpenPromise.then(() => (this.hasBeenOpened = true));
	}
}
