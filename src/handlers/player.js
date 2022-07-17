class Player {
  constructor(name) {
    this.name = name;
    this.moves = [];
  }

  getMoves() {
    return this.moves.slice(0).sort();
  }

  addMove(move) {
    return this.moves.push(move);
  }

  setSymbol(symbol) {
    this.symbol = symbol;
  }
}

module.exports = { Player };
