import { IRewardsOpeningCoordinator } from "../../interfaces/IRewardsOpeningCoordinator";
import { BaseRewardContainer } from "./BaseRewardContainer";

/**
 * A basic reward container that can only be opened once but is ready to open as soon as it is created
 */
export class StandardRewardContainer extends BaseRewardContainer {
	private hasBeenOpened = false;

	/**
	 * @hidden
	 * Use the create method instead
	 */
	private constructor(rewardedPlayer: Player, rewardsOpeningCoordinator: IRewardsOpeningCoordinator) {
		super(rewardedPlayer, rewardsOpeningCoordinator);
	}

	/**
	 * Creates a new instance
	 * @param this
	 * @param rewardedPlayer The player to associate with the reward container
	 * @param rewardsOpeningCoordinator The opening coordinator to use upon opening
	 */
	public static create(this: void, rewardedPlayer: Player, rewardsOpeningCoordinator: IRewardsOpeningCoordinator) {
		return new StandardRewardContainer(rewardedPlayer, rewardsOpeningCoordinator);
	}

	public canOpen() {
		return !this.hasBeenOpened;
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
