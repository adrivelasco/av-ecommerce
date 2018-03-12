'use strict';

const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ colorize: true })
  ]
});

winston.addColors({
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
});

module.exports = logger;
