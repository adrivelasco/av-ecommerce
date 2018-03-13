'use strict';

// Loading enviroment variables
require('dotenv').config();

// Babel register for read ES6
const fs = require('fs');
const babelrc = fs.readFileSync('./.babelrc');
let babelConfig;

try {
  babelConfig = JSON.parse(babelrc);
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-polyfill');
require('babel-register')(babelConfig);
require('babel-core').transform('code', babelConfig);

// Node.js listening middleware
const app = require('./app');
const config = require('./config');

app.listen(config.port, () =>
  console.log(`Nodejs server is running on PORT ${config.port} (${config.env})`)
);
