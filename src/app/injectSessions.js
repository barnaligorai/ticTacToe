const injectSession = sessions =>
  (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
      req.session = sessions.get(sessionId);
    }

    next();
  };

module.exports = { injectSession };
