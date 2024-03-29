# Chapter 16 : Built-ins

<dialog character="scientist">We need a Flux Capacitor, don't ask me why, you wouldn't get it. Just buy it!</dialog>

A LIGO smart contract can query part of the state of the Tezos blockchain by means of built-in values. In this section, you will find how those built-ins can be utilized.

## A few built-ins

<!-- prettier-ignore -->*Tezos.get\_balance*: Get the balance for the contract.

<!-- prettier-ignore -->*Tezos.get\_amount*: Get the amount of tez provided by the sender to complete this transaction.

<!-- prettier-ignore -->*Tezos.get\_sender*: Get the address that initiated the current transaction.

<!-- prettier-ignore -->*Tezos.self\_address*: Get the address of the currently running contract.

<!-- prettier-ignore -->*Tezos.get\_source*: Get the originator (address) of the current transaction. That is, if a chain of transactions led to the current execution, get the address that began the chain. Not to be confused with Tezos.get_sender, which gives the address of the contract or user which directly caused the current transaction.

<!-- prettier-ignore -->*Tezos.get\_chain\_id*: Get the identifier of the chain to distinguish between main and test chains.

ℹ️ A more complete list is available on <a href="https://ligolang.org/docs/reference/current-reference" target="_blank">ligolang.org</a>

## Failwith

The keyword _failwith_ throws an exception and stops the execution of the smart contract.

```
failwith(<string_message>)
```

_<string_message>_ must be a string value.

## Access Control

This example demonstrates how Tezos.get_source can be used to deny access to an entrypoint.

```
const owner: address = "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" as address;
type storage = unit;
type parameter = unit;
type return_ = [list <operation>, storage];

@entry
const main = (action: parameter, store: storage) : return_ => {
    if (Tezos.get_source() != owner) {
        return failwith ("Access denied.");
    } else {
        return [(list([]) as list<operation>), store];
    };
};
```

<!-- prettier-ignore -->⚠️ If you have installed LIGO, then you can simulate the call to the smart contract by running the following command. Notice that the source caller can be specified with the *\-\-source* option:

```
ligo run dry-run exercise.jsligo --source "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx" -e main 'unit' 'unit'
```


## Your mission

<!-- prettier-ignore -->1- Check that the originitor address is indeed our *ship\_address*, or fail with _"Access denied"_.

<!-- prettier-ignore -->2- Check that the sent amount corresponds to the *purchase\_price*, or fail with _"Incorrect amount"_.
