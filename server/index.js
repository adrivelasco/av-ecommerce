'use strict';

// Loading enviroment variables
require('dotenv').config();

const app = require('./app');
const config = require('./config');
const fs = require('fs');

// Babel register
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

app.listen(config.port, () =>
  console.log(`Nodejs server is running on PORT ${config.port} (${config.env})`)
);
