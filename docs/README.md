@rbxts/reward-containers

# @rbxts/reward-containers

## Table of contents

### Classes

- [BadgeRewardGranter](classes/badgerewardgranter.md)
- [BaseRewardContainer](classes/baserewardcontainer.md)
- [ConstantRewardsSelector](classes/constantrewardsselector.md)
- [RecurringTimeLockedRewardContainer](classes/recurringtimelockedrewardcontainer.md)
- [RepeatingSeriesRewardsSelector](classes/repeatingseriesrewardsselector.md)
- [StandardRewardContainer](classes/standardrewardcontainer.md)
- [StandardRewardsOpeningCoordinator](classes/standardrewardsopeningcoordinator.md)
- [TimeLockedRewardContainer](classes/timelockedrewardcontainer.md)
- [VirtualCurrencyRewardGranter](classes/virtualcurrencyrewardgranter.md)
- [WeightedRewardsSelector](classes/weightedrewardsselector.md)

### Interfaces

- [IRewardContainer](interfaces/irewardcontainer.md)
- [IRewardGranter](interfaces/irewardgranter.md)
- [IRewardsOpeningCoordinator](interfaces/irewardsopeningcoordinator.md)
- [IRewardsSelector](interfaces/irewardsselector.md)

### Type aliases

- [BadgeReward](README.md#badgereward)
- [Reward](README.md#reward)
- [VirtualCurrencyReward](README.md#virtualcurrencyreward)

## Type aliases

### BadgeReward

Ƭ **BadgeReward**: [*Reward*](README.md#reward) & { `badgeId`: *number* ; `type`: *Badge*  }

A reward that grants a badge

Defined in: [src/types/BadgeReward.d.ts:6](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/types/BadgeReward.d.ts#L6)

___

### Reward

Ƭ **Reward**<T\>: *object*

Generic reward type

#### Type parameters:

Name | Type | Default |
:------ | :------ | :------ |
`T` | *string* | *string* |

#### Type declaration:

Name | Type |
:------ | :------ |
`type` | T |

Defined in: [src/types/Reward.d.ts:4](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/types/Reward.d.ts#L4)

___

### VirtualCurrencyReward

Ƭ **VirtualCurrencyReward**<CurrencyType\>: [*Reward*](README.md#reward) & { `currencyType`: CurrencyType ; `type`: *VirtualCurrency* ; `value`: *number*  }

A reward of an amount of virtual currency (not Robux)

#### Type parameters:

Name | Type |
:------ | :------ |
`CurrencyType` | *string* |

Defined in: [src/types/VirtualCurrencyReward.d.ts:6](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/types/VirtualCurrencyReward.d.ts#L6)
