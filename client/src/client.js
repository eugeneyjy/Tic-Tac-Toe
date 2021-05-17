var board;
var n = 3;
var players;
var p2_name = "";
var score = [0,0,0];
var ai_bot;
var hv_ai = true;

function newGame() {
  players = [];
  getPlayersName();
  if(!validInput()){
    return;
  }
  board  = new Board(n, players[0], players[1]);
  createAi(1);
  var turn_display = document.getElementById('turn');
  turn_display.innerHTML = board.names[board.turn] + "'s  Turn ( X )";

  removeBackdrop();

  var squares = document.getElementsByClassName('square');
  for(var i = 0; i < squares.length; i++){
    if(squares[i].children[0])
      squares[i].removeChild(squares[i].children[0]);
  }
  console.log("Creating new game");
  letSquareClickable();
  letRefreshClickable();
}

function validInput() {
  for(var i = 0; i < players.length; i++){
    if(players[i] == ""){
      console.log("not valid");
      return false;
    }
  }
  console.log("valid");
  return true;
}

function getPlayersName() {
  var playernames = document.getElementsByClassName('name-input');
  for(var i = 0; i < playernames.length; i++){
    players.push(playernames[i].value);
  }
}

function createAi(symbol) {
  if(hv_ai)
    ai_bot = new Ai(symbol);
}

function removeBackdrop() {
  var backdrop = document.getElementsByClassName('backdrop-window');
  for(var i = 0; i < backdrop.length; i++){
    backdrop[i].style.display = "none";
  }
}

function getIndex(child) {
  var i = 0;
  while( (child = child.previousElementSibling) != null){
    i++
  }
  return i;
}

function createWinMsg(player) {
  var msg = document.createElement('p');
  msg.innerHTML = player + " has Won!";
  return msg;
}

function changeEndMsg() {
  var endgame_msg = document.getElementById('endgame-msg');
  var msg = endgame_msg.children[0];
  if(board.win == -1)
    msg.innerHTML = "It's a Draw...";
  else
    msg.innerHTML = board.names[board.win] + " has Won!";

}

function showEndWin() {
  var wind = document.getElementById('endgame-window');
  wind.style.display = "block";
}

function changeTurn() {
  var turn_display = document.getElementById('turn');
  if(board.turn == 1){
    board.turn = 0;
    turn_display.innerHTML = board.names[board.turn] + "'s Turn ( X )";
  }else{
    board.turn = 1;
    turn_display.innerHTML = board.names[board.turn] + "'s Turn ( O )";
  }
}

function move(index) {
  var div = document.createElement('div');
  var col = index % board.size;
  var row = Math.floor(index /  board.size);
  if(board.turn == 0) {
    div.className = "x";
  } else {
    div.className = "o";
  }
  board.moveTo(row, col, board.turn);
  board.setGameStatus();
  if(board.win == null){
    changeTurn();
  }
  return div;
}

function placeMove(event) {
  var index = getIndex(event.target);
  var alldiv = event.target.parentElement.children;
  event.target.appendChild(move(index));
  event.target.removeEventListener('click', placeMove);
  checkEndGame();
  console.log(board.win);
  if(ai_bot && board.turn == ai_bot.symbol && board.win == null){
    // console.log("aimove");
    var ai_move = ai_bot.getMove(board);
    var another_index = ai_move[0]*board.size+ai_move[1];
    // console.log(ai_bot.getMove(board));
    alldiv[another_index].appendChild(move(another_index));
    checkEndGame();
  }
}

function letSquareClickable() {
  var squares = document.getElementsByClassName('square');
  for(var i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', placeMove);
  }
}

function letRefreshClickable() {
  var refresh = document.getElementById('new-game');
  refresh.addEventListener('click', newGame);
}

function letPlayClickable() {
  var play = document.getElementById('start-button');
  play.addEventListener('click', newGame);
}

function removeFocus(e) {
  // console.log(e.type);
  var target = e.target.parentElement;
  var input = e.target;
  if(input.value == ""){
    if(target.classList.contains('focused')){
      target.classList.remove('focused');
    }
    if(target.classList.contains('not-focused') == false){
      void target.offsetWidth;
      target.classList.add('not-focused');
      // console.log("removing focus");
      // console.log(target);
    }
  }
}

function applyFocus(e) {
  // console.log(e.type);
  var target = e.target.parentElement;
  if(target.classList.contains('not-focused')){
    target.classList.remove('not-focused');
  }
  if(target.classList.contains('focused') == false){
    void target.offsetWidth;
    target.classList.add('focused');
    // console.log("adding focus");
    // console.log(target);
  }
}

function changeMode(e) {
  // console.log(e.target);
  var p2_field = document.getElementById('p2-field');
  var name_field = p2_field.firstElementChild;
  if(e.target.value == "normal"){
    p2_field.style.display = 'flex';
    name_field.value = p2_name;
    hv_ai = false;
  }else{
    p2_field.style.display = 'none';
    p2_name = name_field.value;
    name_field.value = "AI";
    hv_ai = true;
  }
}

function changeScore() {
  var scoreboard = document.getElementById('scoreboard');
  if(board.win != null){
    if(board.win == -1){
      score[2] += 1;
    }else{
      score[board.win] += 1;
    }
  }
  // console.log(score[2]);
  scoreboard.innerHTML = score[0] + " - " + score[2] + " - " + score[1];
}

function checkEndGame() {
  if(board.win != null){
    var squares = document.getElementsByClassName('square');
    for(var i = 0; i < squares.length; i++){
      squares[i].removeEventListener('click', applyFocus);
    }
    changeScore();
    changeEndMsg();
    showEndWin();
    return true;
  }
  return false;
}

var fields = document.getElementsByClassName('name-input');
for(var i = 0; i < fields.length; i++){
  fields[i].addEventListener('focus', applyFocus);
  fields[i].addEventListener('blur', removeFocus);
  fields[i].addEventListener('keypress', function(e){
    // console.log(e.key);
    if(e.key == "Enter"){
      newGame();
    }
  });
}

var choices = document.getElementsByName('gamemode');
for(var i = 0; i < choices.length; i++){
  choices[i].addEventListener('change', changeMode);
}
letPlayClickable();
