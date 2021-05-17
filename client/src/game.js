class Board {
  constructor(n, p1, p2) {
    this.game_board = [];
    this.size = n;
    this.turn = 0;
    this.win = null;
    this.names = [p1, p2];
    for(var i = 0; i < n; i++){
      this.game_board.push([]);
      for(var j = 0; j < n; j++){
        this.game_board[i].push(-1);
      }
    }
  }

  moveTo(row, col, symb) {
    this.game_board[row][col] = symb;
    // this.setGameStatus(row,col);
  }

  chgTurn() {
    if(this.turn == 0){
      this.turn = 1;
    }else{
      this.turn = 0;
    }
  }

  setGameStatus() {
    var terminate = this.checkTerminate();
    if(terminate != null){
      this.win = terminate;
    }
  }

  checkEqual(a, b, c) {
    if(a != -1){
      if(a == b && b == c){
        // console.log("a:" + a);
        return true;
      }
    }
    return false;
  }

  checkTerminate() {
    for(var i = 0; i < 3; i++){
      if(this.checkEqual(this.game_board[i][0], this.game_board[i][1], this.game_board[i][2])){
        // console.log("Row i:" + i + " " + this.game_board[i][0] + " " + this.game_board[i][1] + " " + this.game_board[i][2]);
        return this.game_board[i][0];
      }
    }

    for(var i = 0; i < 3; i++){
      if(this.checkEqual(this.game_board[0][i], this.game_board[1][i], this.game_board[2][i])){
        // console.log("col" + this.game_board[0][i]);
        return this.game_board[0][i];
      }
    }

    if(this.checkEqual(this.game_board[0][0], this.game_board[1][1], this.game_board[2][2])){
      // console.log("diag1" +this.game_board[0][0]);
      return this.game_board[0][0];
    }

    if(this.checkEqual(this.game_board[2][0], this.game_board[1][1], this.game_board[0][2])){
      // console.log("diag2" + this.game_board[2][0]);
      return this.game_board[2][0];
    }

    if(this.checkBoardStatus()){
      // console.log("tie");
      return -1;
    }else{
      return null;;
    }
  }

  checkBoardStatus() {
    for(var i = 0; i < this.size; i++){
      for(var j = 0; j < this.size; j++){
        if(this.game_board[i][j] == -1){
          return false;
        }
      }
    }
    // console.log("boardfull");
    return true;
  }
}
