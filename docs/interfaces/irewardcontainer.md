[@rbxts/reward-containers](../README.md) / IRewardContainer

# Interface: IRewardContainer

Provides the interface for a reward container
Reward containers are tied to an individual player

## Implemented by

* [*BaseRewardContainer*](../classes/baserewardcontainer.md)

## Table of contents

### Properties

- [opened](irewardcontainer.md#opened)

### Methods

- [canOpen](irewardcontainer.md#canopen)
- [open](irewardcontainer.md#open)
- [openAsync](irewardcontainer.md#openasync)

## Properties

### opened

• `Readonly` **opened**: *IReadOnlySignal*<(`rewards`: readonly [*Reward*](../README.md#reward)<string\>[]) => *void*\>

Fired when the container opens
Some reward container implementations may open more than once

**`argument`** rewards The list of rewards that were granted to the associated player

Defined in: [src/interfaces/IRewardContainer.d.ts:14](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/interfaces/IRewardContainer.d.ts#L14)

## Methods

### canOpen

▸ **canOpen**(): *boolean*

Returns whether the reward container is ready to open

**Returns:** *boolean*

Defined in: [src/interfaces/IRewardContainer.d.ts:19](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/interfaces/IRewardContainer.d.ts#L19)

___

### open

▸ **open**(): *void*

Runs the process of opening the container, including selecting and granting the rewards to the associated player

**Returns:** *void*

Defined in: [src/interfaces/IRewardContainer.d.ts:24](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/interfaces/IRewardContainer.d.ts#L24)

___

### openAsync

▸ **openAsync**(): *Promise*<void\>

Asynchronously runs the process of opening the container, including selecting and granting the rewards to the associated player

**Returns:** *Promise*<void\>

Defined in: [src/interfaces/IRewardContainer.d.ts:29](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/interfaces/IRewardContainer.d.ts#L29)
