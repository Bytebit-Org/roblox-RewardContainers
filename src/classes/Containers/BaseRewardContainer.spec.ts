/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/// <reference types="@rbxts/testez/globals" />

import fitumi from "@rbxts/fitumi";
import { a } from "@rbxts/fitumi";
import { HttpService } from "@rbxts/services";
import { IRewardsOpeningCoordinator } from "index";
import { Reward } from "../../types/Reward";
import { BaseRewardContainer } from "./BaseRewardContainer";

class UnitTestableBaseRewardContainer extends BaseRewardContainer {
	public isUnlocked = true;

	public constructor(rewardedPlayer: Player, rewardsOpeningCoordinator: IRewardsOpeningCoordinator) {
		super(rewardedPlayer, rewardsOpeningCoordinator);
	}

	public canOpen() {
		return this.isUnlocked;
	}
}

export = () => {
	describe("openAsync", () => {
		it("should throw if the container is not ready to be opened", () => {
			const container = new UnitTestableBaseRewardContainer(
				a.fake<Player>(),
				a.fake<IRewardsOpeningCoordinator>(),
			);

			container.isUnlocked = false;

			expect(() => container.openAsync().expect()).to.throw();
		});

		it("should throw if the container is being opened twice at once", () => {
			let resolveOpeningCoordinationPromise: () => void;
			const openingCoordinationPromise = new Promise<void>(
				(resolve) => (resolveOpeningCoordinationPromise = resolve),
			);

			const rewardsOpeningCoordinator = a.fake<IRewardsOpeningCoordinator>();
			a.callTo(
				rewardsOpeningCoordinator.coordinateOpeningAsync as {},
				rewardsOpeningCoordinator,
				fitumi.wildcard,
			).returns(openingCoordinationPromise);

			const container = new UnitTestableBaseRewardContainer(a.fake<Player>(), rewardsOpeningCoordinator);

			container.openAsync();

			Promise.delay(1 / 10).expect();

			expect(() => container.openAsync().expect()).to.throw();
		});

		it("should fire opened shortly after the coordination promise resolves with the expected array of rewards", () => {
			let resolveOpeningCoordinationPromise!: (rewards: ReadonlyArray<Reward>) => void;
			const openingCoordinationPromise = new Promise<ReadonlyArray<Reward>>(
				(resolve) => (resolveOpeningCoordinationPromise = resolve),
			);

			const reward = {
				type: HttpService.GenerateGUID(),
			};

			const rewardsOpeningCoordinator = a.fake<IRewardsOpeningCoordinator>();
			a.callTo(
				rewardsOpeningCoordinator.coordinateOpeningAsync as {},
				rewardsOpeningCoordinator,
				fitumi.wildcard,
			).returns(openingCoordinationPromise);

			const container = new UnitTestableBaseRewardContainer(a.fake<Player>(), rewardsOpeningCoordinator);

			const openedDidFirePromise = new Promise<boolean>((resolve) => {
				const connection = container.opened.Connect((rewards) => {
					if (rewards.size() === 1 && rewards[0].type === reward.type) {
						connection.Disconnect();
						resolve(true);
					}
				});
			});

			container.openAsync();

			resolveOpeningCoordinationPromise([reward]);

			const didOpenedFireInTime = Promise.race([
				openedDidFirePromise,
				Promise.delay(1 / 10).then(() => false),
			]).expect();

			expect(didOpenedFireInTime).to.equal(true);
		});
	});
};
