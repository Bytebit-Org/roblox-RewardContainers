import { ISignal, Signal } from "@rbxts/signals-tooling";
import { IRewardContainer } from "interfaces/IRewardContainer";
import { IRewardsOpeningCoordinator } from "interfaces/IRewardsOpeningCoordinator";
import { Reward } from "types/Reward";

/**
 * An abstract class that provides the standard logic for opening a container
 * Needs canOpen to be implemented by subclasses
 */
export abstract class BaseRewardContainer implements IRewardContainer {
	public readonly opened: ISignal<(rewards: ReadonlyArray<Reward>) => void>;

	private isOpening = false;

	/**
	 * Sets up the super properties
	 * @param rewardedPlayer The player to associate with the reward container
	 * @param rewardsOpeningCoordinator The opening coordinator to use upon opening
	 */
	protected constructor(
		protected readonly rewardedPlayer: Player,
		private readonly rewardsOpeningCoordinator: IRewardsOpeningCoordinator,
	) {
		this.opened = new Signal<(rewards: ReadonlyArray<Reward>) => void>();
	}

	public async openAsync() {
		if (!this.canOpen()) {
			throw `Attempted to open rewards container of type ${getmetatable(this)} which is not yet ready to open.`;
		}

		if (this.isOpening) {
			warn(`Attempt to open rewards container multiple times simultaneously`);
			return;
		}

		this.isOpening = true;

		await this.rewardsOpeningCoordinator
			.coordinateOpeningAsync(this.rewardedPlayer)
			.then((rewards) => this.opened.fire(rewards))
			.finally(() => {
				this.isOpening = false;
			});
	}

	public abstract canOpen(): boolean;
}
