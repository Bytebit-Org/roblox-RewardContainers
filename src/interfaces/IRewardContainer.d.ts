import { IReadOnlySignal } from "@rbxts/signals-tooling";
import { Reward } from "types/Reward";

/**
 * Provides the interface for a reward container
 * Reward containers are tied to an individual player
 */
export interface IRewardContainer {
	/**
	 * Fired when the container opens
	 * Some reward container implementations may open more than once
	 * @argument rewards The list of rewards that were granted to the associated player
	 */
	readonly opened: IReadOnlySignal<(rewards: ReadonlyArray<Reward>) => void>;

	/**
	 * Returns whether the reward container is ready to open
	 */
	canOpen(): boolean;

	/**
	 * Runs the process of opening the container, including selecting and granting the rewards to the associated player
	 */
	openAsync(): Promise<void>;
}
