const serveJoinForm = (req, res) => {
  if (!req.session) {
    res.redirect('/login');
    return;
  }

  res.redirect('/join.html');
};

module.exports = { serveJoinForm };
