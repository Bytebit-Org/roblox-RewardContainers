[@rbxts/reward-containers](../README.md) / VirtualCurrencyRewardGranter

# Class: VirtualCurrencyRewardGranter<CurrencyType\>

A generic implementation of a virtual currency reward granter
- Requires a generic string union parameter to list the available currency types
- Requires an async function to actually grant the virtual currency

## Type parameters

Name | Type |
:------ | :------ |
`CurrencyType` | *string* |

## Implements

* [*IRewardGranter*](../interfaces/irewardgranter.md)

## Table of contents

### Methods

- [grantReward](virtualcurrencyrewardgranter.md#grantreward)
- [grantRewardAsync](virtualcurrencyrewardgranter.md#grantrewardasync)
- [create](virtualcurrencyrewardgranter.md#create)

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

Defined in: [src/classes/Granters/VirtualCurrencyRewardGranter.ts:41](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Granters/VirtualCurrencyRewardGranter.ts#L41)

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

Defined in: [src/classes/Granters/VirtualCurrencyRewardGranter.ts:45](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Granters/VirtualCurrencyRewardGranter.ts#L45)

___

### create

▸ `Static`**create**<CurrencyType\>(`awardVirtualCurrencyAsync`: *AwardVirtualCurrencyAsyncFunction*<CurrencyType\>): [*VirtualCurrencyRewardGranter*](virtualcurrencyrewardgranter.md)<CurrencyType\>

Creates a new instance

#### Type parameters:

Name | Type |
:------ | :------ |
`CurrencyType` | *string* |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`awardVirtualCurrencyAsync` | *AwardVirtualCurrencyAsyncFunction*<CurrencyType\> | An async function to actually grant the virtual currency    |

**Returns:** [*VirtualCurrencyRewardGranter*](virtualcurrencyrewardgranter.md)<CurrencyType\>

Defined in: [src/classes/Granters/VirtualCurrencyRewardGranter.ts:34](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/Granters/VirtualCurrencyRewardGranter.ts#L34)
