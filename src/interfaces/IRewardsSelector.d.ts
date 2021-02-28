import { Reward } from "types/Reward";

/**
 * Provides the interface for selecting rewards
 */
export interface IRewardsSelector {
	/**
	 * Selects a list of rewards asynchronously
	 */
	selectRewardsAsync(): Promise<ReadonlyArray<Reward>>;
}
