class Game {
  #moves;
  #players;
  #id;
  lastPlayed;
  #maxPlayers;

  constructor(host, gameId = 1) {
    this.#players = [host];
    host.setSymbol('X');
    this.#id = gameId;
    this.#moves = Array(9).fill('');
    this.#maxPlayers = 2;
    this.lastPlayed = host;
  }

  getMoves() {
    return this.#moves.slice(0);
  }

  join(player) {
    if (this.#players.length < this.#maxPlayers) {
      this.#players.push(player);

      player.setSymbol('O');
      this.lastPlayed = player;
      return true;
    }
    return false;
  }

  switchPlayer() {
    const [player1, player2] = this.#players;
    this.currentPlayer = this.currentPlayer === player1 ? player2 : player1;
  }

  markMove(move) {
    this.currentPlayer.addMove(move);
    this.moves[move - 1] = this.currentPlayer.symbol;
  }

  isWon() {
    const moves = this.currentPlayer.moves;
    const winningMoves = ['123', '456', '789', '147', '258', '369', '159', '357'];
    const result = winningMoves.some(
      winMove => winMove.split('').every(move => moves.includes(move)));
    this.win = result ? this.currentPlayer.name : null;
  }

  isDraw() {
    this.draw = this.moves.length >= 9;
  }

  get status() {
    return {
      win: this.win,
      draw: this.draw,
      moves: this.moves,
      message: this.message
    };
  }

}

module.exports = { Game };
