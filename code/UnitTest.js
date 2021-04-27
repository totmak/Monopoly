function runUnitTest(){
  var t = totalNumberOfSquaresIs(32);
  t += numberOfPropertiesIs(24);
  t += numberOfCornerIs(4);
  t += numberOfEventsIs(4);
  t += turnIs(0);
  t += numberOfPawnIs(4);
  t += numberOfPlayersIs(1);
  t += playerHasMoneyAmountOf(100);
  t += selectionIsEmpty();
  t += numberOfShareIs(240);
  t += nobodyOwnsProperties();
  t += positionOfPawnIs(1,0,0);
  t += positionOfPawnIs(2,20,20);
  t += positionOfPawnIs(3,40,40);
  t += positionOfPawnIs(4,60,60);
  return t == 15;
}

function totalNumberOfSquaresIs(n){
  var t = allSquares.length == n;
  console.info("Has "+n+" squares:"+t);
  return t;
}

function numberOfPropertiesIs(n){
  var t = propertyID == propertyArray.length && propertyID == n;
  console.info("Has "+n+" properties:"+t);
  return t;
}


function numberOfCornerIs(n){
  var t = cornerID == cornerArray.length && cornerID == n;
  console.info("Has "+n+" corners:"+t);
  return t;
}

function numberOfEventsIs(n){
  var t = eventID == eventArray.length && eventID == n;
  console.info("Has "+n+" events:"+t);
  return t;
}

function turnIs(n){
  var t = turnNumber == n;
  console.info("Turn number is "+n+":"+t);
  return t;
}

function numberOfPawnIs(n){
  var t = pawnID == pawnArray.length && pawnID == n;
  console.info("Has "+n+" pawns:"+t);
  return t;
}


function numberOfPlayersIs(n){
  var t = playerArray.length == n;
  console.info("Number of player is "+n+":"+t);
  return t;
}

function playerHasMoneyAmountOf(n){
  var t = (player != null) && (player.treasury == n);
  console.info("Player has "+n+" money:"+t);
  return t;
}

function selectionIsEmpty(n){
  var t = squareSelection == null;
  console.info("Selection is empty:"+t);
  return t;
}

function numberOfShareIs(n){
  var t = shareID == shareArray.length && shareID == n;
  console.info("Number of share is "+n+":"+t);
  return t;
}

function positionOfPawnIs(id, xc, yc){
  var p = document.getElementById("pawn"+id);
  var t = p.style.left == xc+"px" && p.style.top == yc+"px";
  console.info("Coordinate of pawn #"+id+" is "+xc+", "+yc+":"+t);
  return t;
}

function nobodyOwnsProperties(){
  var t = true;
  for(var x of propertyArray){
    if (x.owner != null){
      t = false;
      break;
    }
  }
  console.info("Nobody owns properties:"+t);
  return t;
}
