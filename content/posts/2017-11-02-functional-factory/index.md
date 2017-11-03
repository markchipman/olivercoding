---
path: "2017-11-02-functional-factory"
date: "2017-11-02T20:30:00-04:00"
title: "Functional Factory"
excerpt: "The factory pattern, but functional"
category: "tech"
tags:
    - F#
    - Functional Programming
    - Design Patterns
---

[Object-Oriented-Programming (OOP)][0] has a multitude of conventions that come with it, including an abundance of well-known [software design patterns][1]. One of the most famous design patterns is the factory pattern.

The factory pattern is an excellent pattern. Yet sometimes patterns and over-engineering could be taken so far as to obfuscate large systems. Here's a parody illustrating the kind of traps that large enterprise software may fall into: [FizzBuzzEnterpriseEdition][2].

Fortunately, when to use the factory pattern is not my topic here. I want to show an example of a functional factory pattern. 

First, let's show a contrived C# example of a factory that may return one of two implementations of an interface.
```csharp
   interface IDoStuff 
    {
        void DoStuff(string name);
    }
    class DoStuff1: IDoStuff 
    {
        public void DoStuff(string name) 
        {
            Console.WriteLine("One " + name);
        }
    }
    class DoStuff2: IDoStuff 
    {
        public void DoStuff(string name) 
        {
            Console.WriteLine("Two " + name);
        }
    }
    class DoStuffFactory 
    {
        public IDoStuff CreateDoStuff(int doStuffType) 
        {
            if(doStuffType <= 1)
                return new DoStuff1();
            else
                return new DoStuff2();
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            var factory = new DoStuffFactory();
            var iDoStuff = factory.CreateDoStuff(2);
            iDoStuff.DoStuff("fish"); //"Two fish"
        }
    }
```

<br/>

Now lets take that and turn it into F#. Since the interface above only has one method, I have taken the liberty of representing that interface as a function _void DoStuff()_ becomes the F# signature _string -> unit_
```fsharp
let DoStuff1 name = printfn "One %s" name
let DoStuff2 name = printfn "Two %s" name

let DoStuffFactory doStuffType =
    match doStuffType with
    | x when x <= 1 -> DoStuff1
    | _ -> DoStuff2

[<EntryPoint>]
let main argv =
    let iDoStuff = DoStuffFactory 2
    iDoStuff "fish" // "Two fish"
    0
```

<br/>

Alternatively, if the factory method construction is trivial, the factory and each implementation could become one function. 

```fsharp
let DoStuff doStuffType name =
    match doStuffType with
    | x when x <= 1 -> printfn "One %s" name
    | _ -> printfn "Two %s" name   

[<EntryPoint>]
let main argv =
    let iDoStuff = DoStuff 2
    iDoStuff "fish" // "Two fish"
    0
```

<br/>

This also presumes that the code is small enough and concise enough to fit in one method. If my example were anything more than printfn, it could get bothersome. So let's perhaps change that a touch.

```fsharp
let DoStuff doStuffType name =
    let number = if doStuffType <= 1 then "One" else "Two"
    printfn "%s %s" number name
```

<br/>

The main method is still treating that single function as a factory. _DoStuff 2_ is still returning a method of signature _string -> unit_.

```fsharp
[<EntryPoint>]
let main argv =
    let iDoStuff = DoStuff 2
    iDoStuff "fish" // "Two fish"
    0
```

<br/>

The ability to only supply some of the arguments to a method and then leave the rest of the parameters as a new function, is called [currying][4]. Inside the compiler, the _DoStuff_ method is closer to this: A function with one parameter, that returns another function with one parameter. And that nesting of functions returning functions could go as deep as there are parameters.

```fsharp
let DoStuff doStuffType =
    let internalMethod name =
        let number = if doStuffType <= 1 then "One" else "Two"
        printfn "%s %s" number name
    internalMethod 
```

<br/>

Using the above form is not something you would typically need to, you could use the one function with many parameters approach just fine in 90% of the cases. However, sometimes that factory method could be doing some heavy stuff including database reads or loading configuration files. 

Let's move all that heavy lifting so the factory only has to do that work once. For this example's purposes, imagine that finding the number is a very hard task.

```fsharp
let DoStuff doStuffType =
    let number = if doStuffType <= 1 then "One" else "Two" //Very hard task.
    let internalMethod name =
        printfn "%s %s" number name
    internalMethod

    [<EntryPoint>]
let main argv =
    let iDoStuff = DoStuff 2
    iDoStuff "fish" // "Two fish"
    //OR skip the factory, and just use it as a method:
    DoStuff 1 "cat" // "One cat"
    0
```

<br/>

## Summary


A factory pattern requiring an interface, two implementations of that interface, and a factory, has been replaced by one method that returns another method.




[0]: https://en.wikipedia.org/wiki/Object-oriented_programming
[1]: https://en.wikipedia.org/wiki/Software_design_pattern
[2]: https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition/tree/22f391c91301aaeea8252ccd5bf03c2bd0378eae/src/main/java/com/seriouscompany/business/java/fizzbuzz/packagenamingpackage/impl/factories
[4]: https://fsharpforfunandprofit.com/posts/currying/
