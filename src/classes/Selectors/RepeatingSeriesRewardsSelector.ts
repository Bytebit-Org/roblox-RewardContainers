import { IRewardsSelector } from "interfaces/IRewardsSelector";
import { Reward } from "types/Reward";

type RewardsSeriesEntry = {
	modulusValue: number;
	priority: number;
	rewards: ReadonlyArray<Reward>;
};

export class RepeatingSeriesRewardsSelector implements IRewardsSelector {
	private constructor(
		private readonly defaultRewards: ReadonlyArray<Reward>,
		private readonly rewardsSeriesEntriesSorted: ReadonlyArray<RewardsSeriesEntry>,
		private seriesIndex: number,
	) {}

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

	public incrementSeriesIndex() {
		this.seriesIndex++;
	}

	public setSeriesIndex(newValue: number) {
		this.seriesIndex = newValue;
	}

	public selectRewardsAsync() {
		// cache current value since it is mutable
		const seriesIndex = this.seriesIndex;

		for (const rewardsSeriesEntry of this.rewardsSeriesEntriesSorted) {
			if (seriesIndex % rewardsSeriesEntry.modulusValue === 0) {
				return Promise.resolve(rewardsSeriesEntry.rewards);
			}
		}

		return Promise.resolve(this.defaultRewards);
	}
}
