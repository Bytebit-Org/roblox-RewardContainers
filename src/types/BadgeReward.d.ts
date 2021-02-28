import { Reward } from "./Reward";

/**
 * A reward that grants a badge
 */
export type BadgeReward = Reward & {
	type: "Badge";

	badgeId: number;
};
