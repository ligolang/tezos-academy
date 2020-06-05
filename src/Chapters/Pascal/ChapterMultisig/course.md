# Chapter 25 : Multi-signature pattern

<dialog character="mechanics">Captain, we should warm up the weapons while we are still in FTL, we don't know what awaits us on the other side.</dialog>
Before any nuke strike, the admiral and the president of Galatic Union must agree on nuclear usage. We need the approval of both for nuclear weapons usage.  

  
In some case one may want to execute an action only if many users approve this action. This kind of pattern is called _multi-signature_. 

## Multi-signature

When invoking a smart contract, an entrypoint is called and usually an action is executed (triggering a storage modification and/or transactions emmission).
The purpose of a multi-signature pattern is to execute an action when all preconditions has been verified. The action that need to be executed depends on the smart contract logic. 
The mutli-signature implementation can be done in a single contract with the smart contract logic or in a separated contract like a proxy contract (which emits transactions to the contract containg the logic).

### rules

The multi-signature pattern can be described with this set of rules :

* a user can propose an action
* a user can approve an action (proposed by someone else)
* a user can cancel his approval on an action.
* an action is automatically executed when it has been approved by enough users (a threshold of number of approvals must be defined)
* the smart contract must also handle a list of user allowed to approve an action

optionnaly

* the smart contract can also handle the number of approval per user and set maximum number of approvals.
* the smart contract can also handle an inner state. Everytime an action is executed the inner state of the multi-signature contract is updated for tracability purpose

More complex rules can be added these basic ones.


### Implementation of multisig

Let's consider this implementation of the multi-signature pattern. This implementation takes all previously rules into account.
The smart contract *MultisigProxy* accepts a proposed message (parameter typed _string_)), when number of approvals is reached the string is used to generate transaction to an other contract *Counter*. 
This smart contract *MultisigProxy* intends to play the role of a proxy pattern for *Counter* contract. 
The *Counter* contract (the exemple at https://ide.ligolang.org/p/-hNqhvMFDFdsTULXq4K-KQ) has been deployed at address : KT1CFBbdhRCNAzNkX56v361XZToHCAtjSsVS

```
// Counter contract types
type action is
| Increment of int
| Decrement of int 

// MulitsigProxy storage type
type addr_set is set (address)
type message_store is map (bytes, addr_set)
type proposal_counters is map (address, nat)

type storage is
  record [
    target_contract      : address;
    state_hash           : bytes;
    threshold            : nat;
    max_proposal         : nat;
    max_message_size     : nat;
    authorized_addresses : addr_set;
    message_store        : message_store;
    proposal_counters    : proposal_counters
  ]

// MulitsigProxy I/O types
type message is string
type return is list (operation) * storage

//MulitsigProxy parameter
type parameter is
  Send     of message
| Withdraw of message
| Default  of unit

(* Function executed when {threshold} approvals has been reached  *)
function execute_action(const str : string; const s : storage ) : list(operation) is block {
  var listop : list(operation) := list [];
  if (String.sub(1n,1n,str) = "3") then block {
    const ci_opt : option(contract(action)) = Tezos.get_contract_opt(s.target_contract);
    const op : operation = case ci_opt of
      Some(ci) -> Tezos.transaction(Increment(3), 0tz, ci)
    | None -> (failwith("contract not found") : operation)
    end;
    listop := list [op; ];
  }
  else skip
} with listop

function send (const param : message; const s : storage) : return is
  block {
    // check sender against the authorized addresses
    if not Set.mem (Tezos.sender, s.authorized_addresses)
    then failwith("Unauthorized address")
    else skip;

    // check message size against the stored limit
    var msg : message := param;
    const packed_msg : bytes = Bytes.pack (msg);
    if Bytes.length (packed_msg) > s.max_message_size
    then failwith ("Message size exceed maximum limit")
    else skip;

    (* compute the new set of addresses associated with the message and update counters *)
    var new_store : addr_set := set [];
    const voters_opt : option(addr_set) = Map.find_opt (packed_msg, s.message_store);
    case voters_opt of
      Some (voters) ->
        block {
          (* The message is already stored. Increment the counter only if the sender is not already associated with the message. *)
          if Set.mem (Tezos.sender, voters)
          then skip
          else s.proposal_counters[Tezos.sender] :=
                 get_force (Tezos.sender, s.proposal_counters) + 1n;
                 new_store := Set.add (Tezos.sender,voters)
        }
    | None ->
        block {
          // the message has never been received before
          s.proposal_counters := case Map.find_opt (Tezos.sender, s.proposal_counters) of
            Some(count) -> Map.update(Tezos.sender, Some(count + 1n), s.proposal_counters)
          | None -> Map.add(Tezos.sender, 1n, s.proposal_counters)
          end;
          new_store := set [Tezos.sender];
        }
    end;

    // check sender counters against the maximum number of proposal
    var sender_proposal_counter : nat := get_force (Tezos.sender, s.proposal_counters);
    if sender_proposal_counter > s.max_proposal
    then failwith ("Maximum number of proposal reached")
    else skip;

    // check the threshold
    var ret_ops : list (operation) := nil;
    if Set.cardinal (new_store) >= s.threshold then {
      remove packed_msg from map s.message_store;
      // trigger action execution
      ret_ops := execute_action(msg, s);
      // update the state hash
      s.state_hash := Crypto.sha256 (Bytes.concat (s.state_hash, packed_msg));
      // decrement the counters
      for addr -> ctr in map s.proposal_counters block {
        if Set.mem (addr, new_store) then
          s.proposal_counters[addr] := abs (ctr - 1n)
        else skip
      }
    } else s.message_store[packed_msg] := new_store;
  } with (ret_ops, s)

function withdraw (const param : message; const s : storage) : return is
  block {
    var message : message := param;
    const packed_msg : bytes = Bytes.pack (message);

    case s.message_store[packed_msg] of
      Some (voters) ->
        block {
          // The message is stored
          const new_set : addr_set = Set.remove (Tezos.sender, voters);

          (* Decrement the counter only if the sender was already associated with the message *)
          if Set.cardinal (voters) =/= Set.cardinal (new_set)
          then s.proposal_counters[Tezos.sender] :=
                 abs (get_force (Tezos.sender, s.proposal_counters) - 1n)
          else skip;

          (* If the message is left without any associated addresses, remove the corresponding message_store field *)
          if Set.cardinal (new_set) = 0n
          then remove packed_msg from map s.message_store
          else s.message_store[packed_msg] := new_set
        }
    | None -> skip
    end // The message is not stored, ignore.
  } with ((nil : list (operation)), s)

function default (const p : unit; const s : storage) : return is
    ((nil : list (operation)), s)

function main (const param : parameter; const s : storage) : return  is
  case param of
    (* Propagate message p if the number of authorized addresses having voted for the same message p equals the threshold. *)
    | Send (p) -> send (p, s)
    (* Withdraw vote for message p *)
    | Withdraw (p) -> withdraw (p, s)
    (* Use this action to transfer tez to the contract *)
    | Default (p) -> default (p, s)
  end

```

Notice in the *Send* function the number of voters is compared to the threshold. If threshold is reached :  
* the message *packed_msg* is removed from *message_storage*
* the action is executed and takes the _string_ as parameter
* the inner state *state_hash* of the contract is updated by creating a hash key of old state + treated message 
* the counter (of number of proposals) is updated. This is used to compute the limit of maximum of proposal.

```
  if Set.cardinal (new_store) >= s.threshold then {
    remove packed_msg from map s.message_store;
    // trigger action execution
    ret_ops := execute_action(msg, s);
    // update the state hash
    s.state_hash := Crypto.sha256 (Bytes.concat (s.state_hash, packed_msg));
    // decrement the counters
    for addr -> ctr in map s.proposal_counters block {
      if Set.mem (addr, new_store) then
        s.proposal_counters[addr] := abs (ctr - 1n)
      else skip
    }
  }
```

Notice in the *Withdraw* function :
* if a message proposal has no voters the it is removed
* the counter (of number of proposals) is updated. This is used to compute the limit of maximum of proposal.


## Your mission

<!-- prettier-ignore --> We have a basic mutli-signature contract but voters doesn't approve quickly enough. Maybe if we grant a reward for signers it will speed the process. Modify the existing *Multisig* contract in order to handle reputation level for each voters. We plan to grant reputation points when the message is really executed (one point of reputation for each voters).

<!-- prettier-ignore --> 1- Modify storage to have an additionnal property called *reputation* which associates a _nat_ number to a voter.

<!-- prettier-ignore --> 2- Iterate on voters with a _for_ loop (use *addr* as temporary variable for the loop).

<!-- prettier-ignore --> 3- Modify *reputation* in a single instruction using a _case_ operator to verify if voter has already a reputation account (use *count* as temporary variable for the _Some_). If the voter is not registered yet in the *reputation* register then add him otherwise update its reputation by incrementing by one its actual level !. It is recommanded to use Map.add and Map.update when modifying a _map_.

