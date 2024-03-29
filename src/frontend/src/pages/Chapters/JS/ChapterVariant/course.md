# Chapter 12 : Unit, Variant and Pattern matching

<dialog character="mechanics">Captain, before we go, you may want to set up your commands to set the ship code and go to a destination.</dialog>

Optionals are a pervasive programing pattern in OCaml. Since Michelson and LIGO are both inspired by OCaml, optional types are available in LIGO as well. Similarly, OCaml features a unit type, and LIGO features it as well. Both the option type and the unit types are instances of a more general kind of types: variant types (sometimes called sum types).

## Unit

The unit type in Michelson or LIGO is a predefined type that contains only one value that carries no information. It is used when no relevant information is required or produced. Here is how it used.

In JsLIGO, the unique value of the unit type is _unit_.

```
const n: unit = unit;
```

## Variant

A variant type is a user-defined or a built-in type (in the case of options) that defines a type by cases, so a value of a variant type is either this, or that, or... The simplest variant type is equivalent to the enumerated types found in Java, C++, JavaScript etc.

Here is how we define a coin as being either head or tail (and nothing else):

```
type coin = ["Head"] | ["Tail"];

let head: coin = Head();
let tail: coin = Tail();
```

The names Head and Tail in the definition of the type coin are called data constructors, or variants. In this particular case, they carry no information beyond their names, so they are called constant constructors.

In general, it is interesting for variants to carry some information, and thus go beyond enumerated types. In the following example, we show how to define different kinds of users of a system.

```
type id = nat;

type user =
  ["Admin", id]
| ["Manager", id]
| ["Guest"];

const u: user = Admin(1000n);
const g: user = Guest();
```

In LIGO, a constant constructor is equivalent to the same constructor taking an argument of type unit. So, for example, Guest is the same value as Guest (unit).

## Pattern matching

Pattern matching is similar to the switch construct in JavaScript and can be used to route the program's control flow based on the value of a variant. Consider, for example, the definition of a function flip that flips a coin.

```
type coin = ["Head"] | ["Tail"];

const flip = (input_coin: coin): coin =>
  match(input_coin) {
    when(Head): Tail();
    when(Tail): Head();
  };
```

## Your mission

<!-- prettier-ignore -->1- Create the type _parameter_ as a variant.

<!-- prettier-ignore -->2- Define the first option of the variant as *Set\_ship\_code* which will be our action to set the ship code. Notice this will take a string as an input.

<!-- prettier-ignore -->3- Define the second option of the variant as *Go\_to*, which will be our action to set the ship on course to a new destination. Notice this will also take a string as an input.

