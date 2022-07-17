const { Game } = require('./game.js');
const { Player } = require('./player.js');

const hostHandler = games => {
  let gameId = 0;
  return (req, res) => {
    if (!req.session) {
      res.redirect('/login');
      return;
    }

    const { username } = req.session;
    const host = new Player(username);
    const game = new Game(host, gameId);

    req.session.gameId = gameId;

    games[gameId] = game;
    gameId++;

    res.redirect('/game');
    return;
  };
};

module.exports = { hostHandler };
