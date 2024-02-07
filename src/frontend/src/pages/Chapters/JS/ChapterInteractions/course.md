# Chapter 20 : Interactions

<light />

<dialog character="alien">Red alert! The humans are here! Battle stations! Surrender, dirty humans, or die! We are the master of this universe, and we will easily destroy you! Hahahaha!</dialog>

A contract can invoke another by emiting a transaction operation at the end of an entrypoint.

## Transactions

We have already seen _Tezos.transaction_ in chapter 17 in order to send money to an address. It is also possible to use _Tezos.transaction_ to call an entrypoint from another contract. In that case, we store the transaction in a type _operation_, which is a predefined type representing a contract invocation.

```
const <operation_name> : operation = Tezos.transaction (<parameter>, <mutez>, <contract>);
```

where :

- _parameter_ is the entrypoint to call on the target contract,
- _mutez_ is the amount to transfer,
- _contract_ is the contract we want to interact with.

To get the contract we want to call and its entrypoints, we can use:

```
Tezos.get_contract_opt(<address>)
```

The function takes an address and returns an optional _contract_ (remember to use _option_). When no contract is found or the contract doesn't match the type, _None_ is returned.

## Example

The following example shows how a contract can invoke another by emiting a transaction operation at the end of an entrypoint.
In our case, we have a _counter.ligo_ contract that accepts an action of type _parameter_, and we have a _proxy.ligo_ contract that accepts the same parameter type and forwards the call to the deployed counter contract.

```
// counter.ligo

type storage = int;

type parameter =
  ["Increment", int]
| ["Decrement", int]
| ["Reset"];

type return_ = [list<operation>, storage];

@entry
const main = (action: parameter, store: storage) : return_ => {
 return [
   (list([]) as list <operation>),
   (match (action) {
    when(Increment(n)): store + n;
    when(Decrement(n)): store - n;
    when(Reset):  0
    })
  ]
};
```

```
// proxy.ligo

type storage = unit;

type parameter =
  ["Increment", nat]
| ["Decrement", nat]
| ["Reset"];

type return_ = [list<operation>, storage];

const dest: address = "KT19wgxcuXG9VH4Af5Tpm1vqEKdaMFpznXT3" as address; // Deployment address of counter.ligo

const proxy = (action: parameter, store: storage) : return_ => {
  const counter: contract<parameter> =
    match(Tezos.get_contract_opt(dest) as option<contract<parameter>>) {
      when(Some(contract)): contract;
      when(None): failwith ("Contract not found.") as contract<parameter>
    };
  const op: operation = Tezos.transaction(action, 0 as tez, counter); // E.g. with action = Increment (5 as nat)
  const operations: list<operation> = list([op]);

  return [
      operations,
      store
  ];
};
```

Notice that :

- the _proxy_ function has the specific prototype of a Main function.
- the _proxy_ function returns a list of operations containing the newly created transaction.
- the _parameter_ type (counter parameter) has also been defined in proxy contract. The calling contract must know the parameter type of the called contract.

## Your mission

<!-- prettier-ignore -->1- Consider each of our weapons is managed by a smart contract:

```
// weapon.ligo
type storage = int;

type parameter =
  ["Fire", int]
| ["Stop"];

type return_ = [list<operation>, storage];

@entry
const main = (action: parameter, _store: storage) : return_ => {
  return [
    (list([]) as list <operation>),
    (match (action) {
     when(Fire(n)): n;
     when(Stop): 0
   })]
};
```

<!-- prettier-ignore -->⚠️ Notice that the weapon smart contract provides two entrypoints: Fire and Stop.

<!-- prettier-ignore -->2- Consider the contract in the editor, which is responsible to control the left and right weapons.
<!-- prettier-ignore -->⚠️ Notice the addresses of each weapon, and that the _orders_ function fetches the corresponding contracts. (Variables *right\_laser* and *left\_laser* can be used as the target of a transaction).

Your job is now to define the list of transactions sent to the weapon contracts. For this, start by creating _operations_ a list of type _operation_.

<!-- prettier-ignore -->⚠️ Notice that _operations_ must be filled with transactions and is returned by the function _orders_.

<!-- prettier-ignore -->3- Send a _Fire(5)_ transaction to the *right\_laser* contract, then _Stop_. Send a _Fire(5)_ transaction to the *left\_laser* contract, then _Stop_.
