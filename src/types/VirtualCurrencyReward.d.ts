import { Reward } from "./Reward";

export type VirtualCurrencyReward<CurrencyType extends string> = Reward & {
	type: "VirtualCurrency";

	currencyType: CurrencyType;
	value: number;
};
