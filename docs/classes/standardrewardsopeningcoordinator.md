[@rbxts/reward-containers](../README.md) / StandardRewardsOpeningCoordinator

# Class: StandardRewardsOpeningCoordinator

A standard rewards opening coordinator.
This coordinator will select rewards from the given rewards selector and then grant each one.

## Implements

* [*IRewardsOpeningCoordinator*](../interfaces/irewardsopeningcoordinator.md)

## Table of contents

### Methods

- [coordinateOpening](standardrewardsopeningcoordinator.md#coordinateopening)
- [coordinateOpeningAsync](standardrewardsopeningcoordinator.md#coordinateopeningasync)
- [create](standardrewardsopeningcoordinator.md#create)

## Methods

### coordinateOpening

▸ **coordinateOpening**(`rewardedPlayer`: *Player*): readonly [*Reward*](../README.md#reward)<string\>[]

Coordinates opening rewards.
This means that it will select the rewards and grant them to the player.

#### Parameters:

Name | Type |
:------ | :------ |
`rewardedPlayer` | *Player* |

**Returns:** readonly [*Reward*](../README.md#reward)<string\>[]

Implementation of: [IRewardsOpeningCoordinator](../interfaces/irewardsopeningcoordinator.md)

Defined in: [src/classes/RewardsOpeningCoordinators/StandardRewardsOpeningCoordinator.ts:33](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/RewardsOpeningCoordinators/StandardRewardsOpeningCoordinator.ts#L33)

___

### coordinateOpeningAsync

▸ **coordinateOpeningAsync**(`rewardedPlayer`: *Player*): *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Asynchronously coordinates opening rewards.
This means that it will select the rewards and grant them to the player.

#### Parameters:

Name | Type |
:------ | :------ |
`rewardedPlayer` | *Player* |

**Returns:** *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Implementation of: [IRewardsOpeningCoordinator](../interfaces/irewardsopeningcoordinator.md)

Defined in: [src/classes/RewardsOpeningCoordinators/StandardRewardsOpeningCoordinator.ts:37](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/RewardsOpeningCoordinators/StandardRewardsOpeningCoordinator.ts#L37)

___

### create

▸ `Static`**create**(`rewardGrantersByRewardType`: *ReadonlyMap*<string, [*IRewardGranter*](../interfaces/irewardgranter.md)\>, `rewardsSelector`: [*IRewardsSelector*](../interfaces/irewardsselector.md)): [*StandardRewardsOpeningCoordinator*](standardrewardsopeningcoordinator.md)

Creates a new instance

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rewardGrantersByRewardType` | *ReadonlyMap*<string, [*IRewardGranter*](../interfaces/irewardgranter.md)\> | The reward granters to use keyed by the type of reward that they grant   |
`rewardsSelector` | [*IRewardsSelector*](../interfaces/irewardsselector.md) | The rewards selector to use when coordinating a new opening sequence    |

**Returns:** [*StandardRewardsOpeningCoordinator*](standardrewardsopeningcoordinator.md)

Defined in: [src/classes/RewardsOpeningCoordinators/StandardRewardsOpeningCoordinator.ts:25](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/7501d5d/src/classes/RewardsOpeningCoordinators/StandardRewardsOpeningCoordinator.ts#L25)
