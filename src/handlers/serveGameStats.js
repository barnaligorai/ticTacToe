const serveGameStats = games => (req, res) => {
  if (!req.session) {
    res.redirect('/login');
  }

  const { gameId } = req.session;
  const game = games[gameId];

  res.json(game.stats());
};

module.exports = { serveGameStats };
