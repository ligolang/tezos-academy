# Chapter 10 : Maps

<dialog character="pilot">Ok, it's now time to open our star map and decide where we want to go.</dialog>

Maps are a data structure which associates values of the same type to values of the same type. The former are called keys and the latter values. Together they make up a binding. An additional requirement is that the type of the keys must be comparable, in the Michelson sense.

## Declaration

Maps are declared as:

```
type balances = map<string, nat>;
```

## Instantiation

To create an empty map :

```
const empty: balances = Map.empty;
```

ℹ️ An empty map must be cast to the right type. More on this later.

```
const empty: balances = (Map.empty as map<string, nat>);
```

To create a non-empty map:

```
const moves: balances = Map.literal(list([
    ["tim", 5n],
    ["mark", 0n]
]));
```

ℹ️ The *Map.literal* function expects a list of *[key, value]* pairs separated by *,*.


## Access

Use the *Map.find_opt* built-in function to read a value of the map :

```
const my_balance: option<nat> = Map.find_opt("tim", moves);
```

ℹ️ The keyword option indicates that this value is optional. More on this later.

## Update

The values of a map can be updated using the _Map.update_ built-in function:

```
const user_balances: balances = Map.update("tim", Some(14n), moves);
```

## Insertion

To add a new value in the map, use the _Map.add_ function:

```
const user_balances: balances = Map.add("ed", 39n, moves);
```

## Removal

A key-value pair can be removed from the mapping as follows :

```
Map.remove("tim", moves);
```

## Big Maps

<!-- prettier-ignore -->Maps load their entries into the environment, which is fine for small maps, but for maps holding millions of entries, the cost of loading such a map would be too expensive. For this, we use *big\_maps*. Their syntax is the same as for regular maps.

## Your mission

<!-- prettier-ignore -->1- Notice we defined _coordinates_ as a 3D tuple.

<!-- prettier-ignore -->2- Define the type *name\_to\_coordinates* as a mapping from the celestial body name to its coordinates.

<!-- prettier-ignore -->3- Create a new map called *star\_map* and add values for _earth_ at 2,7,1 , the _sun_ at 0,0,0 and _alpha-centauri_ at 2232,7423,12342 .

<!-- prettier-ignore -->⚠️ If you have installed LIGO, then you can check the value of the *star_map* variable by running the following command:

```
ligo run interpret --init-file exercise.jsligo 'star_map'
```


