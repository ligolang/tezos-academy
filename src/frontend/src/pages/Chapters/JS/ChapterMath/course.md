# Chapter 4 : Math

<dialog character="scientist">Hello, I'm Dr. Zod, I hope you didn't sleep during your math class in the academy because you're going to need it! Your ship needs at least 1.21 gigawatts to function properly. Battery packs provide 0.16 gigawatts per unit. How many battery packs do you need? Seems easy, right? Well, no, because the system doesn't run floating-point numbers, so... good luck with that!</dialog>

LIGO offers three built-in numerical types:

- _int_ represents integers, such as 10, -6 and 0. However, there is only one canonical zero: 0 (so, for instance, -0 and 00 are invalid).

- _nat_ represents natural numbers (integral numbers greater than or equal to zero). They are followed by the annotation _as nat_, such as 3 _as nat_, 12 _as nat_, and 0 _as nat_ for the natural zero. The same restriction on zero as integers applies: 0 _as nat_ is the only way to specify the natural zero.

- _tez_ represents units of measure of Tezos tokens. They can be decimals and are followed by the annotation _tez_, such as 3 _as tez_. You can also type units of millionths of tez, using the annotation _as mutez_ after a natural literal, such as 10000 _as mutez_ or _0 as mutez_.

⚠️ Notice there are no floating-point types in LIGO as they are not deterministic in hardware modules.

<!-- prettier-ignore -->
ℹ️ Large integral values can be expressed using underscores to separate groups of digits, like 1\_000 _as mutez_ or 0.000\_004 _as tez_. Notice 1 _as tez_ = 1\_000\_000 _as mutez_.

## Addition

Addition in LIGO is accomplished by means of the + infix operator. Some type constraints apply; for example, you cannot add a value of type tez to a value of type nat.

```
const a: int = 5 + 10; // int + int yields int
const b: int = 5n + 10; // nat + int yields int
const c: tez = 5mutez + 0.000_010tez; // tez + tez yields tez
const e: nat = 5n + 10n; // two nats yield a nat
```

⚠️ You cannot add a tez and an int.

ℹ️ You can use underscores for readability when defining large numbers:

```
const sum : tez = 100_000mutez;
```

## Subtraction

Subtractions follow the same principles.
⚠️ Even when subtracting two nats, the result is an int

```
const a: int = 5 - 10;
const b: int = 5n - 2n; // Subtraction two nats yields an int
```

⚠️ From protocol Ithaca onwards, subtracting values of type tez yields an optional value (due to the Michelson instruction *SUB_MUTEZ*)

```
const c : option<tez> = 5mutez - 1mutez; /* Some (4mutez) */
const d : option<tez> = 1mutez - 5mutez; /* None */
```

## Multiplication

Multiplications follow the same principles.

```
const a: int = 5 * 5;
const b: nat = 5n * 5n;
// You can also multiply `nat` and `tez`
const c: tez = 5n * 5mutez;
```

## Division

Divisions follow the same principles.

```
const a: int = 10 / 3;
const b: nat = 10n / 3n;
const c: nat = 10mutez / 3mutez;
```

⚠️ Remember that there are no floating-point numbers in LIGO, so dividing 9 by 2 will output 4, not 4.5.

## Modulo

The behaviour of the _%_ operator in JsLIGO is different from JavaScript. In JsLIGO, _%_ is a modulus operator, whereas in JavaScript, it's a remainder operator. For positive numbers, the behavior is the same, but not with negative numbers.

```
const a: int = 120;
const b: int = 9;
const rem1: nat = a % b;  // 3
const c: nat = 120n;
const rem2: nat = c % b;  // 3
const d: nat = 9n;
const rem3: nat = c % d;  // 3
const rem4: nat = a % d;  // 3
```

For cases when you need both the quotient and the remainder, LIGO provides the ediv operation. _ediv x y_ returns _Some (quotient, remainder)_, unless _y_ is zero, in which case it returns _None_

```
const a: int = 37;
const b: int = 5;
const ediv1 : option<[int , nat]> = ediv(a, b);  // Some (7, 2)
const c: nat = 37n;
const ediv2: option<[int , nat]> = ediv(c, b);  // Some (7, 2)
const d: nat = 5n;
const ediv3: option<[nat , nat]> = ediv(c, d);  // Some (7, 2)
const ediv4: option<[int , nat]> = ediv(a, d);  // Some (7, 2)
```

## Checking a nat

You can check if a value is a nat by using a predefined cast function which accepts an int and returns an optional nat: if the result is not None, then the provided integer was indeed a natural number, and not otherwise.

```
const is_a_nat: option<nat> = Michelson.is_nat(1);
```

## Your mission

<!-- prettier-ignore -->1- In the editor, define *required\_energy* for 1.21 gigawatts. Since Tezos doesn't support floating-point numbers, let's work in megawatts instead so that you can write the amount of energy as an _int_.

<!-- prettier-ignore -->2- Define *energy\_per\_battery\_pack* for 0.16 gigawatts.

<!-- prettier-ignore -->3- Define and compute *required\_battery\_packs* as the number of battery packs required to power your ship. Remember that floating-point numbers are truncated to an integer, e.g. 10 / 3 = 3 in LIGO and not 3.33333333....
