const { Player } = require("./player");

const isGamePresent = (games, id) => {
  return games[id] ? true : false;
};

const joinHandler = games => (req, res, next) => {
  if (!req.session) {
    res.redirect('/login');
  }

  const gameId = req.body['gameId'];

  if (!isGamePresent(games, gameId)) {
    res.status(404);
    res.json({ message: 'Game doesn\'t exist.' });
    return;
  }

  const game = games[gameId];
  const player = new Player(req.session.username);
  const result = game.join(player);

  if (!result) {
    res.json({ message: 'This room is full' });
    return;
  }

  req.session.gameId = gameId;
  res.redirect('/game');
};

module.exports = { joinHandler };
