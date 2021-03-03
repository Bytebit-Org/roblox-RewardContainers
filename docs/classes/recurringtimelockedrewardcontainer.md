[@rbxts/reward-containers](../README.md) / RecurringTimeLockedRewardContainer

# Class: RecurringTimeLockedRewardContainer

A reward container that can be opened multiple times and persists its next unlock Unix timestamp between play sessions for each player
Once opened the container will lock itself for a given period of time
Useful for creating things like daily login reward systems

## Hierarchy

* [*BaseRewardContainer*](baserewardcontainer.md)

  ↳ **RecurringTimeLockedRewardContainer**

## Table of contents

### Constructors

- [constructor](recurringtimelockedrewardcontainer.md#constructor)

### Properties

- [callback](recurringtimelockedrewardcontainer.md#callback)
- [opened](recurringtimelockedrewardcontainer.md#opened)
- [rewardedPlayer](recurringtimelockedrewardcontainer.md#rewardedplayer)

### Methods

- [canOpen](recurringtimelockedrewardcontainer.md#canopen)
- [connectToUnlockUnixTimestampChanges](recurringtimelockedrewardcontainer.md#connecttounlockunixtimestampchanges)
- [getNextUnlockUnixTimestamp](recurringtimelockedrewardcontainer.md#getnextunlockunixtimestamp)
- [open](recurringtimelockedrewardcontainer.md#open)
- [openAsync](recurringtimelockedrewardcontainer.md#openasync)
- [create](recurringtimelockedrewardcontainer.md#create)

## Constructors

### constructor

\+ `Protected`**new RecurringTimeLockedRewardContainer**(`dateTimeConstructor`: DateTimeConstructor, `name`: *string*, `recurrenceIntervalInSeconds`: *number*, `rewardedPlayer`: *Player*, `rewardsOpeningCoordinator`: [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md), `signalFactory`: *SignalFactory*, `loadUnlockUnixTimestampForPlayerAsync`: (`player`: *Player*, `rewardsContainerName`: *string*) => *Promise*<number\>, `saveUnlockUnixTimestampForPlayerAsync`: (`player`: *Player*, `unlockUnixTimestamp`: *number*, `rewardsContainerName`: *string*) => *Promise*<void\>): [*RecurringTimeLockedRewardContainer*](recurringtimelockedrewardcontainer.md)

Use the create method instead
Set to protected only for unit testing

#### Parameters:

Name | Type |
:------ | :------ |
`dateTimeConstructor` | DateTimeConstructor |
`name` | *string* |
`recurrenceIntervalInSeconds` | *number* |
`rewardedPlayer` | *Player* |
`rewardsOpeningCoordinator` | [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md) |
`signalFactory` | *SignalFactory* |
`loadUnlockUnixTimestampForPlayerAsync` | (`player`: *Player*, `rewardsContainerName`: *string*) => *Promise*<number\> |
`saveUnlockUnixTimestampForPlayerAsync` | (`player`: *Player*, `unlockUnixTimestamp`: *number*, `rewardsContainerName`: *string*) => *Promise*<void\> |

**Returns:** [*RecurringTimeLockedRewardContainer*](recurringtimelockedrewardcontainer.md)

Inherited from: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/RecurringTimeLockedRewardContainer.ts:58](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/RecurringTimeLockedRewardContainer.ts#L58)

## Properties

### callback

• **callback**: () => *string*

#### Type declaration:

▸ (): *string*

**Returns:** *string*

Defined in: [src/classes/Containers/BaseRewardContainer.ts:12](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L12)

Inherited from: [BaseRewardContainer](baserewardcontainer.md).[callback](baserewardcontainer.md#callback)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:12](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L12)

___

### opened

• `Readonly` **opened**: *ISignal*<(`rewards`: readonly [*Reward*](../README.md#reward)<string\>[]) => *void*\>

Fired when the container opens
Some reward container implementations may open more than once

Inherited from: [BaseRewardContainer](baserewardcontainer.md).[opened](baserewardcontainer.md#opened)

Defined in: [src/classes/Containers/BaseRewardContainer.ts:11](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/BaseRewardContainer.ts#L11)

___

### rewardedPlayer

• `Protected` `Readonly` **rewardedPlayer**: *Player*

Inherited from: [BaseRewardContainer](baserewardcontainer.md).[rewardedPlayer](baserewardcontainer.md#rewardedplayer)

## Methods

### canOpen

▸ **canOpen**(): *boolean*

**Returns:** *boolean*

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/RecurringTimeLockedRewardContainer.ts:134](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/RecurringTimeLockedRewardContainer.ts#L134)

___

### connectToUnlockUnixTimestampChanges

▸ **connectToUnlockUnixTimestampChanges**(`handler`: () => *void*): ISignalConnection

Hooks up a handler function to run when the next unlock Unix timestamp changes

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`handler` | () => *void* | The function to run    |

**Returns:** ISignalConnection

Defined in: [src/classes/Containers/RecurringTimeLockedRewardContainer.ts:143](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/RecurringTimeLockedRewardContainer.ts#L143)

___

### getNextUnlockUnixTimestamp

▸ **getNextUnlockUnixTimestamp**(): *number*

Gets the next unlock Unix timestamp

**Returns:** *number*

Defined in: [src/classes/Containers/RecurringTimeLockedRewardContainer.ts:150](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/RecurringTimeLockedRewardContainer.ts#L150)

___

### open

▸ **open**(): *void*

**Returns:** *void*

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/RecurringTimeLockedRewardContainer.ts:154](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/RecurringTimeLockedRewardContainer.ts#L154)

___

### openAsync

▸ **openAsync**(): *Promise*<void\>

**Returns:** *Promise*<void\>

Overrides: [BaseRewardContainer](baserewardcontainer.md)

Defined in: [src/classes/Containers/RecurringTimeLockedRewardContainer.ts:158](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/RecurringTimeLockedRewardContainer.ts#L158)

___

### create

▸ `Static`**create**(`name`: *string*, `recurrenceIntervalInSeconds`: *number*, `rewardedPlayer`: *Player*, `rewardsOpeningCoordinator`: [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md), `persister?`: { `loadUnlockUnixTimestampForPlayerAsync`: (`player`: *Player*, `rewardsContainerName`: *string*) => *Promise*<number\> ; `saveUnlockUnixTimestampForPlayerAsync`: (`player`: *Player*, `unlockUnixTimestamp`: *number*, `rewardsContainerName`: *string*) => *Promise*<void\>  }): [*RecurringTimeLockedRewardContainer*](recurringtimelockedrewardcontainer.md)

Used to create a new instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`name` | *string* | A name to use for logging purposes   |
`recurrenceIntervalInSeconds` | *number* | The recurrence interval to use in between opening and unlocking   |
`rewardedPlayer` | *Player* | The player to associate with the reward container   |
`rewardsOpeningCoordinator` | [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md) | The opening coordinator to use upon opening   |
`persister?` | *object* | A persister that is used to load and save the unlock unix timestamp for the player for this reward container. Note that if none is provided, a default one that uses DataStoreService will be used and for new players the reward container will be open immediately.    |
`persister.loadUnlockUnixTimestampForPlayerAsync` | (`player`: *Player*, `rewardsContainerName`: *string*) => *Promise*<number\> | - |
`persister.saveUnlockUnixTimestampForPlayerAsync` | (`player`: *Player*, `unlockUnixTimestamp`: *number*, `rewardsContainerName`: *string*) => *Promise*<void\> | - |

**Returns:** [*RecurringTimeLockedRewardContainer*](recurringtimelockedrewardcontainer.md)

Defined in: [src/classes/Containers/RecurringTimeLockedRewardContainer.ts:100](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Containers/RecurringTimeLockedRewardContainer.ts#L100)
