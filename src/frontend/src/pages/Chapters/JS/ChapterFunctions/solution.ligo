type ship_code = string;
let my_ship: ship_code = "020433";
// Modify the code below
let modify_ship = (my_ship: ship_code): ship_code => "" + String.sub(0 as nat, 2 as nat, my_ship) + "1" + String.sub(3 as nat, 3 as nat, my_ship)
