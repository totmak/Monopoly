/*Hosts Player-class of which only one object is ever created per one game, called by index.js. The
object has the attributes of owned-array and treasury (starting at 100). More notably the class host
static buyShare()-method which is in charge of buying the player a selected share and creating
HTML-row for it.*/

let playerArray = [];

class Player {
  constructor(){
    playerArray.push(this);
    this.owned = [];
    this.treasury = 100;
    this.update();
  }

  update(reloadIcons){
    for(var x of this.owned){
      x.updateGUI(reloadIcons);
    }
    document.getElementById("playerShares").innerHTML = this.owned.length;
    document.getElementById("playerTreasury").innerHTML = Math.floor(this.treasury)+"K";
    document.getElementById("playerSharesValue").innerHTML = Math.floor(this.getShareValue())+"K";
    document.getElementById("playerTurn").innerHTML = turnNumber;
  }
  getShareValue(){
    var v = 0;
    for(var x of this.owned){
      v += x.getValue();
    }
    return v;
  }
  static cashOut(){
    var rem = [];
    for(var x of player.owned){ rem.push(x); }
    for(var x of rem){ x.sell(); }
  }
  static buyShare(){
    if (squareSelection != null){
      var ss = squareSelection;
      var sh = ss.getShares();
      if (sh.length > 0){
        var s = sh[0];
        var value = s.getValue();
        if (player.treasury >= value){
          s.isOwned = true;
          player.treasury -= value;
          ss.owner.treasury += value;
          player.owned.push(s);
          var tr = createTr("share"+s.id, "shares");
          var td = createTd("share"+s.id+"0", s.property.name, tr);
          var td = createTd("share"+s.id+"1", "", tr);
          var img = document.createElement("img");
          img.src = s.property.owner.icon;
          img.id = "share"+s.id+"1I";
          td.appendChild(img);
          var td = createTd("share"+s.id+"2", Math.floor(value)+"K", tr);
          var td = createTd("share"+s.id+"3", s.value+"K", tr);

          var td = createTd("share"+s.id+"4", "", tr);
          var button = document.createElement("button");
          button.innerHTML = "SELL";
          button.addEventListener("click",   function() {
                s.sell();
            }, false);
          td.appendChild(button);
          message("You bought a share in "+s.property.name, "positive");
          player.update(false)
          ss.owner.updateGUI();
          squareSelection.select();
        }  else {
          message("You cannot afford to buy a share which costs "+Math.floor(value)+"K", "negative")
        }
      } else{
        message("There are no more avaible shares", "negative");
      }
    }
  }
}
