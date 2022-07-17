const serveLoginForm = (req, res, next) => {
  if (req.session) {
    res.redirect('/start.html');
    return;
  }

  req.url = '/login.html';
  next();
};

module.exports = { serveLoginForm };
