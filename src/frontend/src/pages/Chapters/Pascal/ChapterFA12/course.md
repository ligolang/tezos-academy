# Chapter 27 : Fungible token with Financial Asset 1.2 standard

<dialog character="mechanics">Captain, we received the bill for reparing the ship after the last battle: 1,000,000 TAT. I have no idea what TAT is or its convertion rate to Tez, that's likely an alien currency, you should probably find out!</dialog>

## Definition

A Financial Asset represents a non-physical asset whose value is derived from a contractual claim, such as bank deposits, bonds, or stocks. Financial assets are usually more liquid than other tangible assets, such as commodities or real estate, and may be traded on financial markets.

Financial assets are opposed to non-financial assets, such as property rights which include both tangible properties (sometimes also called real assets) such as land, real estate or commodities and intangible assets such as intellectual property like copyrights, patents, Trademarks, etc.

## Fungible and non-fungible tokens

A _token_ or _crypto-currency_ is a numerical asset emitted on a blockchain.

Fungible means divisible.

A Fungible token is a Financial Asset where the account balance represents the value associated to an _address_. This value can be splitted into smaller parts which can be transferred to another account.

A Non-fungible token (NFT) is a Financial Asset whose balance cannot be splitted into smaller parts. Crypto-kitties is an example of a game using non fungible tokens (on the Ethereum blockchain). For example, a video game avatar (such as avatar on world of warcraft) is a character having some skills/attributes (strength, dexterity,...) and one may want to sell his avatar, but cannot sell the strength property of his avatar separately. It makes sense to keep the whole avatar into a undivisible set of attributes.

## Standard

A standard is a set of rules commonly accepted by the community.
The rules of Financial Asset describe how to create currencies (and transfer those between accounts, etc).

Depending on the usage of the currency, many sets of rules have been commonly accepted :

- Financial Asset 1.2 (FA1.2) is a set of rules for fungible tokens.
- Financial Asset 2.0 (FA2) is a set of rules for fungible and non fungible tokens.

For example, the creation of a crypto-currency is equivalent to creating a contract which supports the FA1.2 standard.
All smart contracts supporting the FA1.2 standard can interact with accounts and other contracts by transfering coins of our crypto-currency.

Similarily for Ethereum, fungible token rules have been specified on an Ethereum forum blog (Ethereum Request Comment), the 20th answer was describing a good rule set and the ERC20 became the name for this standard (rule set).
ERC721 is the standard rule set for non-fungible tokens.

## FA1.2 (Implementation of standard)

This Fungible token standard provides basic functionality to transfer tokens, as well as allowing tokens to be approved so they can be spent by another on-chain third party.

Possible actions :
_Approve_ - Sender can specify an amount of token that can be spent by someone else (from his account)
_Transfer_ - Transfer an amount of tokens from an account to another account (or third-party on-chain smart contract)
_GetAllowance_ - Return the amount that can be spent by someone from sender's account
_GetBalance_ - Return the sender's account balance
_GetTotalSupply_ - Returns the number total of token

Let's see an implementation in PascalLigo of a fungible token (FA1.2)

```
// This is an implementation of the FA1.2 specification in PascaLIGO

type amt is nat;

type account is record [
    balance : amt;
    allowances: map(address, amt);
]

type action is
| Transfer of (address * address * amt)
| Approve of (address * amt)
| GetAllowance of (address * address * contract(amt))
| GetBalance of (address * contract(amt))
| GetTotalSupply of (unit * contract(amt))

type contract_storage is record [
  totalSupply: amt;
  ledger: big_map(address, account);
]

function isAllowed (const src : address ; const value : amt ; var s : contract_storage) : bool is {
  var allowed: bool := True;
  if Tezos.get_sender() =/= src then {
    const account : account = Option.unopt(s.ledger[src]);
    const allowanceAmount: amt = Option.unopt(account.allowances[Tezos.get_sender()]);
    allowed := allowanceAmount >= value;
  } else allowed := True;
} with allowed

// Transfer a specific amount of tokens from the accountFrom address to a destination address
// Pre conditions:
//  The sender address is the account owner or is allowed to spend x in the name of accountFrom
//  The accountFrom account has a balance higher than amount
// Post conditions:
//  The balance of accountFrom is decreased by amount
//  The balance of destination is increased by amount
function transfer (const accountFrom : address ; const destination : address ; const value : amt ; var s : contract_storage) : contract_storage is {
  // If accountFrom = destination transfer is not necessary
  if accountFrom =/= destination then {
    // Is sender allowed to spend value in the name of source
    if not isAllowed(accountFrom, value, s) then failwith ("Sender not allowed to spend token from source");

    // Fetch src account
    var src: account := Option.unopt(s.ledger[accountFrom]);

    // Check that the source can spend that much
    if value > src.balance then failwith ("Source balance is too low");

    // Update the source balance
    // Using the abs function to convert int to nat
    src.balance := abs(src.balance - value);

    s.ledger[accountFrom] := src;

    // Fetch dst account or add empty dst account to ledger
    var dst: account := record [
        balance = 0n;
        allowances = (map []: map(address, amt));
    ];
    case s.ledger[destination] of [
      | None -> skip
      | Some(n) -> dst := n
    ];

    // Update the destination balance
    dst.balance := dst.balance + value;

    // Decrease the allowance amount if necessary
    if accountFrom =/= Tezos.get_sender() then {
        const allowanceAmount: amt = Option.unopt(src.allowances[Tezos.get_sender()]);
        if allowanceAmount - value < 0 then failwith ("Allowance amount cannot be negative")
        else src.allowances[Tezos.get_sender()] := abs(allowanceAmount - value);
    };

    s.ledger[destination] := dst;
  }
} with s

// Approve an amount to be spent by another address in the name of the sender
// Pre conditions:
//  The spender account is not the sender account
// Post conditions:
//  The allowance of spender in the name of sender is value
function approve (const spender : address ; const value : amt ; var s : contract_storage) : contract_storage is {
  if Tezos.get_sender() =/= spender then {
    var src: account := Option.unopt(s.ledger[Tezos.get_sender()]);
    src.allowances[spender] := value;
    s.ledger[Tezos.get_sender()] := src; // Not sure if this last step is necessary
  }
} with s

// View function that forwards the allowance amount of spender in the name of tokenOwner to a contract
// Pre conditions:
//  None
// Post conditions:
//  The state is unchanged
function getAllowance (const owner : address ; const spender : address ; const contr : contract(amt) ; var s : contract_storage) : list(operation) is {
  const src: account = Option.unopt(s.ledger[owner]);
  const destAllowance: amt = Option.unopt(src.allowances[spender]);
} with list [Tezos.transaction(destAllowance, 0tz, contr)]

// View function that forwards the balance of source to a contract
// Pre conditions:
//  None
// Post conditions:
//  The state is unchanged
function getBalance (const src : address ; const contr : contract(amt) ; var s : contract_storage) : list(operation) is {
  const src: account = Option.unopt(s.ledger[src]);
} with list [Tezos.transaction(src.balance, 0tz, contr)]

// View function that forwards the totalSupply to a contract
// Pre conditions:
//  None
// Post conditions:
//  The state is unchanged
function getTotalSupply (const contr : contract(amt) ; var s : contract_storage) : list(operation) is
  list [Tezos.transaction(s.totalSupply, 0tz, contr)]

function main (const p : action ; const s : contract_storage) :
  (list(operation) * contract_storage) is {
   // Reject any transaction that try to transfer token to this contract
   if Tezos.get_amount() =/= 0tz then failwith ("This contract do not accept token");
  } with case p of [
    | Transfer(n) -> ((nil : list(operation)), transfer(n.0, n.1, n.2, s))
    | Approve(n) -> ((nil : list(operation)), approve(n.0, n.1, s))
    | GetAllowance(n) -> (getAllowance(n.0, n.1, n.2, s), s)
    | GetBalance(n) -> (getBalance(n.0, n.1, s), s)
    | GetTotalSupply(n) -> (getTotalSupply(n.1, s), s)
  ]
```

## Your mission

Let's assume _TezosAcamedyToken_ has been deployed.

Consider your account is _me_ (at address tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6) which has been granted 1,000,000 token.
Consider alice's account (at address tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb)

<!-- prettier-ignore -->1- We want you to simulate the transfer of 2 TAT (Tezos Academy Token) to *alice*. Complete the ligo command line for preparing a storage state where you (tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6) possess 1,000,000 tokens and no allowance. Write the storage state (all values of the storage must be filled).

<!-- prettier-ignore -->2- Write a ligo command line for preparing the invocation of an *Approval* of 2 TAT (Tezos Academy Token) for *alice*.

<!-- prettier-ignore -->3- Write a ligo command line that simulates your invocation of previous *Approval* on storage prepared at step 1. (Don't forget to specify that you are sending this transaction).

<!-- prettier-ignore -->4- Now that the ligo compiler ensured us that the simulation is good, we will try to simulate it with the tezos-client command line in order to know the right amount of gas needed to execute *approval*. You can consider that step 2 produced the following Michelson expression:

```
(Left (Left (Left (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" 2))))
```

<!-- prettier-ignore -->5- Write a Tezos command line that simulates your invocation.

<!-- prettier-ignore -->6- Now that the approval has been executed on the blockchain, 2 TAT can be transferred from your address to *alice*'s. Write a ligo command line for preparing the invocation of a *Transfer* of 2 TAT (Tezos Academy Token) from you to *alice*.

<!-- prettier-ignore -->7- Write a ligo command line for preparing a simulated storage where you (tz1SdT62G8tQp9fdHh4f2m4VtL8aGG6NUcmJ) possess 1,000,000 tokens and an allowance is initialized with 2 TAT that can be transferred from *me* to *alice* (tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb).

<!-- prettier-ignore -->8- Write a ligo command line that simulates your invocation of the previous *Transfer* on storage prepared at step 7. (Don't forget to specify that you are sending this transaction).

<!-- prettier-ignore -->9- Now that the ligo compiler ensured us that the simulation is good, we will try to simulate it with the tezos-client command line in order to know the right amount of gas needed to run execute *transfer*. You can consider that step 6 produces the following Michelson expression:

```
(Right (Pair (Pair "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6" "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb") 2))
```

<!-- prettier-ignore -->10- Write a Tezos command line that simulates your *Transfer* invocation.

<!-- prettier-ignore -->Remind the syntax of the tezos-client transfer command:

```
tezos-client transfer <tx_amount> from <tx_user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
```

<!-- prettier-ignore --><tx\_amount> = number of mutez of the transaction
<!-- prettier-ignore --><tx\_user> = account who is emitting the transaction
<!-- prettier-ignore --><contract_name> = name of the contract
<!-- prettier-ignore --><entrypoint_invocation> = michelson expression representing the entrypoint and its related parameters
