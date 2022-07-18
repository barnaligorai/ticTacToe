const { gamePage } = require('./gamePage.js');

const gameHandler = games => (req, res) => {
  if (!req.session) {
    res.redirect('/login');
    return;
  }

  const { gameId } = req.session;
  const game = games[gameId];
  const playerName = req.session.username;
  const message = 'Waiting for the other player to join...';
  const page = gamePage(playerName, gameId, message);
  res.end(page);
};

module.exports = { gameHandler };
