import { IRewardGranter } from "interfaces/IRewardGranter";
import { Reward } from "types/Reward";
import { VirtualCurrencyReward } from "types/VirtualCurrencyReward";

function isAVirtualCurrencyReward<CurrencyType extends string>(
	reward: Reward,
): reward is VirtualCurrencyReward<CurrencyType> {
	return reward.type === "VirtualCurrency";
}

type AwardVirtualCurrencyAsyncFunction<CurrencyType extends string> = (
	rewardedPlayer: Player,
	currencyType: CurrencyType,
	value: number,
) => Promise<void>;

export class VirtualCurrencyRewardGranter<CurrencyType extends string> implements IRewardGranter {
	private constructor(private readonly awardVirtualCurrencyAsync: AwardVirtualCurrencyAsyncFunction<CurrencyType>) {}

	public static create<CurrencyType extends string>(
		this: void,
		awardVirtualCurrencyAsync: AwardVirtualCurrencyAsyncFunction<CurrencyType>,
	) {
		return new VirtualCurrencyRewardGranter(awardVirtualCurrencyAsync);
	}

	public async grantRewardAsync(reward: Reward, rewardedPlayer: Player) {
		if (!isAVirtualCurrencyReward<CurrencyType>(reward)) {
			throw `Invalid reward. Expected a Virtual Currency reward, got a reward of type "${reward.type}"`;
		}

		await this.awardVirtualCurrencyAsync(rewardedPlayer, reward.currencyType, reward.value);
	}
}
