import { Reward } from "types/Reward";

export interface IRewardGranter {
	grantRewardAsync(reward: Reward, rewardedPlayer: Player): Promise<void>;
}
