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
      this.lastPlayed = currentPlayer;
      return 'Marked';
    }
    return 'Not your turn';
  }
}

module.exports = { Game };
