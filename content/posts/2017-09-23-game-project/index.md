---
path: "2017-09-23-game-project"
date: "2017-09-23T22:07:26-04:00"
title: "Game Project"
excerpt: "A brief summary of ongoing game project"
cover: "https://unsplash.it/1152/300/?random?SuperLong"
category: "tech"
tags:
    - F#
    - GameDev
    - Morgemil
---

About 2007 or so I ran across a game called _Tales of Middle Earth_ or _ToME_ which I've found on the [wayback machine][0]. 

I loved ToME and played many hours and playthroughs of it.

There's a whole slew of history of how ToME descended from the game [Angband][1] which descended from the game [Moria][2] which descended from the game [Rogue][3], but I'm not a historian. Anyway, Rogue is the game from which the term [_Roguelike_][4] came from.

I'm going through all this background to explain the roots and influences of my long-term on-going game project of several years.

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

#### The moral of the story here, is that I never finished that attempt at writing a game because the code was terrible. The code was terrible because I had no consideration of the future programmer: me. 




[0]: https://web.archive.org/web/20080820000454/http://t-o-m-e.net/
[1]: http://www.roguebasin.com/index.php?title=Angband
[2]: http://www.roguebasin.com/index.php?title=Moria
[3]: http://www.roguebasin.com/index.php?title=Rogue
[4]: https://en.wikipedia.org/wiki/Roguelike
[5]: https://bitbucket.org/teammorgemil/morgemil
