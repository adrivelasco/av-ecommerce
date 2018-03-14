'use strict';

const path = require('path');
const express = require('express');
const serverSideRender = require('../core/serverSideRender');

const router = express.Router();

// Static Files
router.use('/static', express.static(path.resolve(__dirname, '../../build/static')));

// SSR Middleware
router.get('*', serverSideRender);

module.exports = router;
