import { Reward } from "types/Reward";

/**
 * Provides the interface for coordinating the opening of rewards
 * "Opening" of rewards means selecting the rewards to give and granting them
 */
export interface IRewardsOpeningCoordinator {
	/**
	 * Coordinates opening rewards
	 * This means that it will select the rewards and grant them to the player
	 * @param rewardedPlayer The player to give the rewards to upon opening
	 */
	coordinateOpeningAsync(rewardedPlayer: Player): Promise<ReadonlyArray<Reward>>;
}
