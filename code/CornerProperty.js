/*Corner property-objects are basically only created because of their unique center attribute—for
corners require a very specific position for all the pawns. Initially, corner objects were meant to
have a bunch of unique features, but due to time constraints, the stable version is devoid of them.*/

let cornerArray = [];
let cornerID = 0;

const positionCorner = [
  [0, 567, 567, 0],
  [0, 0, 563, 563]
];

class CornerProperty extends Square {
  constructor(){
    super(false);
    cornerID++;
    this.id = cornerID
    this.center = [positionCorner[0][cornerID-1],positionCorner[1][cornerID-1]];
    this.displayType = 2;
    cornerArray.push(this);
    this.makeHTML();
  }
  makeHTML(){
    var newProperty = document.createElement("span");
    newProperty.id = "corner"+this.id;

    newProperty.className = "cornerProperty";
    document.getElementById("board").appendChild(newProperty);
  }
  enter(visitor) {
    message(visitor.lead.getName()+" took a train", "regular");
    visitor.pawn.moveSteps(16)
  }
}
