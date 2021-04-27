/*The entrepreneur has many attributes, most of these being personalities, others being tenure
(representing how long the entrepreneur has led the company (each turn is marked as 0.25
representing 3 months) and reputation will decide when and if the entrepreneur will resign from
their position.
Because entrepreneurs are often replaced and new entrepreneur takes their place, depending on if
there is already pre-existing entrepreneur the row in which the entrepreneur is defined is either
created or updated.*/

class Entrepreneur {
  constructor(company){
    this.name = choice(forenames)+" "+choice(surnames);
    this.company = company;
    this.prudence = rollDice();
    this.ambition = rollDice();
    this.pride = rollDice();
    this.tenure = 0;
    this.reputation = 25;

    if (company.lead == null){
      var tr = createTr(company.name+"LN", "entrepreneurs");
      var td = createTd(company.name+"LName", this.name, tr);
      var td = createTd(company.name+"LCName", "", tr);
      var img = document.createElement("img");
      img.src = company.icon;
      td.appendChild(img);
      var td = createTd(company.name+"LPru", getDiceSymbol(this.prudence), tr);
      var td = createTd(company.name+"LAmb", getDiceSymbol(this.ambition), tr);
      var td = createTd(company.name+"LPri", getDiceSymbol(this.pride), tr);
      var td = createTd(company.name+"LRep", this.reputation+"%", tr);
      var td = createTd(company.name+"LTen", this.tenure, tr);
    } else {
      document.getElementById(company.name+"LName").innerHTML = this.name;
      document.getElementById(company.name+"LPru").innerHTML = getDiceSymbol(this.prudence);
      document.getElementById(company.name+"LAmb").innerHTML = getDiceSymbol(this.ambition);
      document.getElementById(company.name+"LPri").innerHTML =  getDiceSymbol(this.pride);
      document.getElementById(company.name+"LRep").innerHTML = this.reputation+"%";
      document.getElementById(company.name+"LTen").innerHTML = this.tenure;
    }
  }

  willBuy(loc){
    if (this.isConsideredSafe()){
      if (this.isConsideredWorthy(loc)){
        if (this.isConsideredNeeded()){
          return true;
        } else {
          message(this.getName()+" didn't buy  "+loc.name+" due to lack of ambition", "rejection");
        }
      } else {
        message(this.getName()+" didn't buy "+loc.name+" due to low worth", "rejection");
      }
    } else {
      message(this.getName()+" didn't buy  "+loc.name+" due to the cost", "rejection");
    }
  }

  isConsideredSafe(){
    var safety = 25*this.prudence;
    return this.company.treasury >= safety;
  }

  isConsideredWorthy(value){
    return value.dignity >= this.pride;
  }

  isConsideredNeeded(){
    return this.company.owned.length <= (Math.floor(this.tenure)+(this.ambition*4));
  }

  tenureUp(){
    this.tenure += 0.25
    if (this.company.isActive){
      document.getElementById(this.company.name+"LTen").innerHTML = this.tenure;
    }
  }

  changeReputation(amount){
    var nr = this.reputation + amount;
    var change = this.reputation;
    this.reputation = Math.max(Math.min(nr, 100), 0);
    if (change != this.reputation){
      if (amount > 0){
        message(this.getName()+" reputation was increased by "+amount+"%", "positive");
      } else {
        message(this.getName()+" reputation was decreased by "+amount+"%", "negative");
        if (this.reputation == 0){
          this.company.replaceLead();
          message(this.name+" resigned due unpopularity and was replaced by "+this.company.lead.getName(), "negative");
        }
        return;
      }
      document.getElementById(this.company.name+"LRep").innerHTML = this.reputation+"%";
    }
  }

  getName(){
    return this.name+" ("+this.company.name+")";
  }

}

const forenames = ["Lauri", "Kalle", "Pekka", "Petri", "Tommi", "Oskari", "Antti", "Juho", "Ville", "Mikko"];

const surnames = ["Alatalo", "Haapaniemi", "Hautamäki", "Järvenpää", "Kankaanpää", "Keskitalo", "Kivimäki", "Kiviniemi", "Koivuniemi", "Kujanpää", "Lähteenmäki", "Lehtimäki", "Mäenpää", "Myllymäki", "Palomäki", "Peltoniemi", "Riihimäki", "Sillanpää", "Uusitalo", "Välimäki", "Ylitalo"];
