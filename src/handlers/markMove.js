const markMove = (games) => (req, res) => {
  if (!req.session) {
    response.redirect('/login');
    return;
  }

  const { gameId, username } = req.session;
  const { pos } = req.body;
  const game = games[gameId];
  const result = game.updateMove(pos, username);
  res.json({ result });
};

module.exports = { markMove };
