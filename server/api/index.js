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
  const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const errorMsg = error.message;

  logger.error(`Status Code: ${statusCode} || Message: ${errorMsg}`);
  res.send({ statusCode, error: errorMsg });
});

module.exports = api;
