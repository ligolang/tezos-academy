# Chapter 21 : Lazy interaction

<dialog character="pilot">The enemy is destroyed, great job Captain! Headquater is sending a reinforcement squadron to help us.</dialog>

When sending transactions between contracts, each contract must know the target contract interface and the parameter type of the target contract. This is done basically by separating type definition and function implementation and by using code inclusion.

However, a problem arises when creating a new contract that must communicate both way (two-way communication) with an already deployed contract. The deployed contract cannot know the signature of a contract not yet been created!

<!-- prettier-ignore -->Fortunately, a solution exists to this problem of polymorphism: the *Tezos.get\_entrypoint\_opt* function.

## Two-Way communication between contracts

Let's consider two contracts, _A_ and _B_. Contract _A_ requests information from contract _B_, and they communicate with each other through transactions.
_A_ sends a request to _B_, meanings _A_ calls an entry point of _B_, so contract _A_ includes type definition of _B_.
_B_ receives the request, processes it, and sends a response back to _A_, meaning _B_ calls an entry point of _A_, so contract _B_ includes type definition of _A_.
Once they are deployed, we cannot change their _includes_.

Now let's consider a third smart contract, _C_ which will communicate with _B_. (similar to _A_).
Since we can't change _B_ (already deployed), then _C_ must have the same definition as _A_ to be able to receive transactions from _B_.

The problem arises from the fact that _B_ must know the entire definition of _A_ parameters, but it actually only needs one entry point used for the transaction. If _C_ implements the same entry point as _A_ (for receiving a message from _B_), then the transaction will match the entry point and solve our problem!

## Retrieving entry points

<!-- prettier-ignore -->For this purpose, the predefined function *Tezos.get\_entrypoint\_opt* can be used to retrieve the definition of a single entry point.

<!-- prettier-ignore -->The predefined function *Tezos.get\_entrypoint\_opt* can be used in place of the *Tezos.get\_contract\_opt* function to retrieve contract interface, but for only one entry point. It takes the requested entry point as a parameter (with a special Michelson syntax) and the address of the contract.

<!-- prettier-ignore -->The predefined function *Tezos.get\_entrypoint\_opt* has the following syntax:

```
const variable_name: option<contract<type_of_target_contract_parameter>> = Tezos.get_entrypoint_opt(entrypoint_name, target_contract_address);
```

<!-- prettier-ignore -->When the function *get\_entrypoint\_opt* does not find any contract at a given _address_, or the contract doesn't match the type, then _None_ is returned.

<!-- prettier-ignore -->As for the *Tezos.get\_contract\_opt* function, the *Tezos.get\_entrypoint\_opt* function returns an _option_ type.

## Entry point naming convention

<!-- prettier-ignore -->An entry point name is a double-quoted string where the first character is _%_ followed by the name of the entry point (and its first letter must not be capitalized), e.g., for an entry point *FooBar*, the corresponding entry point name is *%fooBar*.

Entry point names are written in the form of: _%myEntryPoint_ for the entry point _MyEntryPoint_.

## Your mission

Consider the following smart contracts: Squadron and Central (Exercise).

The Central contract acts as an inventory of ships (an entry point _RegisterShip_ is provided to register a ship).
The Central contract can provide information about a ship to a calling contract via a callback transaction (an entry point _RetrieveShip_ is provided to query a ship).
The Squadron contract provides an entry point _ModuleRequest_ to ask for ship information to the central contract.
The Squadron contract provides an entry point _ModuleResponse_, which is called by the central contract when sending back the expected ship information.

As you can see, the entry point _RetrieveShip_ calls the function _sendTx_, which is responsible for sending the requested ship information to the caller (by sending a transaction to the calling contract). The implementation of the Central contract has not been finished. We need you to finish the _sendTx_ function!

<!-- prettier-ignore -->⚠️ Notice that there are multiple tabs for displaying Squadron and Central smart contracts. Your goal is to complete the Central contract displayed in the "Exercise" tab.

<!-- prettier-ignore -->1- First, we want to call the _moduleResponse_ entrypoint of the Squadron, but we need to ensure that the *callbackAddress* is a Squadron contract and has the expected entrypoint. Try to retrieve the entry point %moduleResponse of the given *callbackAddress* and store the result in a variable called *contractInterfaceOpt* of type _option<contract<actionSquadron>>_.
<!-- prettier-ignore -->⚠️Remember that the entry point must be in quotations.
<!-- prettier-ignore -->⚠️Remember that the _option_ type means that maybe there is a value.
<!-- prettier-ignore -->⚠️Remember that _contract<actionSquadron>_ represents entrypoints following the _actionSquadron_ format.
<!-- prettier-ignore -->⚠️So the type _option<contract<actionSquadron>>_ stands for "Maybe there are entrypoints which follow the _actionSquadron_ format".

<!-- prettier-ignore -->2- Use a _match_ operator to extract the entry point from *contractInterfaceOpt* if it exists (use temporary variable name *ci* in the case). Otherwise, throw an exception with the error message "Entrypoint not found in contract Squadron" (and don't forget to cast the exception in the right type). The extracted entry point must be stored in a variable called *contractInterface*.

<!-- prettier-ignore -->3- In order to prepare the ship information that needs to be sent back to the Squadron contract, prepare a variable called *ee* of type _actionModuleResponse_ containing the expected ship *e*.
<!-- prettier-ignore -->⚠️ Notice that in Squadron smart contract, the entry point _ModuleResponse_ expects a type _actionModuleResponse_. So when Central smart contract sends back the requested ship information, it must respect the expected format (in our case, it is a _actionModuleResponse_ containing a _ship_ record).

<!-- prettier-ignore -->4- Send a transaction to the retrieved entry point of the Squadron contract. The transaction must point to the _moduleResponse_ entrypoint of Squadron contract and pass the right argument prepared in step 3. This transaction sends no money. The transaction is of type _operation_, which you can store in a variable *sendbackOperation*.
