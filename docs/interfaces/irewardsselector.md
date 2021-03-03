[@rbxts/reward-containers](../README.md) / IRewardsSelector

# Interface: IRewardsSelector

Provides the interface for selecting rewards

## Implemented by

* [*ConstantRewardsSelector*](../classes/constantrewardsselector.md)
* [*RepeatingSeriesRewardsSelector*](../classes/repeatingseriesrewardsselector.md)
* [*WeightedRewardsSelector*](../classes/weightedrewardsselector.md)

## Table of contents

### Methods

- [selectRewards](irewardsselector.md#selectrewards)
- [selectRewardsAsync](irewardsselector.md#selectrewardsasync)

## Methods

### selectRewards

▸ **selectRewards**(): readonly [*Reward*](../README.md#reward)<string\>[]

Selects a list of rewards

**Returns:** readonly [*Reward*](../README.md#reward)<string\>[]

Defined in: [src/interfaces/IRewardsSelector.d.ts:10](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/interfaces/IRewardsSelector.d.ts#L10)

___

### selectRewardsAsync

▸ **selectRewardsAsync**(): *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Asynchronously selects a list of rewards

**Returns:** *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Defined in: [src/interfaces/IRewardsSelector.d.ts:15](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/interfaces/IRewardsSelector.d.ts#L15)
