const serveStartPage = (req, res, next) => {
  if (!req.session) {
    res.redirect('/login');
    return;
  }

  res.redirect('/start.html');
};

module.exports = { serveStartPage };
