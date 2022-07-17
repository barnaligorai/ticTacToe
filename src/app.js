const cookieParser = require('cookie-parser');
const express = require('express');
const { injectSession } = require('./app/injectSessions.js');
const { Sessions } = require('./sessions.js');
const { serveStartPage } = require('./handlers/serveStartPage');
const { serveLoginForm } = require('./handlers/serveLoginForm.js');
const { newLogin } = require('./handlers/newLogin.js');
const { logoutHandler } = require('./handlers/logout.js');

const logRequest = (logger) =>
  (req, res, next) => {
    logger(req.method, req.url);
    next();
  };

const defaultConfig = {
  sourceDir: './public'
};

const createApp = (config = defaultConfig, logger) => {
  const app = express();
  const { sourceDir } = config;
  const sessions = new Sessions();

  app.use(logRequest(logger));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(injectSession(sessions));

  app.get('/play', serveStartPage);
  app.get('/login*', serveLoginForm);
  app.post('/login', newLogin(sessions));
  app.get('/logout', logoutHandler(sessions));

  app.use(express.static(sourceDir));
  return app;
};

module.exports = { createApp };
