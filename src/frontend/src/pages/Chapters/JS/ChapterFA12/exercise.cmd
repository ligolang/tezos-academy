// Modify the code below
ligo compile storage fa12.ligo ''
// Modify the code below
ligo compile parameter fa12.ligo ''
// Modify the code below
ligo run dry-run fa12.ligo '<parameter_expression_step2>' '<storage_expression_step1>' --sender tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6 
// Modify the code below
tezos-client transfer <amount> from <user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
// Modify the code below
ligo compile parameter fa12.ligo ''
// Modify the code below
ligo compile storage fa12.ligo ''
// Modify the code below
ligo run dry-run fa12.ligo '<parameter_expression_step6>' '<storage_expression_step5>' --sender tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6
// Modify the code below
tezos-client transfer <amount> from <user> to <contract_name> --arg '<entrypoint_invocation>' --dry-run
