[@rbxts/reward-containers](../README.md) / IRewardsOpeningCoordinator

# Interface: IRewardsOpeningCoordinator

Provides the interface for coordinating the opening of rewards
"Opening" of rewards means selecting the rewards to give and granting them

## Implemented by

* [*StandardRewardsOpeningCoordinator*](../classes/standardrewardsopeningcoordinator.md)

## Table of contents

### Methods

- [coordinateOpening](irewardsopeningcoordinator.md#coordinateopening)
- [coordinateOpeningAsync](irewardsopeningcoordinator.md#coordinateopeningasync)

## Methods

### coordinateOpening

▸ **coordinateOpening**(`rewardedPlayer`: *Player*): readonly [*Reward*](../README.md#reward)<string\>[]

Coordinates opening rewards.
This means that it will select the rewards and grant them to the player.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rewardedPlayer` | *Player* | The player to give the rewards to upon opening    |

**Returns:** readonly [*Reward*](../README.md#reward)<string\>[]

Defined in: [src/interfaces/IRewardsOpeningCoordinator.d.ts:13](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/interfaces/IRewardsOpeningCoordinator.d.ts#L13)

___

### coordinateOpeningAsync

▸ **coordinateOpeningAsync**(`rewardedPlayer`: *Player*): *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Asynchronously coordinates opening rewards.
This means that it will select the rewards and grant them to the player.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rewardedPlayer` | *Player* | The player to give the rewards to upon opening    |

**Returns:** *Promise*<readonly [*Reward*](../README.md#reward)<string\>[]\>

Defined in: [src/interfaces/IRewardsOpeningCoordinator.d.ts:20](https://github.com/Bytebit-Org/roblox-RewardContainers/blob/19b2d3b/src/interfaces/IRewardsOpeningCoordinator.d.ts#L20)
