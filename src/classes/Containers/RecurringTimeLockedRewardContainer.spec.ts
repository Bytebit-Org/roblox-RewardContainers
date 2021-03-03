/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/// <reference types="@rbxts/testez/globals" />

import fitumi from "@rbxts/fitumi";
import { a } from "@rbxts/fitumi";
import { HttpService, RunService } from "@rbxts/services";
import { SignalFactory } from "../../factories/SignalFactory";
import { IRewardsOpeningCoordinator } from "../../interfaces/IRewardsOpeningCoordinator";
import { RecurringTimeLockedRewardContainer } from "./RecurringTimeLockedRewardContainer";

function createDefaultRewardsOpeningCoordinator() {
	const rewardsOpeningCoordinator = a.fake<IRewardsOpeningCoordinator>();

	a.callTo(
		rewardsOpeningCoordinator.coordinateOpeningAsync as {},
		rewardsOpeningCoordinator,
		fitumi.wildcard,
	).returns(Promise.resolve([]));

	return rewardsOpeningCoordinator;
}

function createFakePlayer() {
	const player = a.fake<Player>();
	player.Name = HttpService.GenerateGUID();
	player.UserId = math.random(1, 2 ** 20);

	return player;
}

class UnitTestableRecurringTimeLockedRewardContainer extends RecurringTimeLockedRewardContainer {
	public constructor(
		args?: Partial<{
			dateTimeConstructor: DateTimeConstructor;
			name: string;
			recurrenceIntervalInSeconds: number;
			rewardedPlayer: Player;
			rewardsOpeningCoordinator: IRewardsOpeningCoordinator;
			signalFactory: SignalFactory;
			loadUnlockUnixTimestampForPlayerAsync: (player: Player, rewardsContainerName: string) => Promise<number>;
			saveUnlockUnixTimestampForPlayerAsync: (
				player: Player,
				unlockUnixTimestamp: number,
				rewardsContainerName: string,
			) => Promise<void>;
		}>,
	) {
		super(
			args?.dateTimeConstructor ?? DateTime,
			args?.name ?? "UnitTestableRecurringTimeLockedRewardContainer",
			args?.recurrenceIntervalInSeconds ?? 1,
			args?.rewardedPlayer ?? createFakePlayer(),
			args?.rewardsOpeningCoordinator ?? createDefaultRewardsOpeningCoordinator(),
			args?.signalFactory ?? new SignalFactory(),
			args?.loadUnlockUnixTimestampForPlayerAsync ??
				function () {
					return new Promise((resolve) => resolve(0));
				},
			args?.saveUnlockUnixTimestampForPlayerAsync ??
				function () {
					return Promise.resolve(undefined);
				},
		);
	}
}

export = () => {
	describe("canOpen", () => {
		it("should default to true for a new player", () => {
			const container = new UnitTestableRecurringTimeLockedRewardContainer();

			RunService.Heartbeat.Wait(); // let container start the loading process
			RunService.Heartbeat.Wait();

			expect(container.canOpen()).to.equal(true);
		});

		it("should be false immediately after opening and true after the interval has passed", () => {
			let currentUnixTimestampToReport = math.random(1, 2 ** 20);
			const recurrenceIntervalInSeconds = math.random(2, 15);

			const dateTimeConstructor = a.fake<DateTimeConstructor>();
			a.callTo(dateTimeConstructor.now).returns(
				a.valueGeneratorCallback(() => DateTime.fromUnixTimestamp(currentUnixTimestampToReport)),
			);

			const container = new UnitTestableRecurringTimeLockedRewardContainer({
				dateTimeConstructor,
				recurrenceIntervalInSeconds,
			});

			RunService.Heartbeat.Wait(); // let container start the loading process
			RunService.Heartbeat.Wait();

			expect(container.canOpen()).to.equal(true);

			container.openAsync().expect();
			expect(container.canOpen()).to.equal(false);

			currentUnixTimestampToReport = currentUnixTimestampToReport + recurrenceIntervalInSeconds;
			expect(container.canOpen()).to.equal(true);
		});
	});

	describe("connectToUnlockUnixTimestampChanges", () => {
		it("should fire shortly after opening", () => {
			const currentUnixTimestampToReport = math.random(1, 2 ** 20);
			const recurrenceIntervalInSeconds = math.random(2, 15);

			const container = new UnitTestableRecurringTimeLockedRewardContainer({
				dateTimeConstructor: ({
					now: () => DateTime.fromUnixTimestamp(currentUnixTimestampToReport),
				} as unknown) as DateTimeConstructor,
				recurrenceIntervalInSeconds,
			});

			const unlockUnixTimestampUpdatedPromise = new Promise<void>((resolve) =>
				container.connectToUnlockUnixTimestampChanges(() => resolve()),
			);

			RunService.Heartbeat.Wait(); // let container start the loading process
			RunService.Heartbeat.Wait();

			container.openAsync().expect();

			expect(unlockUnixTimestampUpdatedPromise.getStatus()).to.equal(Promise.Status.Resolved);
		});
	});

	describe("getNextUnlockUnixTimestamp", () => {
		it("should default to 0 for a new player", () => {
			const container = new UnitTestableRecurringTimeLockedRewardContainer();

			RunService.Heartbeat.Wait(); // let container start the loading process
			RunService.Heartbeat.Wait();

			expect(container.getNextUnlockUnixTimestamp()).to.equal(0);
		});

		it("should set next unlock timestamp after being opened to current timestamp plus recurrence interval", () => {
			const currentUnixTimestampToReport = math.random(1, 2 ** 20);
			const recurrenceIntervalInSeconds = math.random(2, 15);

			const container = new UnitTestableRecurringTimeLockedRewardContainer({
				dateTimeConstructor: ({
					now: () => DateTime.fromUnixTimestamp(currentUnixTimestampToReport),
				} as unknown) as DateTimeConstructor,
				recurrenceIntervalInSeconds,
			});

			RunService.Heartbeat.Wait(); // let container start the loading process
			RunService.Heartbeat.Wait();

			container.openAsync().expect();

			expect(container.getNextUnlockUnixTimestamp()).to.equal(
				currentUnixTimestampToReport + recurrenceIntervalInSeconds,
			);
		});
	});
};
