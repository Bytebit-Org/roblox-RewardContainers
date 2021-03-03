import { IRewardGranter } from "../../interfaces/IRewardGranter";
import { IRewardsOpeningCoordinator } from "../../interfaces/IRewardsOpeningCoordinator";
import { IRewardsSelector } from "../../interfaces/IRewardsSelector";

/**
 * A standard rewards opening coordinator.
 * This coordinator will select rewards from the given rewards selector and then grant each one.
 */
export class StandardRewardsOpeningCoordinator implements IRewardsOpeningCoordinator {
	/**
	 * @hidden
	 * Use the create method instead
	 */
	private constructor(
		private readonly rewardsSelector: IRewardsSelector,
		private readonly rewardGrantersByRewardType: ReadonlyMap<string, IRewardGranter>,
	) {}

	/**
	 * Creates a new instance
	 * @param this
	 * @param rewardGrantersByRewardType The reward granters to use keyed by the type of reward that they grant
	 * @param rewardsSelector The rewards selector to use when coordinating a new opening sequence
	 */
	public static create(
		this: void,
		rewardGrantersByRewardType: ReadonlyMap<string, IRewardGranter>,
		rewardsSelector: IRewardsSelector,
	) {
		return new StandardRewardsOpeningCoordinator(rewardsSelector, rewardGrantersByRewardType);
	}

	public coordinateOpening(rewardedPlayer: Player) {
		return this.coordinateOpeningAsync(rewardedPlayer).expect();
	}

	public async coordinateOpeningAsync(rewardedPlayer: Player) {
		const rewards = await this.rewardsSelector.selectRewardsAsync();

		await Promise.allSettled(
			rewards.map(
				(reward) =>
					new Promise<void>((resolve, reject) => {
						const rewardGranter = this.rewardGrantersByRewardType.get(reward.type);
						if (rewardGranter === undefined) {
							throw `Could not find reward granter for reward of type "${reward.type}"`;
						}

						rewardGranter
							.grantRewardAsync(reward, rewardedPlayer)
							.then(() => resolve())
							.catch((reason) => reject(reason));
					}),
			),
		);

		return rewards;
	}
}
