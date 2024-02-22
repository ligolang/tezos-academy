# Chapter 7 : Conditionals

<dialog character="robot">[DROID-1242] INVALID CONDITIONAL INSTRUCTIONS. ERR %%$7834[[{23e3}]] PLEASE SPECIFY CONDITIONAL INSTRUCTIONS.</dialog>

## Booleans

Booleans are typed _bool_ in LIGO :

```jsligo compilation=contract
const a: bool = true; // or false
```

## Comparing Values

Only values of the same type can be natively compared, i.e. int, nat, string, tez, timestamp, address, etc. However, some values of the same type are not natively comparable, i.e., maps, sets, or lists. You will have to write your own comparison functions for those.

```jsligo compilation=contract
// Comparing strings
const a: string = "Alice";
const b: string = "Alice";
const c: bool = (a == b); // true

// Comparing numbers
const a: int = 5;
const b: int = 4;
const c: bool = (a == b);
const d: bool = (a > b);
const e: bool = (a < b);
const f: bool = (a <= b);
const g: bool = (a >= b);
const h: bool = (a != b);

// Comparing tez
const a: tez = 5mutez;
const b: tez = 10mutez;
const c: bool = (a == b); // false
```

## Conditionals

Conditional logic enables forking the control flow depending on the state.

```jsligo compilation=contract
const isSmall = (n : nat) : bool => {
  if (n < 10n)  return true else return false
};
```

## Your mission

We want to conditionally change the engine attribute (third number) to 1 only if it is equal to 0.

<!-- prettier-ignore -->1- Define a condition _if_ the engine attribute equal to 0. Don't forget the attributes are defined as strings.

<!-- prettier-ignore -->2- If the condition is met, apply changes and return resulting new ship code. Otherwise, return the given ship code (parameter *my\_ship*).

<!-- prettier-ignore -->⚠️ If you have installed LIGO, then you can test the execution of the *modify\_ship* function by running the following command:

```
ligo run interpret --init-file main.jsligo 'modify_ship("010433")'
```
