[@rbxts/reward-containers](../README.md) / BaseRewardContainer

# Class: BaseRewardContainer

An abstract class that provides the standard logic for opening a container
Needs canOpen to be implemented by subclasses

## Hierarchy

* **BaseRewardContainer**

  ↳ [*RecurringTimeLockedRewardContainer*](recurringtimelockedrewardcontainer.md)

  ↳ [*StandardRewardContainer*](standardrewardcontainer.md)

  ↳ [*TimeLockedRewardContainer*](timelockedrewardcontainer.md)

## Implements

* [*IRewardContainer*](../interfaces/irewardcontainer.md)

## Table of contents

### Constructors

- [constructor](baserewardcontainer.md#constructor)

### Properties

- [callback](baserewardcontainer.md#callback)
- [opened](baserewardcontainer.md#opened)
- [rewardedPlayer](baserewardcontainer.md#rewardedplayer)

### Methods

- [canOpen](baserewardcontainer.md#canopen)
- [open](baserewardcontainer.md#open)
- [openAsync](baserewardcontainer.md#openasync)

## Constructors

### constructor

\+ `Protected`**new BaseRewardContainer**(`rewardedPlayer`: *Player*, `rewardsOpeningCoordinator`: [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md)): [*BaseRewardContainer*](baserewardcontainer.md)

Sets up the super properties

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rewardedPlayer` | *Player* | The player to associate with the reward container   |
`rewardsOpeningCoordinator` | [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md) | The opening coordinator to use upon opening    |

**Returns:** [*BaseRewardContainer*](baserewardcontainer.md)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:14](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L14)

## Properties

### callback

• **callback**: () => *string*

#### Type declaration:

▸ (): *string*

**Returns:** *string*

Defined in: [src/classes/Containers/BaseRewardContainer.ts:12](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L12)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:12](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L12)

___

### opened

• `Readonly` **opened**: *ISignal*<(`rewards`: readonly [*Reward*](../README.md#reward)<string\>[]) => *void*\>

Fired when the container opens
Some reward container implementations may open more than once

Implementation of: [IRewardContainer](../interfaces/irewardcontainer.md).[opened](../interfaces/irewardcontainer.md#opened)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:11](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L11)

___

### rewardedPlayer

• `Protected` `Readonly` **rewardedPlayer**: *Player*

## Methods

### canOpen

▸ `Abstract`**canOpen**(): *boolean*

Returns whether the reward container is ready to open

**Returns:** *boolean*

Implementation of: [IRewardContainer](../interfaces/irewardcontainer.md)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:51](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L51)

___

### open

▸ **open**(): *void*

Runs the process of opening the container, including selecting and granting the rewards to the associated player

**Returns:** *void*

Implementation of: [IRewardContainer](../interfaces/irewardcontainer.md)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:28](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L28)

___

### openAsync

▸ **openAsync**(): *Promise*<void\>

Asynchronously runs the process of opening the container, including selecting and granting the rewards to the associated player

**Returns:** *Promise*<void\>

Implementation of: [IRewardContainer](../interfaces/irewardcontainer.md)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:32](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L32)
