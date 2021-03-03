[@rbxts/reward-containers](../README.md) / IRewardGranter

# Interface: IRewardGranter

Provides the interface for granting a reward of a certain type to a player

## Implemented by

* [*BadgeRewardGranter*](../classes/badgerewardgranter.md)
* [*VirtualCurrencyRewardGranter*](../classes/virtualcurrencyrewardgranter.md)

## Table of contents

### Methods

- [grantReward](irewardgranter.md#grantreward)
- [grantRewardAsync](irewardgranter.md#grantrewardasync)

## Methods

### grantReward

▸ **grantReward**(`reward`: [*Reward*](../README.md#reward)<string\>, `rewardedPlayer`: *Player*): *void*

Grants the reward to the given player asynchronously

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reward` | [*Reward*](../README.md#reward)<string\> | The reward to grant   |
`rewardedPlayer` | *Player* | The player receiving the reward    |

**Returns:** *void*

Defined in: [src/interfaces/IRewardGranter.d.ts:12](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/interfaces/IRewardGranter.d.ts#L12)

___

### grantRewardAsync

▸ **grantRewardAsync**(`reward`: [*Reward*](../README.md#reward)<string\>, `rewardedPlayer`: *Player*): *Promise*<void\>

Asynchronously grants the reward to the given player asynchronously

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reward` | [*Reward*](../README.md#reward)<string\> | The reward to grant   |
`rewardedPlayer` | *Player* | The player receiving the reward    |

**Returns:** *Promise*<void\>

Defined in: [src/interfaces/IRewardGranter.d.ts:19](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/interfaces/IRewardGranter.d.ts#L19)
