import { Reward } from "types/Reward";

/**
 * Provides the interface for selecting rewards
 */
export interface IRewardsSelector {
	/**
	 * Selects a list of rewards
	 */
	selectRewards(): ReadonlyArray<Reward>;

	/**
	 * Asynchronously selects a list of rewards
	 */
	selectRewardsAsync(): Promise<ReadonlyArray<Reward>>;
}
