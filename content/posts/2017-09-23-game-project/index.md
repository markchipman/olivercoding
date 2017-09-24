---
path: "2017-09-23-game-project"
date: "2017-09-23T22:07:26-04:00"
title: "F# Game Project"
excerpt: "A brief summary of ongoing game project and F#"
cover: "https://unsplash.it/1152/300/?random?SuperLong"
category: "tech"
tags:
    - F#
    - GameDev
    - Morgemil
    - Functional Programming
---

About 2007 or so I ran across a game called _Tales of Middle Earth_ or _ToME_ which I've found on the [wayback machine][0]. 

I loved ToME and played many hours and playthroughs of it.

There's a whole slew of history of how ToME descended from the game [Angband][1] which descended from the game [Moria][2] which descended from the game [Rogue][3], but I'm not a historian. Anyway, Rogue is the game from which the term [_Roguelike_][4] came from.

I have a notebook with various design details, questions, and plans. My concept for this game is that the game opens with a demand of the player "_Tell me a tale of the Morgemil_". The "_Morgemil_" is a title that the player assumes for their character. The more daring feats and the more achievements the player does, the better the tale and the higher the score.  For now, the game design isn't important.

I'm going through all this background to explain the roots and influences of my long-term on-going game project of several years. It's not terribly relevant right now, but it will explain many of my later revealed game design choices.

<br/>

I've rebooted my game project dozens of times, tried different technologies, completely rewrote everything, and sometimes given up. Perhaps the most unlikely point is when I started [writing it in C++ with excessive use of templates][5]. I wrote these lines:

> _The entire engine is currently written in C++ (the C++11 standard)._

> _To say I'm abusing the compiler is an understatement. Most of the engine core is header only templates which guarantees slow compile time. To make matters worse: recursive variadic templates and type inference are rampant. Thankfully, the cost is mostly compile time. Through the use of aggressive default templates, virtual functions are minimal._

> _The performance gains over the previous language (C#.NET) is absolutely astoundingly incomparable. "Premature optimization is the root of all evil" but it is very necessary in the case of a game engine. Also, by switching to C++, native support for Linux/Mac is gained._

I even wrote code like this.  I know that not all code can easily be self-documenting, but reading it now several years later, I have no clue what it does or why.
```cpp
template< class T, class T2, class...args >
struct MatchComponentWithCollection
{
    typedef typename std::conditional< std::is_same< T, typename BaseComponentType<T2>::ComponentType >::value,
                                      T2,
                                      typename MatchComponentWithCollection< T, args... >::type >::type type;
};

template< class T, class T2 >
struct MatchComponentWithCollection< T, T2 >
{
    typedef T2 type;
};
```

<br/>

**The moral of the story here, is that I never finished that attempt at writing a game because the code was terrible. The code was terrible because I had no consideration of the future programmer: me.**

<br/>

## The Rewrite

[My latest effort at writing a game is in F#][6]. The first commit to the repository was March 20th, 2015. The entire repository's directory has been cleared out several times since then, but at least my progress and lack of it is being tracked.


F# has been a very effective language to work in. I can model my objects clearly and safely. For example, all items so far are [held in this structure][7].
```fsharp
namespace Morgemil.Models

[<RequireQualifiedAccess>]
type ItemType = 
  | Weapon = 0
  | Wearable = 1
  | Consumable = 2

[<RequireQualifiedAccess>]
type SubItem =
  | Weapon of Weapon
  | Wearable of Wearable
  | Consumable of Consumable
  member this.ItemType =
    match this with
    | Weapon _ -> ItemType.Weapon
    | Wearable _ -> ItemType.Wearable
    | Consumable _ -> ItemType.Consumable

type Item =
  { ID: int
    ///The union of items
    SubItem: SubItem
    ///The general classification
    ItemType: ItemType
    ///Name of this item
    Noun: string
    ///If true, then never appears more than once in a game.
    IsUnique: bool
    ///A list of Tags that this Item possesses, along with the Value(s)
    Tags : Map<TagType, Tag>    
  }
```

F# has something called [_Discriminated Unions_][8] which allow me to store several possible types of items in one container, and then safely recognize what type of item is in the container. _SubItem_ in the code above is a discriminated union.

One case of the _SubItem_ is a _Weapon_.
```fsharp
[<RequireQualifiedAccess>]
type WeaponRangeType =
  | Melee = 0
  | Ranged = 1

type Weapon =
  { ///Type of this weapon
    RangeType: WeaponRangeType
    ///Base Range
    BaseRange: int
    ///The number of hands required to wield this weapon
    HandCount: int
    ///The weight of this item. Used in stamina
    Weight: decimal
  }
```

What this buys me, is that I can store any kind of item in one list. Internally in the game, the player object doesn't need to keep track of a list of weapons and of a list of consumables and of a list of wearables. And then later, if the consumable needs a new property, adding a property doesn't affect the other item types at all.

All my items are stored in one file. This file is what the game engine reads in to determine what items are in the game. Everything in the game is data-driven, but I'll explain completely how some other time. 

Here's the JSON for the first item in the game engine.
```json
	{	"id": "0",
		"noun": "short sword",
		"isunique": "false",
		"itemtype": "0",
		"subitem": {
			"rangetype": "0",
			"baserange": "1",
			"handcount": "1",
			"weight": "5.0"
		},
		"tags": {
		}
	}
```

Hard-coding this inside F# would look like this. Fairly simple and 99% of items should fit into this nicely.
```fsharp
{   Item.ID = 0
    Item.Noun = "short sword"
    Item.IsUnique = false
    Item.ItemType = ItemType.Weapon
    Item.Tags = Map.empty<TagType, Tag>
    Item.SubItem = SubItem.Weapon(
        {   Weapon.RangeType = WeaponRangeType.Melee
            Weapon.BaseRange = 0
            Weapon.HandCount = 0
            Weapon.Weight = 5.0m
        }
    )
}
```
Whenever I deconstruct a union, the compiler forces me to account for every case of the discriminated union. This enforces some nice safety in that there won't be an exception because I forgot to handle a case.

```fsharp
//### Prints "short sword is a Melee weapon" ###
match item.SubItem with
| SubItem.Weapon(weapon) -> printfn "%s is a %A weapon" item.Noun weapon.RangeType
| SubItem.Wearable(wearable) -> printfn "%s is a wearable" item.Noun
| SubItem.Consumable(consumable) -> printfn "%s is a consumable" item.Noun
```

<br/>

F# is a functional language. F#, and .NET in general, are not as fast as the game engine I was writing in C++ and it doesn't need to be. Instead, I have gained so much progress by writing code that I can read a month later. F# has been an excellent choice of language.

## Summary

All my ramblings on F# and the game aside, I know it's unlikely that this project will be finished anytime soon. I have a habit of putting it aside for several months at a time. But right now, I'm optimistic and getting some code knocked out. We'll see what happens.

Any updates I have, I'll write a blog post about and all my code for [_Morgemil_][6] is on GitHub.

[0]: https://web.archive.org/web/20080820000454/http://t-o-m-e.net/
[1]: http://www.roguebasin.com/index.php?title=Angband
[2]: http://www.roguebasin.com/index.php?title=Moria
[3]: http://www.roguebasin.com/index.php?title=Rogue
[4]: https://en.wikipedia.org/wiki/Roguelike
[5]: https://bitbucket.org/teammorgemil/morgemil
[6]: https://github.com/DanielOliver/Morgemil
[7]: https://github.com/DanielOliver/Morgemil/blob/d29e26ad5a62da94c7e6d42095feb51284d800d5/Models/Item.fs
[8]: https://fsharpforfunandprofit.com/posts/discriminated-unions/
