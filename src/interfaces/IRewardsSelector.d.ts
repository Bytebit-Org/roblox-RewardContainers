import { Reward } from "types/Reward";

export interface IRewardsSelector {
	selectRewardsAsync(): Promise<ReadonlyArray<Reward>>;
}
