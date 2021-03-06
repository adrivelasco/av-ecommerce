'use strict';

const config = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3002,
  apiMarketPlace: 'https://api.myjson.com/bins/wyjyh',
  apiBasePath: '/',
  app: {
    title: 'AV eCommerce',
    description: 'Universal React App'
  }
};

module.exports = config;
