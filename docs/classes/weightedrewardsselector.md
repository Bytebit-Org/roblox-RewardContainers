[@rbxts/reward-containers](../README.md) / WeightedRewardsSelector

# Class: WeightedRewardsSelector

A rewards selector that selects a list of rewards based on a weighted random sample and allowing up to a given value in the total list.
Reward options have an assigned cost and weight.
The weight is used to give allow for non-uniform random sampling of the options.
The cost is used to subtract from the value such that the sum of the option costs for the selected rewards list never exceeds the given value.
A maximum number of rewards, regardless of the the remaining value, can also be imposed.

## Implements

* [*IRewardsSelector*](../interfaces/irewardsselector.md)

## Table of contents

### Methods

- [selectRewards](weightedrewardsselector.md#selectrewards)
- [selectRewardsAsync](weightedrewardsselector.md#selectrewardsasync)
- [setMaximumNumberOfRewards](weightedrewardsselector.md#setmaximumnumberofrewards)
- [setValue](weightedrewardsselector.md#setvalue)
- [create](weightedrewardsselector.md#create)

## Methods

### selectRewards

▸ **selectRewards**(): [*Reward*](../README.md#reward)<string\>[]

Selects a list of rewards

**Returns:** [*Reward*](../README.md#reward)<string\>[]

Implementation of: [IRewardsSelector](../interfaces/irewardsselector.md)

Defined in: [src/classes/Selectors/WeightedRewardsSelector.ts:73](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/WeightedRewardsSelector.ts#L73)

___

### selectRewardsAsync

▸ **selectRewardsAsync**(): *Promise*<[*Reward*](../README.md#reward)<string\>[]\>

Asynchronously selects a list of rewards

**Returns:** *Promise*<[*Reward*](../README.md#reward)<string\>[]\>

Implementation of: [IRewardsSelector](../interfaces/irewardsselector.md)

Defined in: [src/classes/Selectors/WeightedRewardsSelector.ts:77](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/WeightedRewardsSelector.ts#L77)

___

### setMaximumNumberOfRewards

▸ **setMaximumNumberOfRewards**(`maximumNumberOfRewards`: *number*): *void*

Sets the maximum number of rewards that can be selected together in a list

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`maximumNumberOfRewards` | *number* | The new maximum number of rewards    |

**Returns:** *void*

Defined in: [src/classes/Selectors/WeightedRewardsSelector.ts:61](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/WeightedRewardsSelector.ts#L61)

___

### setValue

▸ **setValue**(`value`: *number*): *void*

Sets the maximum value of rewards that can be selected together in a list

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *number* | The new value    |

**Returns:** *void*

Defined in: [src/classes/Selectors/WeightedRewardsSelector.ts:69](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/WeightedRewardsSelector.ts#L69)

___

### create

▸ `Static`**create**(`maximumNumberOfRewards`: *number*, `random`: Random, `rewardOptions`: readonly RewardOption[], `value`: *number*): [*WeightedRewardsSelector*](weightedrewardsselector.md)

Creates a new instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`maximumNumberOfRewards` | *number* | The maximum number of rewards that can be granted in one list. Use math.huge to ignore.   |
`random` | Random | A random instance.   |
`rewardOptions` | readonly RewardOption[] | The reward options to randomly sample when selecting a new list.   |
`value` | *number* | The maximum value of any selected list of rewards as a sum of their reward options cost.    |

**Returns:** [*WeightedRewardsSelector*](weightedrewardsselector.md)

Defined in: [src/classes/Selectors/WeightedRewardsSelector.ts:44](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Selectors/WeightedRewardsSelector.ts#L44)
