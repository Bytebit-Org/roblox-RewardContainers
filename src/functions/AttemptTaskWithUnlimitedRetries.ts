import inspect from "@rbxts/inspect";
import { RunService } from "@rbxts/services";

type Range<T = number> = {
	min: T;
	max: T;
};

type ExponentialFallOffConfiguration = {
	readonly fallOffFactor: number;
	readonly sleepDurationInSecondsRange: Range;
};

const DEFAULT_EXPONENTIAL_FALL_OFF_CONFIG = identity<ExponentialFallOffConfiguration>({
	fallOffFactor: 2,
	sleepDurationInSecondsRange: {
		min: 1,
		max: 8,
	},
});

export function attemptTaskWithUnlimitedRetries(
	attemptTaskAsync: () => Promise<void>,
	taskName: string,
	exponentialFallOffConfig?: ExponentialFallOffConfiguration,
) {
	// cached in a const so that we don't have to do an undefined check all the time in the heartbeat connection
	const guaranteedFallOffConfig = exponentialFallOffConfig ?? DEFAULT_EXPONENTIAL_FALL_OFF_CONFIG;

	let nextAttemptUnixTimestampMillis = 0;
	let nextAttemptIntervalInMilliseconds = guaranteedFallOffConfig.sleepDurationInSecondsRange.min * 1000;

	let currentAttemptPromise: Promise<void> | undefined;

	const postSimulationConnection = RunService.PostSimulation.Connect(() => {
		if (currentAttemptPromise !== undefined) {
			return;
		}

		const currentUnixTimestampMillis = DateTime.now().UnixTimestampMillis;
		if (currentUnixTimestampMillis < nextAttemptUnixTimestampMillis) {
			return;
		}

		currentAttemptPromise = attemptTaskAsync()
			.then(() => postSimulationConnection.Disconnect())
			.catch((failureReason) => {
				warn(
					`Failure occurred during attempt of task "${taskName}". Failure reason: ${inspect(failureReason)}`,
				);

				nextAttemptUnixTimestampMillis = currentUnixTimestampMillis + nextAttemptIntervalInMilliseconds;
				nextAttemptIntervalInMilliseconds = math.min(
					nextAttemptIntervalInMilliseconds * guaranteedFallOffConfig.fallOffFactor,
					guaranteedFallOffConfig.sleepDurationInSecondsRange.max * 1000,
				);
			})
			.finally(() => (currentAttemptPromise = undefined));
	});
}
