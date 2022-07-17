const serveLoginForm = (req, res, next) => {
  if (req.session) {
    res.redirect('/start.html');
    return;
  }
  console.log('here', req.url);

  req.url = '/login.html';
  console.log('here', req.url);
  next();
};

module.exports = { serveLoginForm };
