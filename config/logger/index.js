const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'PBLogger',
  level: process.env.BUNYAN_LEVEL || 'info',
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'info',
      path: `${__dirname}/conversations.log`,
    },
  ],
});

module.exports = logger;
