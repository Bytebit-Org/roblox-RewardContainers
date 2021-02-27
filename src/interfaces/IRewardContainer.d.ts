import { IReadOnlySignal } from "@rbxts/signals-tooling";
import { Reward } from "types/Reward";

export interface IRewardContainer {
	readonly opened: IReadOnlySignal<(rewards: ReadonlyArray<Reward>) => void>;

	canOpen(): boolean;
	openAsync(): Promise<void>;
}
