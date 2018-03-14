'use strict';

const MarketPlaceService = require('./marketplace.service');

const MarketPlaceModel = {
  /**
   * getProducts
   * @returns {Object} List of products
   * @description Tranformed model and return service status code with the products
   */
  getProducts: async () => {
    try {
      const productList = await MarketPlaceService.getProducts();
      return {
        statusCode: productList.statusCode,
        body: productList.body
      };
    } catch (error) {
      error.statusCode = error.statusCode || 500;
      throw error;
    }
  }
};

module.exports = MarketPlaceModel;
