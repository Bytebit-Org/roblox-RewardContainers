[@rbxts/reward-containers](../README.md) / RepeatingSeriesRewardsSelector

# Class: RepeatingSeriesRewardsSelector

A rewards selector that will deterministically select rewards from a provided, repeating series.
The series is defined by a default reward set and then individual reward series entries.
Each reward series entry provides a modulus value, its priority, and then the reward set it provides.
Each time the rewards selector selects rewards, it will execute the following algorithm:
1. Get all reward series entries such that the formula `seriesIndex % rewardSeriesEntry.modulusValue` is equal to 0
2. If no reward series entries were found, return the default rewards set
3. Otherwise, find the reward series entry with the highest value (ties broken at random) and return its rewards set

For example, a series in which every fifth index gives a different prize would have a default prize
and one reward series entry with a modulus value of 5.

## Implements

* [*IRewardsSelector*](../interfaces/irewardsselector.md)

## Table of contents

### Methods

- [incrementSeriesIndex](repeatingseriesrewardsselector.md#incrementseriesindex)
- [selectRewards](repeatingseriesrewardsselector.md#selectrewards)
- [selectRewardsAsync](repeatingseriesrewardsselector.md#selectrewardsasync)
- [setSeriesIndex](repeatingseriesrewardsselector.md#setseriesindex)
- [create](repeatingseriesrewardsselector.md#create)

## Methods

### incrementSeriesIndex

▸ **incrementSeriesIndex**(): *void*

Increments the series index by one

**Returns:** *void*

Defined in: [src/classes/Selectors/RepeatingSeriesRewardsSelector.ts:54](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/RepeatingSeriesRewardsSelector.ts#L54)

___

### selectRewards

▸ **selectRewards**(): readonly [*Reward*](../README.md#reward)<string\>[]

Selects a list of rewards

**Returns:** readonly [*Reward*](../README.md#reward)<string\>[]

Implementation of: [IRewardsSelector](../interfaces/irewardsselector.md)

Defined in: [src/classes/Selectors/RepeatingSeriesRewardsSelector.ts:66](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/RepeatingSeriesRewardsSelector.ts#L66)

___

### selectRewardsAsync

▸ **selectRewardsAsync**(): *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Asynchronously selects a list of rewards

**Returns:** *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Implementation of: [IRewardsSelector](../interfaces/irewardsselector.md)

Defined in: [src/classes/Selectors/RepeatingSeriesRewardsSelector.ts:70](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/RepeatingSeriesRewardsSelector.ts#L70)

___

### setSeriesIndex

▸ **setSeriesIndex**(`newValue`: *number*): *void*

Directly sets the series index to the given value

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`newValue` | *number* | The new series index value    |

**Returns:** *void*

Defined in: [src/classes/Selectors/RepeatingSeriesRewardsSelector.ts:62](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/RepeatingSeriesRewardsSelector.ts#L62)

___

### create

▸ `Static`**create**(`defaultRewards`: readonly [*Reward*](../README.md#reward)<string\>[], `rewardsSeriesEntries`: readonly RewardsSeriesEntry[], `seriesIndex`: *number*): [*RepeatingSeriesRewardsSelector*](repeatingseriesrewardsselector.md)

Creates a new instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`defaultRewards` | readonly [*Reward*](../README.md#reward)<string\>[] | The default rewards for the series   |
`rewardsSeriesEntries` | readonly RewardsSeriesEntry[] | The reward series entries   |
`seriesIndex` | *number* | The current series index, which can be changed later    |

**Returns:** [*RepeatingSeriesRewardsSelector*](repeatingseriesrewardsselector.md)

Defined in: [src/classes/Selectors/RepeatingSeriesRewardsSelector.ts:39](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/RepeatingSeriesRewardsSelector.ts#L39)
