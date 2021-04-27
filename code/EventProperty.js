/*Event properties server to host a variation of the enter-method (which is called every time a pawn
moves into a new square), this enter method picks one of the 10 possible outcomes to happen, most
of which are treasury related.*/

let eventArray = [];
let eventID = 0;


const positionEvent = [
  [290, 570, 290, 0,],
  [0, 290, 563, 280]
];

class EventProperty extends Square{
  constructor(display){
    super(false);
    eventID++;
    this.id = eventID
    eventArray.push(this);
    this.makeHTML();
    this.displayType = display;
    this.center = [positionEvent[0][eventID-1],positionEvent[1][eventID-1]];
  }
  enter(visitor){
    var r = randint(10);
    switch(r){
      case 0:
        visitor.gain(100);
        break;
      case 1:
        visitor.gain(50);
        break;
      case 2:
        visitor.lose(125);
        break;
      case 3:
        visitor.lose(75);
        break;
      case 4:
        visitor.lead.changeReputation(25);
        break;
      case 5:
        visitor.lead.changeReputation(-30);
        break;
      case 6:
        var oldLead = visitor.lead;
        visitor.replaceLead();
        message(oldLead.getName()+" was voted out and replaced by "+visitor.name, "negative");
        break;
      case 7:
        visitor.gain(visitor.lead.ambition*10);
        break;
      case 8:
        visitor.gain(visitor.lead.prudence*10);
        break;
      case 9:
        visitor.gain(visitor.lead.pride*10);
        break;
    }
  }
  makeHTML(){
    var newProperty = document.createElement("span");
    newProperty.id = "event"+this.id;
    newProperty.className = "eventProperty";
    document.getElementById("board").appendChild(newProperty);
  }
}
