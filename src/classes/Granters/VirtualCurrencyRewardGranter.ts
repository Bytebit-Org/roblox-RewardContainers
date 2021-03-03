import { IRewardGranter } from "../../interfaces/IRewardGranter";
import { Reward } from "../../types/Reward";
import { VirtualCurrencyReward } from "../../types/VirtualCurrencyReward";

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

/**
 * A generic implementation of a virtual currency reward granter
 * - Requires a generic string union parameter to list the available currency types
 * - Requires an async function to actually grant the virtual currency
 */
export class VirtualCurrencyRewardGranter<CurrencyType extends string> implements IRewardGranter {
	/**
	 * Use the create method instead
	 */
	private constructor(private readonly awardVirtualCurrencyAsync: AwardVirtualCurrencyAsyncFunction<CurrencyType>) {}

	/**
	 * Creates a new instance
	 * @param this
	 * @param awardVirtualCurrencyAsync An async function to actually grant the virtual currency
	 */
	public static create<CurrencyType extends string>(
		this: void,
		awardVirtualCurrencyAsync: AwardVirtualCurrencyAsyncFunction<CurrencyType>,
	) {
		return new VirtualCurrencyRewardGranter(awardVirtualCurrencyAsync);
	}

	public grantReward(reward: Reward, rewardedPlayer: Player) {
		return this.grantRewardAsync(reward, rewardedPlayer).expect();
	}

	public async grantRewardAsync(reward: Reward, rewardedPlayer: Player) {
		if (!isAVirtualCurrencyReward<CurrencyType>(reward)) {
			throw `Invalid reward. Expected a Virtual Currency reward, got a reward of type "${reward.type}"`;
		}

		await this.awardVirtualCurrencyAsync(rewardedPlayer, reward.currencyType, reward.value);
	}
}
