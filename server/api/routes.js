'use strict';

const express = require('express');
const MarketPlaceController = require('./marketplace/marketplace.controller');

const router = express.Router();

// MarketPlace Controller
router.get('/marketplace/products', MarketPlaceController.getProducts);
router.get('/marketplace/cart', MarketPlaceController.getCart);
router.post('/marketplace/products/:productId/add-to-cart', MarketPlaceController.addProductToCart);
router.put('/marketplace/products/:productId/remove-from-cart', MarketPlaceController.removeProductToCart);

module.exports = router;
