type ship_code is string
var my_ship : ship_code := "020433"
my_ship := "222031"

function modify_ship (const my_ship : ship_code) : ship_code is {
  // Type your solution below
  var modified_ship : ship_code := my_ship;
  if String.sub(2n, 1n, my_ship) = "0" then {
    modified_ship := String.sub(0n, 2n, my_ship) ^ "1" ^ String.sub(3n, 3n, my_ship)
  }
} with modified_ship
