// Modify the code below
ligo compile storage fa12.ligo 'record [ totalSupply=1000000n; ledger=big_map [ ("tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6":address) -> record [ balance=1000000n; allowances=(map [] : map(address, amt)) ] ] ]'
// Modify the code below
ligo compile parameter fa12.ligo 'Approve(("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb":address), 2n)'
// Modify the code below
ligo run dry-run fa12.ligo 'Approve(("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb":address), 2n)' 'record [ totalSupply=1000000n; ledger=big_map [ ("tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6":address)->record [ balance=1000000n; allowances=(map [] : map(address, amt)) ] ] ]' --sender tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6
// Modify the code below
tezos-client transfer 0 from me to TezosAcademyToken --arg '(Left (Left (Left (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" 2))))' --dry-run
// Modify the code below
ligo compile parameter fa12.ligo 'Transfer(("tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6":address), ("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb":address), 2n)'
// Modify the code below
ligo compile storage fa12.ligo 'record [ totalSupply=1000000n; ledger=big_map [ ("tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6":address)->record [balance=1000000n; allowances=map [("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb":address)->2n] ] ] ]'
// Modify the code below
ligo run dry-run fa12.ligo 'Transfer(("tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6":address), ("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb":address), 2n)' 'record [ totalSupply=1000000n; ledger=big_map [ ("tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6":address)->record [balance=1000000n; allowances=map [("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb":address)->2n] ] ] ]' --sender tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6
// Modify the code below
tezos-client transfer 0 from me to TezosAcademyToken --arg '(Right (Pair (Pair "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6" "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb") 2))' --dry-run
