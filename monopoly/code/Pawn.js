/*The pawn-object is a companion piece of a graphical pawn element, most of its attributes serve to
adjust the graphical piece like offset-attribute which is unique for all four pawns, it will make sure
that when multiple pawns are in the same square they won't overlap. It also has a location value to
indicate which particular square is located.
It only hosts the important moveSteps(steps)-method, which uses a switch to determine the ideal
coordinates for a graphical depiction of the pawn.*/

let pawnArray = [];
let pawnID = 0;

class Pawn{
  constructor(company){
    pawnID++;
    pawnArray.push(this);
    this.name = "pawn"+company.id;
    this.offset = (company.id-1)*20;
    var newProperty = document.createElement("span");
    newProperty.id = this.name;
    newProperty.className = "pawn";
    document.getElementById("board").appendChild(newProperty);
    this.location = allSquares[0];
    document.getElementById(this.name).style.top = 0;
    this.moveSteps(0);
  }
  moveSteps(steps){
    this.location = allSquares[
      ((this.location.squareID+steps)%32)
    ];

    var cs = document.getElementById(this.name);
    var le;
    var to
    switch(this.location.displayType){
      case 0:
        le = this.location.center[0];
        if (this.location.squareID < 16){
          to = this.offset+this.location.center[1];
        } else {
          to = this.location.center[1]-this.offset;
        }

        break;
      case 1:
        to = this.location.center[1];
        if (this.location.squareID < 16){
          le = this.location.center[0]-this.offset;
        } else {
          le = this.location.center[0]+this.offset;
        }
        break;
      default:
        switch(this.location.id){
          case 1:
            le = this.location.center[0]+this.offset;
            to = this.location.center[1]+this.offset;
            break;
          case 2:
            le = this.location.center[0]-this.offset;
            to = this.location.center[1]+this.offset;
            break;
          case 3:
            le = this.location.center[0]-this.offset;
            to = this.location.center[1]-this.offset;
            break;
          case 4:
            le = this.location.center[0]+this.offset;
            document.getElementById(this.name).style.top = this.location.center[1]-this.offset;
            break;
        }
    }
    cs.style.left = le+"px";
    cs.style.top =  to+"px";



  }
}
