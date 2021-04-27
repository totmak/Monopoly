/*The file is essentially a container for micro-methods who couldn't afford their own class, it also
triggers several import methods from other files. More important it defines the const player, which
most player-interactions are related to.*/

let turnNumber = 0;
const diceSymbol = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function getDiceSymbol(n){
  return "<span class='dice'>"+diceSymbol[n]+"</span>";
}

function randint(i){
  return  Math.floor((Math.random() * i));
}

function flipCoin(){
  return this.randint(2) == 0;
}

function choice(l){
  return l[randint(l.length)];
}

function rollDice(){
  return 1+randint(6);
}

function roll(n){
  return randint(n) == 0;
}

function typecast(clas, obj) {
  return Object.assign(new clas(),obj);
}

function createTr(id, table){
  var tr = document.createElement("tr");
  tr.id = id;
  document.getElementById(table).appendChild(tr);
  return tr;
}

function createTd(id, txt, tr){
  var td = document.createElement("td");
  td.id = id;
  td.innerHTML = txt;
  tr.appendChild(td);
  return td;
}

function addToTable(tr, table){
  document.getElementById(table).appendChild(tr);
}

function message(m, c){
  var p = document.createElement('p');
  p.className = c;
  p.innerHTML = "#"+turnNumber+": "+m;
  document.getElementById("console").prepend(p);
}

Square.createSquares();
Company.createCompanies();
const player = new Player();
runUnitTest();
