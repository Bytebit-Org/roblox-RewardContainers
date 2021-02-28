/**
 * Generic reward type
 */
export type Reward<T extends string = string> = {
	readonly type: T;
};
