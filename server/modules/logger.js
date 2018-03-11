'use strict';

const { Logger, transports } = require('winston');

const logger = new (Logger)({
  transports: [
    new transports.Console({
      colorize: true
    })
  ],
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
