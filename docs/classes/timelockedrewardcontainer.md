[@rbxts/reward-containers](../README.md) / TimeLockedRewardContainer

# Class: TimeLockedRewardContainer

A reward container that cannot be opened until the given unlock Unix timestamp
Meant to be opened only once
Useful for things like time-locked loot crates

## Hierarchy

* [*BaseRewardContainer*](baserewardcontainer.md)

  ↳ **TimeLockedRewardContainer**

## Table of contents

### Properties

- [callback](timelockedrewardcontainer.md#callback)
- [opened](timelockedrewardcontainer.md#opened)
- [rewardedPlayer](timelockedrewardcontainer.md#rewardedplayer)
- [unlockUnixTimestamp](timelockedrewardcontainer.md#unlockunixtimestamp)

### Methods

- [canOpen](timelockedrewardcontainer.md#canopen)
- [getUnlockUnixTimestamp](timelockedrewardcontainer.md#getunlockunixtimestamp)
- [open](timelockedrewardcontainer.md#open)
- [openAsync](timelockedrewardcontainer.md#openasync)
- [create](timelockedrewardcontainer.md#create)

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

___

### unlockUnixTimestamp

• `Readonly` **unlockUnixTimestamp**: *number*

## Methods

### canOpen

▸ **canOpen**(): *boolean*

**Returns:** *boolean*

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/TimeLockedRewardContainer.ts:48](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/TimeLockedRewardContainer.ts#L48)

___

### getUnlockUnixTimestamp

▸ **getUnlockUnixTimestamp**(): *number*

Gets the unlock Unix timestamp

**Returns:** *number*

Defined in: [src/classes/Containers/TimeLockedRewardContainer.ts:44](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/TimeLockedRewardContainer.ts#L44)

___

### open

▸ **open**(): *void*

**Returns:** *void*

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/TimeLockedRewardContainer.ts:57](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/TimeLockedRewardContainer.ts#L57)

___

### openAsync

▸ **openAsync**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/TimeLockedRewardContainer.ts:61](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/TimeLockedRewardContainer.ts#L61)

___

### create

▸ `Static`**create**(`rewardedPlayer`: *Player*, `rewardsOpeningCoordinator`: [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md), `unlockUnixTimestamp`: *number*): [*TimeLockedRewardContainer*](timelockedrewardcontainer.md)

Creates a new instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rewardedPlayer` | *Player* | The player to associate with the reward container   |
`rewardsOpeningCoordinator` | [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md) | The opening coordinator to use upon opening   |
`unlockUnixTimestamp` | *number* | The timestamp after which the reward container can be opened    |

**Returns:** [*TimeLockedRewardContainer*](timelockedrewardcontainer.md)

Defined in: [src/classes/Containers/TimeLockedRewardContainer.ts:32](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Containers/TimeLockedRewardContainer.ts#L32)
