class Player {
  constructor(name) {
    this.name = name;
    this.moves = [];
  }

  getMove() {
    const [move] = this.moves.slice(-1);
    return move;
  }

  addMove(move) {
    return this.moves.push(move);
  }

  setSymbol(symbol) {
    this.symbol = symbol;
  }
}

module.exports = { Player };
