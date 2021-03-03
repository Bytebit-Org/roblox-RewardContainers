import { IRewardsSelector } from "../../interfaces/IRewardsSelector";
import { Reward } from "../../types/Reward";

type RewardsSeriesEntry = {
	modulusValue: number;
	priority: number;
	rewards: ReadonlyArray<Reward>;
};

/**
 * A rewards selector that will deterministically select rewards from a provided, repeating series.
 * The series is defined by a default reward set and then individual reward series entries.
 * Each reward series entry provides a modulus value, its priority, and then the reward set it provides.
 * Each time the rewards selector selects rewards, it will execute the following algorithm:
 * 1. Get all reward series entries such that the formula `seriesIndex % rewardSeriesEntry.modulusValue` is equal to 0
 * 2. If no reward series entries were found, return the default rewards set
 * 3. Otherwise, find the reward series entry with the highest value (ties broken at random) and return its rewards set
 *
 * For example, a series in which every fifth index gives a different prize would have a default prize
 * and one reward series entry with a modulus value of 5.
 */
export class RepeatingSeriesRewardsSelector implements IRewardsSelector {
	/**
	 * Use the create method instead
	 */
	private constructor(
		private readonly defaultRewards: ReadonlyArray<Reward>,
		private readonly rewardsSeriesEntriesSorted: ReadonlyArray<RewardsSeriesEntry>,
		private seriesIndex: number,
	) {}

	/**
	 * Creates a new instance
	 * @param this
	 * @param defaultRewards The default rewards for the series
	 * @param rewardsSeriesEntries The reward series entries
	 * @param seriesIndex The current series index, which can be changed later
	 */
	public static create(
		this: void,
		defaultRewards: ReadonlyArray<Reward>,
		rewardsSeriesEntries: ReadonlyArray<RewardsSeriesEntry>,
		seriesIndex: number,
	) {
		const rewardsSeriesEntriesSorted = [...rewardsSeriesEntries];
		table.sort(rewardsSeriesEntriesSorted, (a, b) => a.priority > b.priority);

		return new RepeatingSeriesRewardsSelector(defaultRewards, rewardsSeriesEntries, seriesIndex);
	}

	/**
	 * Increments the series index by one
	 */
	public incrementSeriesIndex() {
		this.seriesIndex++;
	}

	/**
	 * Directly sets the series index to the given value
	 * @param newValue The new series index value
	 */
	public setSeriesIndex(newValue: number) {
		this.seriesIndex = newValue;
	}

	public selectRewards() {
		return this.selectRewardsAsync().expect();
	}

	public async selectRewardsAsync() {
		// cache current value since it is mutable
		const seriesIndex = this.seriesIndex;

		for (const rewardsSeriesEntry of this.rewardsSeriesEntriesSorted) {
			if (seriesIndex % rewardsSeriesEntry.modulusValue === 0) {
				return rewardsSeriesEntry.rewards;
			}
		}

		return this.defaultRewards;
	}
}
