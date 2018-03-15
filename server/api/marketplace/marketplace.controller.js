'use strict';

const MarketPlaceModel = require('./marketplace.model');

const MarketPlaceController = {
  getProducts: async (req, res, next) => {
    try {
      const productList = await MarketPlaceModel.getProducts();
      res.json(productList);
    } catch (err) {
      next(err);
    }
  },

  getCart: (req, res, next) => {
    try {
      res.json({
        statusCode: 200,
        body: req.session.cart
      });
    } catch (err) {
      next(err);
    }
  },

  removeProductToCart: (req, res, next) => {
    try {
      // Delete product from session
      if (req.session.cart && req.session.cart.length > 0) {
        // TO-DO: Remove from cart
        console.log('Remove');
      } else {
        req.session.cart = [req.body];
      }
      res.json({
        statusCode: '200',
        body: {
          success: true
        }
      });
    } catch (err) {
      next(err);
    }
  },

  addProductToCart: (req, res, next) => {
    try {
      // Store product on session
      if (req.session.cart && req.session.cart.length > 0) {
        let productExists = req.session.cart.find(({ _id }) => req.body._id === _id);
        if (productExists) {
          productExists = productExists.quantity + req.body.quantity;
        } else {
          req.session.cart.push(req.body);
        }
      } else {
        req.session.cart = [req.body];
      }
      res.json({
        statusCode: '200',
        body: {
          success: true
        }
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = MarketPlaceController;
