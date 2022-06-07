#include "central_types.ligo"
#include "squadron_types.ligo"

function registerShip(const key: shipKey; const shipAddress: address; const shipName: string; const shipHostile: bool; var cs: centralStorage): (list(operation) * centralStorage) is { 
  const checkship: option(ship) = cs[key];
  case checkship of [
      | Some(_e) -> failwith("ship already registered")
      | None -> {
        cs[key] := record [
          id = shipAddress;
          name = shipName;
          hostile = shipHostile;
        ]
      }
  ]
} with ((nil: list(operation)) , cs)

function sendTx(const e: ship; const callbackAddress: address): (list(operation)) is {
  // Type your solution below
  const contractInterfaceOpt: option(contract(actionSquadron)) = Tezos.get_entrypoint_opt("%moduleResponse", callbackAddress);
  const contractInterface: contract(actionSquadron) = case contractInterfaceOpt of [
    | Some(ci) -> ci
    | None -> (failwith("Entrypoint not found in contract Squadron"): contract(actionSquadron))
  ];
  const ee : actionModuleResponse = record [
    e = e
  ];
  const sendbackOperation: operation = Tezos.transaction(ModuleResponse(ee), 0mutez, contractInterface);

  const listoperation : list(operation) = list [
    sendbackOperation
  ]
} with (listoperation)

function retrieveShip(const key: shipKey; const callbackAddress: address; const cs: centralStorage): (list(operation) * centralStorage) is {
  const checkship: option(ship) = cs[key];
  var listop: list(operation) := list [];
  case checkship of [
    | Some(e) -> listop := sendTx(e, callbackAddress)
    | None -> failwith("no ship")
  ]
} with (listop , cs)

function central(const action : actionCentral; const cs: centralStorage) : (list(operation) * centralStorage) is 
  case action of [
    | RegisterShip (ar) -> registerShip (ar.sKey, ar.sAddr, ar.sName, ar.sHostile, cs)
    | RetrieveShip (ret) -> retrieveShip(ret.sKey, ret.callbackAddress, cs)
  ]
