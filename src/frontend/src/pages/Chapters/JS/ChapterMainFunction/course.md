# Chapter 13 : Main function

<dialog character="admiral">God damn it, rookie! What are you still doing at the space port? Take off already and go shoot some alien!!</dialog>

Smart contracts are small programs stored and executed on the blockchain. They enable people to cooperate and exchange tokens without needing to trust one another.

A LIGO contract consists of a series of constant and function declarations. Only functions with a special type can be called when the contract is activated; we call them main functions. A main function takes two parameters: the contract parameter and the on-chain storage, and returns a pair consisting of a list of operations and the (new) storage.

When the contract is originated, the initial value of the storage is provided. When a main function is later called, only the parameter is provided, but the type of a main function contains both.

The type of the contract parameter and the storage are determined by the contract designer, but the type for list operations is not. The return type of a main function follows this structure, assuming that the type storage has been defined elsewhere. (Note that you can use any type with any name for the storage.)

```
type storage = ...;  // Any name, any type
type return_ = [list<operation>, storage];
```

The contract storage can only be modified by activating a main function: given the state of the storage on-chain, a main function specifies how to create another state for it, depending on the contract's parameter.

Here is an example where the storage is a single natural number that is updated by the parameter.

```
type parameter = nat;
type storage = nat;
type return_ = [list<operation>, storage];

const save =(action: parameter, store: storage) : return_ =>
  [(list([]) as list<operation>), store]
```

## Entrypoints

In LIGO, the design pattern involves having one main function called main, which dispatches the control flow according to its parameter. Functions called for these actions are termed entrypoints. When declaring entrypoints using the @entry annotation, LIGO automatically generates a main function, but it used to be possible to write such a function by hand instead of using the @entry facility.

This feature is now deprecated, future versions of LIGO will not allow the declaration of a single main function.

While it is still possible to define a single function called main and mark it as the sole entry point using @entry, this is not what most programs should do. The following paragraphs are intended for programs which need more fine control over the behaviour of the entire program than what is possible using the automatic @entry mechanism.

As an analogy, in the C programming language, the main function is the unique main function, and any function called from it would be an entrypoint.

The parameter of the contract is then a variant type, and depending on the constructors of that type, different functions in the contract are called. In other terms, the unique main function dispatches the control flow depending on a pattern matching on the contract parameter.

In the following example, the storage contains a counter of type nat and a name of type string. Depending on the parameter of the contract, either the counter or the name is updated.

```
export type parameter =
| ["Action_A", string]
| ["Action_B", string];

export type storage = {
  stored_string_A: string,
  stored_string_B: string
};

type return_ = [list<operation>, storage];

const entry_A = (input_string: string, store: storage): return_ =>
  [(list([]) as list<operation>), {...store, stored_string_A: input_string}];

const entry_B = (input_string: string, store: storage): return_ =>
  [(list([]) as list<operation>), {...store, stored_string_B: input_string}];

@entry
const main = (action: parameter, store: storage): return_ =>
  match(action) {
    when(Action_A(input_string)): entry_A(input_string, store);
    when(Action_B(input_string)): entry_B(input_string, store)
  };
```

ℹ️ Now that you created a main function, you can now transpile your code into Michelson and deploy it on Tezos. Try it out on the <a href="https://ide.ligolang.org/" target="_blank">LIGOlang IDE</a>

## Your mission

<!-- prettier-ignore -->1- The editor contains an example of a main function with two functions. In the parameter variant, replace *Action\_A* and *Action\_B* with our actions *Set\_ship\_code* and *Go\_to*.

<!-- prettier-ignore -->2- In the storage record, replace *stored\_string\_A* and *stored\_string\_B* with the strings we want to store in the contract: *ship\_code* and *destination*.

<!-- prettier-ignore -->3- Modify the name of our entrypoints *entry\_A* and *entry\_B* to *set\_ship\_code* and *go\_to*.

<!-- prettier-ignore -->4- Modify the main function to reflect the new names above.
