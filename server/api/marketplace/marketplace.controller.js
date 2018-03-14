'use strict';

const MarketPlaceModel = require('./marketplace.model');

const MarketPlaceController = {
  getProducts: async (req, res, next) => {
    console.log('asdsad');
    try {
      const productList = await MarketPlaceModel.getProducts();
      res.json(productList);
    } catch (e) {
      next(e);
    }
  }
};

module.exports = MarketPlaceController;
