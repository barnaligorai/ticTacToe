const newLogin = (sessions) => (req, res, next) => {
  if (req.session) {
    res.redirect('/start.html');
  }

  const sessionId = sessions.add(req.body.username);
  res.cookie('sessionId', sessionId);
  res.redirect('/start.html');
};
exports.newLogin = newLogin;
