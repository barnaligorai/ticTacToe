const logoutHandler = (sessions) =>
  (req, res, next) => {
    if (req.session) {
      sessions.delete(req.session.sessionId);
      res.clearCookie('sessionId');
    }

    res.redirect('/');
  };

module.exports = { logoutHandler };
