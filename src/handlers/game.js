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

  #isPosOccupied(pos) {
    return this.#moves[pos - 1] !== '';
  }

  updateMove(pos, playerName) {
    if (this.#isPosOccupied(pos)) {
      return 'Position occupied';
    }

    const currentPlayer = this.#players.find(({ name }) =>
      name === playerName);

    if (playerName !== this.lastPlayed.name) {
      this.#moves[pos - 1] = currentPlayer.symbol;
      currentPlayer.addMove(pos - 1);
      this.lastPlayed = currentPlayer;
      return 'Marked';
    }
    return 'Not your turn';
  }

  #isDrawn() {
    return !this.#moves.includes('');
  }

  #isWon() {
    const winningMoves = ['012', '345', '678', '036', '147', '258', '048', '246'];
    const moves = this.lastPlayed.getMoves();
    const result = winningMoves.includes(moves.join(''));
    return result ? this.lastPlayed.name : null;
  }

  stats() {
    const result = {
      isWon: this.#isWon(),
      isDrawn: this.#isDrawn(),
      moves: this.#moves.slice(0),
    }
    return result;
  }
}

module.exports = { Game };
