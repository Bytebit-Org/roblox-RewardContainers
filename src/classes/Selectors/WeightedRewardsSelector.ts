import { IRewardsSelector } from "../../interfaces/IRewardsSelector";
import { Reward } from "../../types/Reward";

type RewardOption = {
	/** Whether the reward option can be used multiple times in one rewards selection (i.e. whether to sample with replacement) */
	canBeDuplicated: boolean;

	/** The cost of the reward option, to be subtracted from the remaining value for the list of rewards being selected */
	cost: number;

	/** The reward that the option gives */
	reward: Reward;

	/** The weight assigned to this option in the random distribution */
	weight: number;
};

/**
 * A rewards selector that selects a list of rewards based on a weighted random sample and allowing up to a given value in the total list.
 * Reward options have an assigned cost and weight.
 * The weight is used to give allow for non-uniform random sampling of the options.
 * The cost is used to subtract from the value such that the sum of the option costs for the selected rewards list never exceeds the given value.
 * A maximum number of rewards, regardless of the the remaining value, can also be imposed.
 */
export class WeightedRewardsSelector implements IRewardsSelector {
	/**
	 * Use the create method instead
	 */
	private constructor(
		private maximumNumberOfRewards: number,
		private readonly random: Random,
		private readonly rewardOptionsSorted: ReadonlyArray<RewardOption>,
		private value: number,
	) {}

	/**
	 * Creates a new instance
	 * @param this
	 * @param maximumNumberOfRewards The maximum number of rewards that can be granted in one list. Use math.huge to ignore.
	 * @param random A random instance.
	 * @param rewardOptions The reward options to randomly sample when selecting a new list.
	 * @param value The maximum value of any selected list of rewards as a sum of their reward options cost.
	 */
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

	/**
	 * Sets the maximum number of rewards that can be selected together in a list
	 * @param maximumNumberOfRewards The new maximum number of rewards
	 */
	public setMaximumNumberOfRewards(maximumNumberOfRewards: number) {
		this.maximumNumberOfRewards = maximumNumberOfRewards;
	}

	/**
	 * Sets the maximum value of rewards that can be selected together in a list
	 * @param value The new value
	 */
	public setValue(value: number) {
		this.value = value;
	}

	public selectRewards() {
		return this.selectRewardsAsync().expect();
	}

	public async selectRewardsAsync() {
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

		return selectedRewards;
	}
}
