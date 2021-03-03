[@rbxts/reward-containers](../README.md) / StandardRewardContainer

# Class: StandardRewardContainer

A basic reward container that can only be opened once but is ready to open as soon as it is created

## Hierarchy

* [*BaseRewardContainer*](baserewardcontainer.md)

  ↳ **StandardRewardContainer**

## Table of contents

### Properties

- [callback](standardrewardcontainer.md#callback)
- [opened](standardrewardcontainer.md#opened)
- [rewardedPlayer](standardrewardcontainer.md#rewardedplayer)

### Methods

- [canOpen](standardrewardcontainer.md#canopen)
- [open](standardrewardcontainer.md#open)
- [openAsync](standardrewardcontainer.md#openasync)
- [create](standardrewardcontainer.md#create)

## Properties

### callback

• **callback**: () => *string*

#### Type declaration:

▸ (): *string*

**Returns:** *string*

Defined in: [src/classes/Containers/BaseRewardContainer.ts:12](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/BaseRewardContainer.ts#L12)

Inherited from: [BaseRewardContainer](baserewardcontainer.md).[callback](baserewardcontainer.md#callback)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:12](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/BaseRewardContainer.ts#L12)

___

### opened

• `Readonly` **opened**: *ISignal*<(`rewards`: readonly [*Reward*](../README.md#reward)<string\>[]) => *void*\>

Fired when the container opens
Some reward container implementations may open more than once

Inherited from: [BaseRewardContainer](baserewardcontainer.md).[opened](baserewardcontainer.md#opened)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:11](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/BaseRewardContainer.ts#L11)

___

### rewardedPlayer

• `Protected` `Readonly` **rewardedPlayer**: *Player*

Inherited from: [BaseRewardContainer](baserewardcontainer.md).[rewardedPlayer](baserewardcontainer.md#rewardedplayer)

## Methods

### canOpen

▸ **canOpen**(): *boolean*

**Returns:** *boolean*

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/StandardRewardContainer.ts:28](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/StandardRewardContainer.ts#L28)

___

### open

▸ **open**(): *void*

**Returns:** *void*

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/StandardRewardContainer.ts:32](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/StandardRewardContainer.ts#L32)

___

### openAsync

▸ **openAsync**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/StandardRewardContainer.ts:36](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/StandardRewardContainer.ts#L36)

___

### create

▸ `Static`**create**(`rewardedPlayer`: *Player*, `rewardsOpeningCoordinator`: [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md)): [*StandardRewardContainer*](standardrewardcontainer.md)

Creates a new instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rewardedPlayer` | *Player* | The player to associate with the reward container   |
`rewardsOpeningCoordinator` | [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md) | The opening coordinator to use upon opening    |

**Returns:** [*StandardRewardContainer*](standardrewardcontainer.md)

Defined in: [src/classes/Containers/StandardRewardContainer.ts:24](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/StandardRewardContainer.ts#L24)
