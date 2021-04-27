/*The company-objects tie almost everything together they create pawns and entrepreneurs. They host
the array for all the company's bought properties in owned-attribute. It also contains several basic
interaction methods, of which many alter the CSS.*/

let companyID = 0;
let companyArray = [];

class Company {
  constructor(note){
    companyID++;
    this.id = companyID;
    this.name = note.name+" Oyj.";
    this.icon = "./icons/"+companyID+".svg";
    companyArray.push(this);
    this.pawn = new Pawn(this, companyID-1);
    this.lead = new Entrepreneur(this);
    this.treasury = 2000;
    this.owned = [];
    this.isActive = true;

    var tr = createTr(this.name+"CN", "companies");
    var td = createTd(this.name+"CName", this.name, tr);
    var td = createTd(this.name+"CIcon", "", tr);
    var img = document.createElement("img");
    img.src = this.icon;
    td.appendChild(img);
    var td = createTd(this.name+"CPro", this.owned.length, tr);
    var td = createTd(this.name+"CTre", this.treasury+"K", tr);
    var td = createTd(this.name+"CTv", this.getTotalValue(), tr);

  }

  sellPropertyTo(buyer, property, amount){
    buyer.treasury -= amount;
    this.treasury += amount;
    property.directPurchase(buyer);
    message(this.name+" was forced to sell "+property.name+" to "+buyer.name+" for "+amount+"K", "negative");
    this.lead.changeReputation(-25);
  }

  getRentFrom(payer, amount){
    payer.treasury -= amount;
    this.treasury += amount;
    this.lead.changeReputation(5);
    payer.lead.changeReputation(-10);
    payer.seeBankruptcy();
  }

  gain(amount){
    this.treasury += amount;
    message(this.name+" gained "+amount+"K due event", "positive");
  }

  lose(amount){
    this.treasury -= amount;
    message(this.name+" lost "+amount+"K due event", "positive");
    this.seeBankruptcy();
  }

  seeBankruptcy(){
    if (this.treasury < 0){
      if (this.owned.length > 0){
        while(this.treasury < 0 && this.owned.length > 0){
          this.aunction();
        }
      }
    }
    if (this.treasury < 0){
      message(this.name+" went bankrupt", "negative");
      companyArray.splice(companyArray.indexOf(this),1)
      document.getElementById("entrepreneurs").removeChild(
      document.getElementById(this.name+"LN"));
      document.getElementById("companies").removeChild(
      document.getElementById(this.name+"CN"));
      document.getElementById("board").removeChild(
      document.getElementById("pawn"+this.id));
      player.update(true);
      this.isActive = false;
      if (companyArray.length == 1){
        alert("A monopoly has emerged, you have lost!");
        location.reload();
        return false;
      }
    }
  }

  aunction(){
    var target = choice(this.owned);
    this.owned.splice(this.owned.indexOf(target),1);
    target.owner = null;

    var buyers = [];
    var value = target.value;
    while(buyers.length == 0 && value > 0){
      for(var x of companyArray){
        if (x.treasury > value){
          buyers.push(x);
        }
      }
      value -= 10;
    }

    if (buyers.length > 0){
      var buyer = choice(buyers);
      this.sellPropertyTo(buyer, target, value);
    }

  }

  replaceLead(){
    this.lead = new Entrepreneur(this);
  }

  holdTurn(){
    var diceRoll = rollDice();
    this.pawn.moveSteps(diceRoll);
    var target = this.pawn.location;
    var m = this.lead.name+" ("+this.name+")"+" rolled "+diceRoll;
    message(m, "regular");
    if (target.canBeBought()){
      if (this.treasury > target.value && this.lead.willBuy(target)){
        this.treasury -= target.value;
        target.beAcquiredBy(this);
        this.lead.changeReputation(10);
      }
    } else {
      target.enter(this);
    }
    if (this.isActive){
      this.updateGUI();
    }
    this.lead.tenureUp();
  }

  updateGUI(){
    document.getElementById(this.name+"CPro").innerHTML = this.owned.length;
    document.getElementById(this.name+"CTre").innerHTML = Math.floor(this.treasury)+"K";
    document.getElementById(this.name+"CTv").innerHTML = Math.floor(this.getTotalValue())+"K";
  }

  getTotalValue(){
    var v = this.treasury;
    for(var x of this.owned){
      v += x.value;
    }
    return v;
  }

  static createCompanies(){
    this.state = {
      companies:
        [
          {name: "Seiväs"},
          {name: "Nokka"},
          {name: "P.A"},
          {name: "Kaakko"},
        ]
      }
      this.state.companies.map(note => new Company(note));
  }

}
