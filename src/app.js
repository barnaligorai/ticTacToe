const cookieParser = require('cookie-parser');
const express = require('express');
const { injectSession } = require('./app/injectSessions.js');
const { Sessions } = require('./sessions.js');
const { serveStartPage } = require('./handlers/serveStartPage');
const { serveLoginForm } = require('./handlers/serveLoginForm.js');
const { newLogin } = require('./handlers/newLogin.js');
const { logoutHandler } = require('./handlers/logout.js');
const { hostHandler } = require('./handlers/hostHandler.js');
const { gameHandler } = require('./handlers/gameHandler.js');
const { serveJoinForm } = require('./handlers/serveJoinForm.js');
const { joinHandler } = require('./handlers/joinHandler.js');
const { markMove } = require('./handlers/markMove.js');
const { serveGameStats } = require('./handlers/serveGameStats.js');

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
  const games = {};

  app.use(logRequest(logger));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(injectSession(sessions));

  app.get('/play', serveStartPage);
  app.get('/login*', serveLoginForm);
  app.post('/login', newLogin(sessions));
  app.get('/logout', logoutHandler(sessions));

  app.get('/host', hostHandler(games));
  app.get('/game', gameHandler(games));

  app.get('/join', serveJoinForm);
  app.post('/join-game', joinHandler(games));

  app.post('/mark-move', markMove(games));
  app.get('/game/stats', serveGameStats(games));

  app.use(express.static(sourceDir));
  return app;
};

module.exports = { createApp };
