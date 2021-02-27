import { Reward } from "types/Reward";

export interface IRewardsOpeningCoordinator {
	coordinateOpeningAsync(rewardedPlayer: Player): Promise<ReadonlyArray<Reward>>;
}
