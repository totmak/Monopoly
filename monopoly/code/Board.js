/*The board is object home to the parent class, square, which itself doesn't contain much methods, but
one of its static method, createSquares() is very skeleton of the game for its specifies the names and
values of squares and properties.*/

var allSquares = [];

class Square {
  constructor(sellable){
    this.isSellable = sellable;
  }

  canBeBought(){
    if (this.isSellable){
      if (this.owner == null){
        return true;
      }
    }
    return false;
  }

  enter(){

  }

  static createSquares(){
    this.state = {
      propertySquares:
        [
          {name: "Lohja", value: 100, loc: "north", dignity: 1},
          {name: "Hyvinkää", value: 120, loc: "north", dignity: 1},
          {name: "Kokkola", value: 140, loc: "north", dignity: 1},
          {name: "Porvoo", value: 160, loc: "north", dignity: 2},
          {name: "Salo", value: 180, loc: "north", dignity: 2},
          {name: "Kotka", value: 200, loc: "north", dignity: 2},
          {name: "Mikkeli", value: 220, loc: "east", dignity: 3},
          {name: "Rovaniemi", value: 240, loc: "east", dignity: 3},
          {name: "Seinäjoki", value: 260, loc: "east", dignity: 3},
          {name: "Vaasa", value: 280, loc: "east", dignity: 4},
          {name: "Hämeenlinna", value: 300, loc: "east", dignity: 4},
          {name: "Lappeenranta", value: 320, loc: "east", dignity: 4},
          {name: "Joensuu", value: 340, loc: "south", dignity: 5},
          {name: "Kouvola", value: 360, loc: "south", dignity: 5},
          {name: "Pori", value: 380, loc: "south", dignity: 5},
          {name: "Kuopio", value: 400, loc: "south", dignity: 6},
          {name: "Lahti", value: 420, loc: "south", dignity: 6},
          {name: "Jyväskylä", value: 440, loc: "south", dignity: 6},
          {name: "Oulu", value: 480, loc: "west", dignity: 7},
          {name: "Turku", value: 460, loc: "west", dignity: 7},
          {name: "Vantaa", value: 500, loc: "west", dignity: 7},
          {name: "Tampere", value: 520, loc: "west", dignity: 8},
          {name: "Espoo", value: 540, loc: "west", dignity: 8},
          {name: "Helsinki", value: 560, loc: "west", dignity: 8}
        ]
      }
      this.state.propertySquares.map(note => new Property(note));
      for(var x = 0; x < 4; x++){
        new EventProperty(x%2);
        new CornerProperty();
      };

      for(var x = 0; x < 4; x++){
        Square.listSquare(cornerArray[x]);
        for(var y = 0; y < 3; y++){
          Square.listSquare(propertyArray[y+(x*6)]);
        }
        Square.listSquare(eventArray[x]);

        for(var y = 3; y < 6; y++){
          Square.listSquare(propertyArray[y+(x*6)]);
        }
      }
  }

  static listSquare(square){
    square.squareID = allSquares.length;
    allSquares.push(square);
  }

}

function reloadGame(){
  location.reload();
  return false;
}


function turn(){
  turnNumber++;
  for(var x of companyArray){
    x.holdTurn();
  }
  player.update(false);
}
