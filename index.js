const { createApp } = require('./src/app.js');

const startServer = (PORT) => {
  const config = { sourceDir: './public' };
  const app = createApp(config, console.log);
  app.listen(PORT, () => { console.log(`Server listening on ${PORT}`) });
};

startServer(4444);
