---
path: "2017-10-07-functional-json"
date: "2017-10-07"
title: "Functional JSON"
excerpt: "Functional JSON with F# and computation expressions"
category: "tech"
tags:
    - F#
    - GameDev
    - Morgemil
    - Functional Programming
    - JSON
---

I'm using the wonderful [Fsharp.Data][0] library to parse the JSON for me and handle all the [edge cases, such as seen in IETF RFC 7159][2].  Fsharp.Data JSON parse spits out results into [this structure][1]:  
```fsharp
type JsonValue =
  | String of string
  | Number of decimal
  | Float of float
  | Record of properties:(string * JsonValue)[]
  | Array of elements:JsonValue[]
  | Boolean of bool
  | Null 
```

<br/>

This is a nice [F# Discriminated Union][3] that effectively models JSON as a tree. And I'm going to use this to parse the data from my game _Morgemil_ into appropriate objects.

One of my objects represents a weapon in my game, and is modeled as this. All fine and dandy.
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

I would construct this from a JsonValue by accessing properties directly.
```fsharp
let LoadWeapon(values: JsonValue) 
    { Weapon.BaseRange = values?baserange.AsInteger()
      RangeType = values?rangetype |> CastEnum<WeaponRangeType>
      HandCount = values?handcount.AsInteger()
      Weight = values?weight.AsDecimal()
    }
``` 
The above function has a lot of appeal in that it's simple, succint, and works so long as the JsonValue has the required data.  

_But what if the required data is not there?_  Well, it would throw an exception. This isn't inherently bad, but it sure got confusing because the Weapon Data is actually nested inside another object
 _Items - Item - SubItem - Weapon_

It's not a good idea to nest multiple layers of functions that all might throw an exception when a JsonValue is unexpectedly different.  

For something at the scope of my use case, I could get away with it because I could track down exceptions fairly easily.  But what if this software were an enterprise POS (Point Of Sale) system?   Any error in the code would be days of a programmer's time spent to track the error down. And then the programmer would despair of refactoring the large amount of code and he/she would throw on a code band-aid until the next inevitable error. It would be well worth designing this code to handle errors more gracefully.

Actually, it would be worth my time to design this game to handle errors more gracefully. Yes, it's a small project, but even a giant POS system probably started out small. I never know how large my code base will grow, and it's worth it "to do it right" at the start.

<br>

## The Concept

Understanding the expected structure of a JsonValue is either Successful or Unsuccessful, and this fits right into a standard F# structure "Result".
```fsharp
type Result<'T,'TError> =
    | Ok of ResultValue: 'T
    | Error of ErrorValue: 'TError
```

This fits pretty well, but let's customize it a little bit.
```fsharp
type JsonError =
    | MissingProperty of PropertyName: string * Record: JsonValue
    | InconsistentArray of WrongValues: JsonError []
    | UnexpectedType of ExpectedType: string * JsonValue
    | PropertyErrors of WrongValues: JsonError[]
    
type JsonResult<'a> = Result<'a,JsonError>
```
FSharp.Data has already done the hard work of parsing JsonValue string's and such, let's leverage those functions. For example _AsInteger_, which takes an IFormatProvider (culture specific, which is irrelevant for us) and returns a function to convert a JsonValue into an int option. If the JsonValue may be converted into an int, Some value is returned, else None is returned.
```fsharp
 //System.IFormatProvider -> (JsonValue -> int option)
let AsInteger = FSharp.Data.Runtime.JsonConversions.AsInteger
```
That's pretty good, but I want to treat inability to convert JsonValue into an Int, as an error.  This function will do that for me.

```fsharp
let OptionToResult<'a> (name: string) (jsonValue: JsonValue) (value: 'a option): JsonResult<'a> = 
    match value with
    | Some x -> Ok x
    | None -> Error (JsonError.UnexpectedType(name, jsonValue))
```

With that, I can chain the _JsonConversion.AsInteger_ into _OptionToResult_ to create a function which returns a JsonResult from parsing a JsonValue.
```fsharp
let private culture = System.Globalization.CultureInfo.InvariantCulture
//JsonValue -> JsonResult<int>
let JsonAsInteger jsonValue = FSharp.Data.Runtime.JsonConversions.AsInteger culture jsonValue  |> OptionToResult "int" jsonValue
```

To give some examples of other variants of this:
```fsharp
let JsonAsDateTime jsonValue = FSharp.Data.Runtime.JsonConversions.AsDateTime culture jsonValue  |> OptionToResult "datetime" jsonValue
let JsonAsGuid jsonValue = FSharp.Data.Runtime.JsonConversions.AsGuid jsonValue  |> OptionToResult "guid" jsonValue
let JsonAsEnum<'t when 't : (new: unit -> 't) and 't : struct and 't :> System.ValueType > jsonValue = 
    jsonValue 
    |> JsonAsString
    |> Result.bind(
        System.Enum.TryParse<'t>
        >> function
            | true, x -> Ok x
            | false, _ -> Error (JsonError.UnexpectedType(typeof<'t>.Name, jsonValue)))
```
Tada! I can create JsonResult from JsonValue.

```fsharp
let iAmString = JsonValue.String "I am a string"
let jsonResult = JsonAsString iAmString
printfn "%A" jsonResult
//Ok "I am a string"
```

<br>
<br>

## Complex Objects.

What I've done so far, is great for small things like strings and numbers. I haven't yet addressed the weapon type given above. Here's how that code to get a weapon looks now
```fsharp
json value {
    let! baseRange = "baserange",JsonAsInteger
    let! rangeType = "rangetype",JsonAsEnum<WeaponRangeType>
    let! handCount = "handcount",JsonAsInteger
    let! weight = "weight",JsonAsDecimal
    return {
        Weapon.BaseRange = baseRange
        RangeType = rangeType
        HandCount = handCount
        Weight = weight
    }
```

The concept for code that looks like this came from the [F# Chiron][4] library which uses a custom JSON parser to do everything I'm doing above (but I wanted to use FSharp.Data).

"json" is a [F# Computation Expression][6] which is syntactic sugar to do some extra stuff. I won't get into the implementation, that's a long subject which is [explained here][5]. The complete [code for my computation expression is here.][7]
```fsharp
type JsonBuilder<'t>(value: JsonValue) =
    member this.Bind(m: _ option, f): _ option = 
        f m

    member this.Bind<'u>(m: Result<'u,JsonError>, f): Result<'t,JsonError> = 
        match m with
        | Ok x -> x |> f
        | Error err -> Error err

    member this.Bind(m: string, f): Result<'t,JsonError> = 
        match m
            |> value.TryGetProperty with
        | Some x -> x |> f
        | None -> Error (JsonError.MissingProperty (m, value))

    member this.Bind(m: string option, f) = 
        m |> Option.bind value.TryGetProperty |> f
        
    member this.Bind<'u>(m: (string * (JsonValue -> JsonResult<'u>)), f): Result<'t,JsonError> = 
        let result = Require m value
        match result with
        | Ok x -> f x
        | Error err -> Error err

    member this.Bind<'u>(m: JsonValue -> JsonResult<'u>, f): Result<'t,JsonError> = 
        let result = m value
        match result with
        | Ok x -> f x
        | Error err -> Error err
        
    member this.Bind(m: JsonValue -> JsonResult<'u> option, f) = 
        match value |> m with
        | Some x ->
            match x with 
            | Ok y -> Some y |> f
            | Error err -> Error err
        | None -> None |> f
        
    member this.Return(x) = 
        Ok x

// make an instance of the workflow 
let json value = new JsonBuilder<_>(value)
```

<br>

All of that code does several things:
* Using this _let!_ inside the epxression will attempt to get the JsonValue's property "weight" as a decimal. 
  * If the property does not exist or is the wrong type, then the entire computation expression will stop right there and return that JsonError.
  * If that property "weight" does exist and is the right type, then the next line in the computation expression will be tried.
  ```fsharp
  let! weight = "weight",JsonAsDecimal
  ```
* The computation expression has this signature (defining the parameters of the function, what it returns)
  ```fsharp
  JsonValue -> JsonResult<Weapon>
  ```
* By conforming all functions doing object parsing to the above function signature, these expressions may be nested.

The file of items may be returned as an array of items with these functions _JsonValue -> JsonResult<Item []>_
```fsharp
let JsonAsSubItem (itemType: ItemType) (value: JsonValue) = 
    match itemType with
    | ItemType.Weapon -> 
        json value {
            let! baseRange = "baserange",JsonAsInteger
            let! rangeType = "rangetype",JsonAsEnum<WeaponRangeType>
            let! handCount = "handcount",JsonAsInteger
            let! weight = "weight",JsonAsDecimal
            return {
                Weapon.BaseRange = baseRange
                RangeType = rangeType
                HandCount = handCount
                Weight = weight
            } |> SubItem.Weapon
        }
    | ItemType.Wearable -> 
        json value {
            let! wearableType = "wearabletype",JsonAsEnum<WearableType>
            let! weight = "weight",JsonAsDecimal
            return {
                Wearable.Weight = weight
                WearableType = wearableType
            } |> SubItem.Wearable
        }
    | ItemType.Consumable -> 
        json value {
            let! uses = "uses",JsonAsInteger
            return {
                Consumable.Uses = uses
            } |> SubItem.Consumable
        }
    | _ -> Error (JsonError.UnexpectedType("subitem", value))

let JsonAsItems (value: JsonValue) =
    value
    |> JsonAsArray(fun item ->
        json item {
            let! itemID = "id",JsonAsInteger
            let! noun = "noun",JsonAsString
            let! isUnique = "isunique",JsonAsBoolean
            let! itemType = "itemtype",JsonAsEnum<ItemType>
            let! subItem = "subitem",(JsonAsSubItem itemType)
            let! tags = "tags",JsonAsTagsMap
            return {
                Item.ID = itemID
                Noun = noun
                IsUnique = isUnique
                ItemType = itemType
                SubItem = subItem
                Tags = tags
            }
        }
    )
```

Here's the data file for "items.json"
```json
[
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
]
```

The end result of parsing the above file with the functions above would be 
```fsharp
JsonResult<Item>.Ok(
  [|
    { ID = 0;
      SubItem = Weapon {  RangeType = Melee;
                          BaseRange = 1;
                          HandCount = 1;
                          Weight = 5.0M;};
     ItemType = Weapon;
     Noun = "short sword";
     IsUnique = false;
     Tags = map [];
    }
  |]
```

Now let's change "itemtype" to a bad value "wasdwasd". I'd get a tolerable message as a result

```fsharp
JsonResult<Item>.Error(
  InconsistentArray 
    [|  UnexpectedType ("ItemType","wasdwasd")
    |]
)
```

<br>

## Summary

Loading JSON files no longer throws exceptions in my code. Yes, there's still the potential for malformed JSON to cause errors, and then these errors are handled gracefully. Reading this JSON is functional
```fsharp
let JsonAsScenario (basePath: string) (value: JsonValue) =
    json value {
        let! version = "version",JsonAsString
        let! date = "date",JsonAsDateTime
        let! name = "name",JsonAsString
        let! description = "description",JsonAsString
        return {
            Scenario.BasePath = basePath
            Version = version
            Name = name
            Date = date
            Description = description
        }
    }
```


[0]: http://fsharp.github.io/FSharp.Data/
[1]: https://github.com/fsharp/FSharp.Data/blob/fc1e853013900dd5d680b9bc9ebe8d3ed3a5f8dd/src/Json/JsonValue.fs#L32-L41
[2]: https://tools.ietf.org/html/rfc7159
[3]: https://fsharpforfunandprofit.com/posts/discriminated-unions/
[4]: https://github.com/xyncro/chiron
[5]: https://fsharpforfunandprofit.com/series/computation-expressions.html
[6]: https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/computation-expressions
[7]: https://github.com/DanielOliver/Morgemil/blob/4f80d508e0f65f0e26cdfa1cee8dd73468354b83/Utility/JsonHelper.fs#L79-L121
