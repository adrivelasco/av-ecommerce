'use strict';

const express = require('express');
const history = require('connect-history-api-fallback');
const compression = require('compression');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sanitized = require('express-sanitized');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('../config');
const api = require('../api');

// Initializing Express App
const app = express();

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

if (config.env === 'development') {
  app.use(morgan('dev'));
  app.enable('trust proxy');
}

// Register Node.js middleware
app.disable('x-powered-by');
app.use(cookieParser());
app.use(sanitized());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// User session
app.use(
  session({
    name: 'session',
    secret: '4V3C0MM3RC3',
    resave: false,
    saveUninitialized: true,
    secure: true,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000 * 5
    }
  })
);

// API MarketPlace
app.use('/api', api);

// Fallback
app.use(history());

// Routing
app.use(routes);

module.exports = app;
