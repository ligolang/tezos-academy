# Chapter 2 : Types

<dialog character="mechanics">Welcome onboard, Captain. I'm the ship's mechanic. The first thing we need to do before departing is to define your ship's parameters. Go ahead!</dialog>

LIGO is a strongly and statically typed language. This means that the compiler checks how your contract processes data. If it passes the test, your contract will not fail at run-time due to inconsistent assumptions on your data. This is called type checking.

## Built-in types

LIGO comes with all basic types built-in, such as _string_, _int_, or _tez_ for account balance or monetary transactions. You can find all built-in types on <a href="https://gitlab.com/ligolang/ligo/-/blob/dev/src/environment/environment.ml" target="_blank">the LIGO gitlab</a>.

## Type aliases

Type aliasing consists of renaming a given type when the context calls for a more precise name. This increases the readability and maintainability of your smart contracts. For example, we can choose to alias a string type as an animal breed - this will allow us to communicate our intent with added clarity.

```
type breed = string;
const dog_breed: breed = "Saluki";
```

## Simple types

The type `account_balances` denotes a map from addresses to tez.

```
type account_balances = map<address, tez>;

const ledger: account_balances = Map.literal( list([
    ["tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" as address, 10 as mutez]
]));
```

ℹ️  We will look more deeply into the _map_ construct in the following chapters.

## Structured types

Often, contracts require complex data structures that, in turn, require well-typed storage or functions to work with. LIGO offers a simple way to compose simple types into structured types.
The first of those structured types is the record, which aggregates types as fields and indexes them with a field name. In the example below, we define an account type which keeps the balance and number of previous transactions for a given account.

```
type account = address;
type number_of_transactions = nat;

type account_data = {
  balance: tez,
  transactions: number_of_transactions
};

const my_account : account = {
  balance: 10 as mutez,
  transactions: 5 as nat,
};
```

ℹ️  We will look more deeply into the _record_ construct in the following chapters.

## Your mission

<!-- prettier-ignore -->1- In the online editor in the top right corner of this page, define *ship\_code* as a string type.

<!-- prettier-ignore -->2- Then define the constant *my\_ship* as a *ship\_code* of value _"020433"_.

<!-- prettier-ignore -->3- Proceed to validate your mission for a comparative view with the solution.
