import { IRewardsSelector } from "interfaces/IRewardsSelector";
import { Reward } from "types/Reward";

type RewardOption = {
	canBeDuplicated: boolean;
	cost: number;
	reward: Reward;
	weight: number;
};

export class WeightedRewardsSelector implements IRewardsSelector {
	private constructor(
		private maximumNumberOfRewards: number,
		private readonly random: Random,
		private readonly rewardOptionsSorted: ReadonlyArray<RewardOption>,
		private value: number,
	) {}

	public static create(
		this: void,
		maximumNumberOfRewards: number,
		random: Random,
		rewardOptions: ReadonlyArray<RewardOption>,
		value: number,
	) {
		const rewardOptionsSorted = [...rewardOptions];
		table.sort(rewardOptionsSorted, (a, b) => a.cost < b.cost);

		return new WeightedRewardsSelector(maximumNumberOfRewards, random, rewardOptionsSorted, value);
	}

	public setMaximumNumberOfRewards(maximumNumberOfRewards: number) {
		this.maximumNumberOfRewards = maximumNumberOfRewards;
	}

	public setValue(value: number) {
		this.value = value;
	}

	public selectRewardsAsync() {
		// cache current value since it is mutable
		const maximumNumberOfRewards = this.maximumNumberOfRewards;

		const availableRewardOptionsSorted = [...this.rewardOptionsSorted];
		let remainingValue = this.value;
		const selectedRewards = new Array<Reward>();

		while (remainingValue > 0 && selectedRewards.size() < maximumNumberOfRewards) {
			for (let i = availableRewardOptionsSorted.size() - 1; i >= 0; i--) {
				if (availableRewardOptionsSorted[i].cost > remainingValue) {
					availableRewardOptionsSorted.remove(i);
				} else {
					break;
				}
			}

			const availableRewardOptionsSize = availableRewardOptionsSorted.size();
			if (availableRewardOptionsSize === 0) {
				break;
			}

			const weightsSum = availableRewardOptionsSorted.reduce((sum, rewardOption) => sum + rewardOption.weight, 0);
			const selectedRewardOptionRandomValue = this.random.NextInteger(1, weightsSum);
			let weightsSeenSum = 0;
			const selectedRewardOptionIndex = availableRewardOptionsSorted.findIndex((rewardOption) => {
				const previousWeightsSeenSum = weightsSeenSum;
				weightsSeenSum += rewardOption.weight;

				return (
					previousWeightsSeenSum <= selectedRewardOptionRandomValue &&
					selectedRewardOptionRandomValue < weightsSeenSum
				);
			});
			const selectedRewardOption = availableRewardOptionsSorted[selectedRewardOptionIndex];

			selectedRewards.push(selectedRewardOption.reward);
			remainingValue -= selectedRewardOption.cost;

			if (!selectedRewardOption.canBeDuplicated) {
				availableRewardOptionsSorted.remove(selectedRewardOptionIndex);
			}
		}

		return Promise.resolve(selectedRewards);
	}
}
