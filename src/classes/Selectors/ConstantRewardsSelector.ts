import { IRewardsSelector } from "interfaces/IRewardsSelector";
import { Reward } from "types/Reward";

export class ConstantRewardsSelector implements IRewardsSelector {
	private constructor(private readonly rewards: ReadonlyArray<Reward>) {}

	public static create(this: void, rewards: ReadonlyArray<Reward>, seriesIndex: number) {
		return new ConstantRewardsSelector(rewards);
	}

	public selectRewardsAsync() {
		return Promise.resolve(this.rewards);
	}
}
