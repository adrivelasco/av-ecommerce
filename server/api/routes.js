'use strict';

const express = require('express');
const MarketPlaceController = require('./marketplace/marketplace.controller');

const router = express.Router();

// MarketPlace Controller
router.get('/marketplace/products', MarketPlaceController.getProducts);

module.exports = router;
