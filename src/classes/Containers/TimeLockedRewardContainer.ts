import { SignalFactory } from "factories/SignalFactory";
import { IRewardsOpeningCoordinator } from "interfaces/IRewardsOpeningCoordinator";
import { BaseRewardContainer } from "./BaseRewardContainer";

export class TimeLockedRewardContainer extends BaseRewardContainer {
	private hasBeenOpened = false;

	private constructor(
		private readonly dateTimeConstructor: DateTimeConstructor,
		rewardedPlayer: Player,
		rewardsOpeningCoordinator: IRewardsOpeningCoordinator,
		signalFactory: SignalFactory,
		public readonly unlockUnixTimestamp: number,
	) {
		super(rewardedPlayer, rewardsOpeningCoordinator, signalFactory);
	}

	public static create(
		this: void,
		rewardedPlayer: Player,
		rewardsOpeningCoordinator: IRewardsOpeningCoordinator,
		unlockUnixTimestamp: number,
	) {
		return new TimeLockedRewardContainer(DateTime, rewardedPlayer, rewardsOpeningCoordinator, new SignalFactory(), unlockUnixTimestamp);
	}

	public canOpen() {
		if (this.hasBeenOpened) {
			return false;
		}

		const currentUnixTimestamp = this.dateTimeConstructor.now().UnixTimestamp;
		return currentUnixTimestamp >= this.unlockUnixTimestamp;
	}

	public async openAsync() {
		// this superOpenPromise thing is to get around a compiler bug
		// https://github.com/roblox-ts/roblox-ts/issues/1266
		const superOpenPromise = super.openAsync();

		await superOpenPromise.then(() => (this.hasBeenOpened = true));
	}
}
