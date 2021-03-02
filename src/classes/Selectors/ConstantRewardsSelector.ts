import { IRewardsSelector } from "interfaces/IRewardsSelector";
import { Reward } from "types/Reward";

/**
 * A simple rewards selector that selects the same set of rewards every time
 */
export class ConstantRewardsSelector implements IRewardsSelector {
	/**
	 * Use the create method instead
	 */
	private constructor(private readonly rewards: ReadonlyArray<Reward>) {}

	/**
	 * Creates a new instance
	 * @param this
	 * @param rewards The reward set to select each time
	 */
	public static create(this: void, rewards: ReadonlyArray<Reward>) {
		return new ConstantRewardsSelector(rewards);
	}

	public selectRewards() {
		return this.selectRewardsAsync().expect();
	}

	public selectRewardsAsync() {
		return Promise.resolve(this.rewards);
	}
}
