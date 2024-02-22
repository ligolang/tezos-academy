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

Let's see an implementation in JsLIGO of a fungible token (FA1.2)

⚠️ Note that the this is simplified implementation of the contract for learning purpuses transpiled from the ReasonLIGO version. Production ready contract may contain more logic of handling edge cases, etc.

```
// This is an implimentation of the FA1.2 specification in JsLIGO

type tokens = big_map<address, nat>;
type allowances = big_map<[address, address], nat>;
type storage =
// @layout:comb
{
  tokens       : tokens,
  allowances   : allowances,
  total_amount : nat,
};

type transfer =
// @layout:comb
{
    address_from : address,
    address_to   : address,
    value        : nat,
};

type approve =
// @layout:comb
{
    spender : address,
    value   : nat,
};

type getAllowance =
// @layout:comb
{
    owner    : address,
    spender  : address,
    callback : contract<nat>
};

type getBalance =
// @layout:comb
{
    owner    : address,
    callback : contract<nat>,
};

type getTotalSupply =
// @layout:comb
{
    callback : contract<nat>,
};

type return_ = [list<operation>, storage];

type action =
|    ["Transfer", transfer]
|    ["Approve", approve]
|    ["GetAllowance", getAllowance]
|    ["GetBalance", getBalance]
|    ["GetTotalSupply", getTotalSupply];

const transfer = (p: transfer, s: storage) : return_ => {
    const new_allowances = (() : allowances => {
        if (Tezos.get_sender() == p.address_from) {
            return s.allowances;
        } else {
            const authorized_value = match(Big_map.find_opt(
                [Tezos.get_sender(), p.address_from], s.allowances)) {
                    when(Some(value)): value;
                    when(None): 0n
                }
            if (authorized_value < p.value) {
                failwith("Not Enough Allowance");
            } else {
                return Big_map.update(
                    [Tezos.get_sender(), p.address_from],
                    Some(abs(authorized_value - p.value)),
                    s.allowances
               );
            }
        }
    })();
    const sender_balance = match(Big_map.find_opt(p.address_from, s.tokens)) {
        when(Some(value)): value;
        when(None): 0n
    };
    if (sender_balance < p.value) {
        failwith("Not Enough Balance") as return_;
    } else {
        let new_tokens = Big_map.update(p.address_from, Some(abs(sender_balance - p.value)), s.tokens);
        const receiver_balance = match(Big_map.find_opt(p.address_to, s.tokens)) {
            when(Some(value)): value;
            when(None): 0n
        };
        new_tokens = Big_map.update(p.address_to, Some(receiver_balance + p.value), new_tokens);
        return [
            list([]) as list<operation>,
            {...s, tokens: new_tokens, allowances: new_allowances}
        ];
    };
};

const approve = (p: approve, s: storage) : return_ => {
    let previous_value = match(Big_map.find_opt([p.spender, Tezos.get_sender()], s.allowances)) {
        when(Some(value)): value;
        when(None): 0n
    };
    if (previous_value > (0 as nat) && p.value > (0 as nat)) {
        failwith("Unsafe Allowance Change") as return_;
    } else {
        const new_allowances = Big_map.update([p.spender, Tezos.get_sender()], Some(p.value), s.allowances);
        return [list([]) as list<operation>, { ...s, allowances: new_allowances}];
    };
};

const getAllowance = (p: getAllowance,s: storage) : return_ => {
    const value = match(Big_map.find_opt([p.owner, p.spender], s.allowances)) {
        when(Some(value)): value;
        when(None): 0n
    };
    const op = Tezos.transaction(value, 0 as mutez, p.callback);
    return [list([op]) as list<operation>, s];
};

const getBalance = (p: getBalance, s: storage) : return_ => {
    const value = match(Big_map.find_opt(p.owner, s.tokens)) {
        when(Some(value)): value;
        when(None): 0n
    };
    const op = Tezos.transaction(value, 0 as mutez, p.callback);
    return [list([op]) as list<operation>, s];
};

const getTotalSupply = (p: getTotalSupply, s: storage) : return_ => {
    const total = s.total_amount;
    const op = Tezos.transaction(total, 0 as mutez, p.callback);
    return [list([op]) as list<operation>, s];
};

const main = (a: action, s: storage) : return_ => match(a) {
    when(Transfer(p)): transfer(p, s);
    when(Approve(p)): approve(p, s);
    when(GetAllowance(p)): getAllowance(p, s);
    when(GetBalance(p)): getBalance(p, s);
    when(GetTotalSupply(p)): getTotalSupply(p, s)
};
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
