'use strict';

const rp = require('request-promise');
const config = require('../../config');

const MarketPlaceService = {
  /**
   * getProducts
   * @returns {Promise} resolve data products of marketplace or reject error
   * @description return data of all products
   */
  getProducts: async () => {
    try {
      const response = await rp({
        method: 'GET',
        uri: config.apiMarketPlace,
        json: true,
        resolveWithFullResponse: true
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

module.exports = MarketPlaceService;
