import { IRewardGranter } from "interfaces/IRewardGranter";
import { IRewardsOpeningCoordinator } from "interfaces/IRewardsOpeningCoordinator";
import { IRewardsSelector } from "interfaces/IRewardsSelector";

export class StandardRewardsOpeningCoordinator implements IRewardsOpeningCoordinator {
	private constructor(
		private readonly rewardsSelector: IRewardsSelector,
		private readonly rewardGrantersByRewardType: ReadonlyMap<string, IRewardGranter>,
	) {}

	public static create(
		this: void,
		rewardsSelector: IRewardsSelector,
		rewardGrantersByRewardType: ReadonlyMap<string, IRewardGranter>,
	) {
		return new StandardRewardsOpeningCoordinator(rewardsSelector, rewardGrantersByRewardType);
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
