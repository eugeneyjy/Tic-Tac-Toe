class Ai {
  constructor(symb) {
    this.symbol = symb;
  }

  successor(board) {
    var moves = [];
    var coordinate;
    for(var i = 0; i < board.size; i++){
      for(var j = 0; j < board.size; j++){
        if(board.game_board[i][j] == -1){
          coordinate = [];
          coordinate.push(i);
          coordinate.push(j);
          moves.push(coordinate);
        }
      }
    }
    return moves;
  }

  utilityScore(status) {
    if(status == -1){
      return 0;
    }else if(status == board.turn){
      return 1;
    }else{
      return -1;
    }
  }

  maxValue(board) {
    var terminalStatus = board.checkTerminate();
    if(terminalStatus != null){
      return this.utilityScore(terminalStatus);
    }
    var value = -Infinity;
    var moves = this.successor(board);
    for(var i = 0; i < moves.length; i++){
      board.moveTo(moves[i][0], moves[i][1], this.symbol);
      value = Math.max(value, this.minValue(board));
      board.game_board[moves[i][0]][moves[i][1]] = -1;
    }
    return value;
  }

  minValue(board) {
    var terminalStatus = board.checkTerminate();
    if(terminalStatus != null){
      return this.utilityScore(terminalStatus);
    }
    var minplayer = 0;
    if(this.symbol == 0){
      minplayer = 1
    }
    var value = Infinity;
    var moves = this.successor(board);
    for(var i = 0; i < moves.length; i++){
      board.moveTo(moves[i][0], moves[i][1], minplayer);
      value = Math.min(value, this.maxValue(board));
      board.game_board[moves[i][0]][moves[i][1]] = -1;
    }
    return value;
  }

  getMove(board) {
    var maxVal = -Infinity;
    var val;
    var move = [-1,-1];
    var moves = this.successor(board);
    for(var i = 0; i < moves.length; i++){
      board.game_board[moves[i][0]][moves[i][1]] = this.symbol;
      val = this.minValue(board);
      board.game_board[moves[i][0]][moves[i][1]] = -1;
      if(val > maxVal){
        maxVal = val;
        move[0] = moves[i][0];
        move[1] = moves[i][1];
      }
    }
    return move;
  }
}
