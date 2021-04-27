/*For every property-object 10 Share-objects are created here because there are 28 property-objects
there are a total of 280 Share-object are the most majority of objects of the game. Share-objects
contain a link to the property-object to which they belong , value based on that property's value, and
a isOwned boolean flag to see if the player already owns this particular share.*
It is important to note that line #14 defines formula for the real value of shares, its method,
"getValue" is called and updated each time when share value is needed.
Sell-method undoes most things that Player.js's buyShare-method did, it also contains a victory
check if the player reaches 1000 treasury.*/

let shareArray = [];
let shareID = 0;

class Share {
  constructor(property){
    shareArray.push(this);
    shareID++;
    this.id = shareID;
    this.property = property;
    this.value = property.value*0.1;
    this.isOwned = false;
  }
  getValue(){
    var lead = this.property.owner.lead;
    return this.value
    *((0.5+(lead.reputation/100))*Math.min(Math.max(lead.tenure/2.5), 1));
  }
  sell(){
    document.getElementById("shares").removeChild(document.getElementById("share"+this.id, "shares"));
    message("You sold a share in "+this.property.name, "positive");
    this.isOwned = false;
    player.treasury += this.getValue();
    player.owned.splice(player.owned.indexOf(this),1);
    this.property.owner.treasury -= this.getValue();
    this.property.owner.seeBankruptcy();
    this.property.owner.updateGUI();
    player.update(false)
    if (player.treasury >= 1000){
      var score = Math.max((110-turnNumber),1)
      alert("Congratulations! You have turned the starting sum of 100K to one million and thus you have won the game. You score is: "+score);
      location.reload();
      return false;
    }
  }
  updateGUI(updateIcon){
    document.getElementById("share"+this.id+"2").innerHTML = Math.floor(this.getValue())+"K";
    document.getElementById("share"+this.id+"1I").src = this.property.owner.icon;
  }
}
