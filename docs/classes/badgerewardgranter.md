[@rbxts/reward-containers](../README.md) / BadgeRewardGranter

# Class: BadgeRewardGranter

A reward granter that grants a badge to a player

## Implements

* [*IRewardGranter*](../interfaces/irewardgranter.md)

## Table of contents

### Methods

- [grantReward](badgerewardgranter.md#grantreward)
- [grantRewardAsync](badgerewardgranter.md#grantrewardasync)
- [create](badgerewardgranter.md#create)

## Methods

### grantReward

▸ **grantReward**(`reward`: [*Reward*](../README.md#reward)<string\>, `rewardedPlayer`: *Player*): *void*

Grants the reward to the given player asynchronously

#### Parameters:

Name | Type |
:------ | :------ |
`reward` | [*Reward*](../README.md#reward)<string\> |
`rewardedPlayer` | *Player* |

**Returns:** *void*

Implementation of: [IRewardGranter](../interfaces/irewardgranter.md)

Defined in: [src/classes/Granters/BadgeRewardGranter.ts:27](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Granters/BadgeRewardGranter.ts#L27)

___

### grantRewardAsync

▸ **grantRewardAsync**(`reward`: [*Reward*](../README.md#reward)<string\>, `rewardedPlayer`: *Player*): *Promise*<void\>

Asynchronously grants the reward to the given player asynchronously

#### Parameters:

Name | Type |
:------ | :------ |
`reward` | [*Reward*](../README.md#reward)<string\> |
`rewardedPlayer` | *Player* |

**Returns:** *Promise*<void\>

Implementation of: [IRewardGranter](../interfaces/irewardgranter.md)

Defined in: [src/classes/Granters/BadgeRewardGranter.ts:31](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Granters/BadgeRewardGranter.ts#L31)

___

### create

▸ `Static`**create**(): [*BadgeRewardGranter*](badgerewardgranter.md)

Creates a new instance

**Returns:** [*BadgeRewardGranter*](badgerewardgranter.md)

Defined in: [src/classes/Granters/BadgeRewardGranter.ts:23](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/classes/Granters/BadgeRewardGranter.ts#L23)
