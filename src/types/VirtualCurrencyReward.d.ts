import { Reward } from "./Reward";

/**
 * A reward of an amount of virtual currency (not Robux)
 */
export type VirtualCurrencyReward<CurrencyType extends string> = Reward & {
	type: "VirtualCurrency";

	currencyType: CurrencyType;
	value: number;
};
