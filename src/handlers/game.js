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
}

module.exports = { Game };
