import { Reward } from "types/Reward";

/**
 * Provides the interface for granting a reward of a certain type to a player
 */
export interface IRewardGranter {
	/**
	 * Grants the reward to the given player asynchronously
	 * @param reward The reward to grant
	 * @param rewardedPlayer The player receiving the reward
	 */
	grantReward(reward: Reward, rewardedPlayer: Player): void;

	/**
	 * Asynchronously grants the reward to the given player asynchronously
	 * @param reward The reward to grant
	 * @param rewardedPlayer The player receiving the reward
	 */
	grantRewardAsync(reward: Reward, rewardedPlayer: Player): Promise<void>;
}
