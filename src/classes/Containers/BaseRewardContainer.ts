import { ISignal } from "@rbxts/signals-tooling";
import { SignalFactory } from "factories/SignalFactory";
import { IRewardContainer } from "interfaces/IRewardContainer";
import { IRewardsOpeningCoordinator } from "interfaces/IRewardsOpeningCoordinator";
import { Reward } from "types/Reward";

export abstract class BaseRewardContainer implements IRewardContainer {
	public readonly opened: ISignal<(rewards: ReadonlyArray<Reward>) => void>;

	private isOpening = false;

	protected constructor(
		protected readonly rewardedPlayer: Player,
		private readonly rewardsOpeningCoordinator: IRewardsOpeningCoordinator,
		signalFactory: SignalFactory,
	) {
		this.opened = signalFactory.createInstance();
	}

	public async openAsync() {
		if (!this.canOpen()) {
			throw `Attempted to open rewards container of type ${getmetatable(this)} which is not yet ready to open.`;
		}

		if (this.isOpening) {
			warn(`Attempt to open rewards container multiple times simultaneously`);
			return;
		}

		this.isOpening = true;

		await this.rewardsOpeningCoordinator
			.coordinateOpeningAsync(this.rewardedPlayer)
			.then(rewards => this.opened.fire(rewards))
			.finally(() => {
				this.isOpening = false;
			});
	}

	public abstract canOpen(): boolean;
}
