# Reward Containers
<p align="center">
	<a href="https://github.com/Bytebit-Org/roblox-RewardContainers/actions">
        <img src="https://github.com/Bytebit-Org/roblox-RewardContainers/workflows/CI/badge.svg" alt="CI status" />
    </a>
	<a href="http://makeapullrequest.com">
		<img src="https://img.shields.io/badge/PRs-welcome-blue.svg" alt="PRs Welcome" />
	</a>
	<a href="https://opensource.org/licenses/MIT">
		<img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" />
	</a>
	<a href="https://discord.gg/QEz3v8y">
		<img src="https://img.shields.io/badge/discord-join-7289DA.svg?logo=discord&longCache=true&style=flat" alt="Discord server" />
	</a>
</p>

Reward Containers is a package for Roblox game developers with built-in persistence (as makes sense) that can be swapped modularly to fit into any game's persistence schemes.
Reward Containers provide a framework for granting your players rewards. From simple things like badges to virtual currency and even loot boxes.
The point to Reward Containers is to provide a simple, modular system for rewarding players in games.

## Installation
### roblox-ts
Simply install to your [roblox-ts](https://roblox-ts.com/) project as follows:
```
npm i @rbxts/reward-containers
```

## Documentation
Documentation can be found [here](https://github.com/Bytebit-Org/roblox-RewardContainers/tree/master/docs), is included in the TypeScript files directly, and was generated using [TypeDoc](https://typedoc.org/).

## Example
Let's see how to use this system to build a daily rewards system where users can come in, open their rewards, and then they lock for 24 hours. To start, we need to define our reward granters by their reward type in a map, like so:

```ts
import { VirtualCurrencyRewardGranter } from "@rbxts/reward-containers";

type CurrencyType = "coins" | "gems";

// Note we are assuming the currencyService here. In reality, this callback should be implemented to your game's specifications for virtual currency
const virtualCurrencyRewardGranter = VirtualCurrencyRewardGranter.create<CurrencyType>(
	(rewardedPlayer, currencyType, value) =>
		currencyService.awardCurrencyToPlayerAsync(rewardedPlayer, currencyType, value),
);

const rewardGrantersByType = new Map([["VirtualCurrency", virtualCurrencyRewardGranter]]);
```

Note that you can implement your own reward granters and use them here! `VirtualCurrencyRewardGranter` and `BadgeRewardGranter` are provided as part of the package and can serve as examples.

For this daily reward system, we'll be granting players one random reward every day they join from a list of rewards. You could list more, but for now let's just put an 80% chance at 100 coins and a 20% chance at 100 gems, like so:

```ts
import { WeightedRewardsSelector } from "@rbxts/reward-containers";

const rewardsSelector = WeightedRewardsSelector.create(
    1, // maximumNumberOfRewards
    [
        {
            reward: {
                type: "VirtualCurrency",
                currencyType: "coins",
                value: 100,
            },
            weight: 80,
        },
        {
            reward: {
                type: "VirtualCurrency",
                currencyType: "gems",
                value: 100,
            },
            weight: 20,
        },
    ],
)
```

The last thing we'll need before we're ready to create our reward container is a rewards opening coordinator. We'll use the standard one, like so:

```ts
import { StandardRewardsOpeningCoordinator } from "@rbxts/reward-containers";

const rewardsOpeningCoordinator = StandardRewardsOpeningCoordinator.create(rewardGrantersByType, rewardsSelector);
```

And now we're ready to set up our reward container that will have a 24-hour recurrence interval - aka our daily reward container! These need to be tied to a player, so we'll set this up in a player added handler.

```ts
import { Players } from "@rbxts/services";
import { RecurringTimeLockedRewardContainer } from "@rbxts/reward-containers";

Players.PlayerAdded.Connect((player) => {
    const rewardContainerForPlayer = RecurringTimeLockedRewardContainer.create(
        "DailyRewardContainer", // name
        24 * 60 * 60, // recurrenceIntervalInSeconds - set to 24 hours in seconds
        player, // rewardedPlayer
        rewardsOpeningCoordinator,
    );
});
```

Now just hook this up to your system for communicating to things to the client and providing a UI, and you're done!