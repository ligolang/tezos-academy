type coordinates = [int, int, int];
type planet = {
    name: string,
    position: coordinates,
    density: nat,
    atmospheric_activity: bool
};

let star_map: list<planet> = list([
    {
      name: "Earth",
      position: [0,0,0],
      density: 20 as nat,
      atmospheric_activity: true
    },
    {
      name: "Jupitee",
      position: [2,7,1],
      density: 340 as nat,
      atmospheric_activity: false
    },
    {
      name: "Methuselah",
      position: [2232,7423,12342],
      density: 44 as nat,
      atmospheric_activity: false
    },
    {
      name: "Osiris",
      position: [134,454,1321],
      density: 165 as nat,
      atmospheric_activity: false
    },
    {
      name: "Gliese",
      position: [234,8045,435],
      density: 11 as nat,
      atmospheric_activity: true
   } 
]);

let scan = (l : list<planet>) : planet => {
  let destination: planet = {
      name: "", 
      position: [0,0,0],
      density: 0 as nat, 
      atmospheric_activity: false
  };
  // Type your solution below
};
