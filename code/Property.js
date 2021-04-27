/*The property-object is the companion of purchasable squares of which there are of 28. Each object
has a specific price for purchase, dignity (determines if AI might buy it), and center (pawn's
coordinate).
Its more prominent method is select which alters the CSS upon clicking a previously onclick-binded
element. The selection itself allow buyShare()-method to be executed.*/

let propertyArray = [];
let propertyID = 0;
let squareSelection;


const position = [
  [110, 170, 230, 350, 410, 470, 570, 570, 570, 570, 570, 570, 470, 410, 350, 230, 170, 110, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 110, 170, 230, 350, 410, 470, 563,563,563,563,563,563, 470, 410, 350, 230, 170, 110]
];

class Property extends Square {
  constructor(square){
    super(true);
    propertyID++;
    this.id = propertyID
    this.name = square.name;
    this.value = square.value;
    this.dignity = square.dignity;
    this.center = [position[0][propertyID-1],position[1][propertyID-1]];
    if (square.loc == "north" || square.loc == "south"){
      this.displayType = 0;
    } else {
      this.displayType = 1;
    }
    this.shares = [];
    for(var x = 0; x < 10; x++){
      this.shares.push(new Share(this));
    }


    propertyArray.push(this);
    this.makeHTML(square);
  }

  getOwner(){
    if (this.owner != null){
      return this.owner.name;
    } else {
      return "N/A";
    }
  }

  getRent(){
    return Math.floor(this.value*0.1,0);
  }

  enter(visitor){
    if (this.owner != visitor){
      var a = this.getRent();
      message((visitor.name+" paid "+a+"K to "+this.owner.name+" for visiting "+this.name), "negative");
      this.owner.getRentFrom(visitor, a);
    }
  }

  beAcquiredBy(company){
    this.directPurchase(company);
    var m = company.name+" bought "+this.name+" for "+this.value+"K";
    message(m, "positive");  }


  directPurchase(company){
    this.owner = company;
    company.owned.push(this);
    var i = "url('"+company.icon+"')";
    document.getElementById("prop"+this.id).style.backgroundImage = i;
    if (squareSelection == this){
      squareSelection.select();
    }
  }

  getShares(){
    var l = [];
    if (this.owner != null){
      for(var x of this.shares){
        if (!x.isOwned){
          l.push(x);
        }
      }
    }
    return l;
  }

  makeHTML(square){
    var newProperty = document.createElement("span");
    newProperty.id = "prop"+this.id;

    newProperty.className = square.loc+"property";
    var object = this;
    newProperty.addEventListener("click",   function() {
          object.select();
      }, false);

    newProperty.innerHTML= "#"+this.id+" "+this.name+"<br>"+this.value+"K";
    document.getElementById("board").appendChild(newProperty);
  }
  select(){
    squareSelection = this;
    document.getElementById("infoName").innerHTML = this.name;
    if (this.owner != null ){
      document.getElementById("infoValue").innerHTML =
      this.shares[0].value+"K ("+Math.floor(this.shares[0].getValue())+"K)";
    }
    document.getElementById("infoOwner").innerHTML = this.getOwner();
    document.getElementById("infoDignity").innerHTML = this.dignity;
    document.getElementById("infoShares").innerHTML = this.getShares().length;
    document.getElementById("infoCoa").style.backgroundImage = 'url(icons/'+this.id+'.png)'
  }
}
