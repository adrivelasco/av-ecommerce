'use strict';

const path = require('path');
const express = require('express');
const api = require('../api');

const router = express.Router();

// Static Files
router.use('/static', express.static(path.resolve(__dirname, '../../build/static')));

// API MarketPlace
router.get('/api', api);

// SSR Middleware
router.get('*', () => { });

module.exports = router;
