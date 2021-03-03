[@rbxts/reward-containers](../README.md) / ConstantRewardsSelector

# Class: ConstantRewardsSelector

A simple rewards selector that selects the same set of rewards every time

## Implements

* [*IRewardsSelector*](../interfaces/irewardsselector.md)

## Table of contents

### Methods

- [selectRewards](constantrewardsselector.md#selectrewards)
- [selectRewardsAsync](constantrewardsselector.md#selectrewardsasync)
- [create](constantrewardsselector.md#create)

## Methods

### selectRewards

▸ **selectRewards**(): readonly [*Reward*](../README.md#reward)<string\>[]

Selects a list of rewards

**Returns:** readonly [*Reward*](../README.md#reward)<string\>[]

Implementation of: [IRewardsSelector](../interfaces/irewardsselector.md)

Defined in: [src/classes/Selectors/ConstantRewardsSelector.ts:23](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Selectors/ConstantRewardsSelector.ts#L23)

___

### selectRewardsAsync

▸ **selectRewardsAsync**(): *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Asynchronously selects a list of rewards

**Returns:** *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Implementation of: [IRewardsSelector](../interfaces/irewardsselector.md)

Defined in: [src/classes/Selectors/ConstantRewardsSelector.ts:27](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Selectors/ConstantRewardsSelector.ts#L27)

___

### create

▸ `Static`**create**(`rewards`: readonly [*Reward*](../README.md#reward)<string\>[]): [*ConstantRewardsSelector*](constantrewardsselector.md)

Creates a new instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rewards` | readonly [*Reward*](../README.md#reward)<string\>[] | The reward set to select each time    |

**Returns:** [*ConstantRewardsSelector*](constantrewardsselector.md)

Defined in: [src/classes/Selectors/ConstantRewardsSelector.ts:19](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Selectors/ConstantRewardsSelector.ts#L19)
