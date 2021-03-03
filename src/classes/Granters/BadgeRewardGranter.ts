import { BadgeService } from "@rbxts/services";
import { IRewardGranter } from "../../interfaces/IRewardGranter";
import { BadgeReward } from "../../types/BadgeReward";
import { Reward } from "../../types/Reward";

function isABadgeReward(reward: Reward): reward is BadgeReward {
	return reward.type === "Badge";
}

/**
 * A reward granter that grants a badge to a player
 */
export class BadgeRewardGranter implements IRewardGranter {
	/**
	 * @hidden
	 * Use the create method instead
	 */
	private constructor(private readonly badgeService: BadgeService) {}

	/**
	 * Creates a new instance
	 * @param this
	 */
	public static create(this: void) {
		return new BadgeRewardGranter(BadgeService);
	}

	public grantReward(reward: Reward, rewardedPlayer: Player) {
		return this.grantRewardAsync(reward, rewardedPlayer).expect();
	}

	public async grantRewardAsync(reward: Reward, rewardedPlayer: Player) {
		if (!isABadgeReward(reward)) {
			throw `Invalid reward. Expected a Virtual Currency reward, got a reward of type "${reward.type}"`;
		}

		this.badgeService.AwardBadge(rewardedPlayer.UserId, reward.badgeId);
	}
}
