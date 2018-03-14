'use strict';

const express = require('express');
const httpStatus = require('http-status');
const routes = require('./routes');
const logger = require('../modules/logger');

const api = express.Router();

// Mounting API Routes
api.use('/', routes);

// Error Handler
api.use((error, req, res, next) => {
  logger.error(`Status Code: ${error.statusCode || httpStatus.INTERNAL_SERVER_ERROR}` +
  ` || Message: ${error.message}`);
  res.send('ERROR');
});

module.exports = api;
