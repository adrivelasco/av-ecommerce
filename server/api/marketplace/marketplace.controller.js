'use strict';

const MarketPlaceModel = require('./marketplace.model');

const MarketPlaceController = {
  getProducts: async (req, res, next) => {
    // Get all products of marketplace
    try {
      const productList = await MarketPlaceModel.getProducts();
      res.json(productList);
    } catch (err) {
      next(err);
    }
  },

  getCart: (req, res, next) => {
    // Get all products of cart
    try {
      res.json({
        statusCode: 200,
        body: req.session.cart !== null
          ? req.session.cart
          : []
      });
    } catch (err) {
      next(err);
    }
  },

  removeProductToCart: (req, res, next) => {
    try {
      // Delete product from session
      if (req.session.cart && req.session.cart.length > 0) {
        req.session.cart = req.session.cart.filter(({ _id }) => req.body._id !== _id);
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
        // If product exists just increase quantity
        // else add the new product to cart
        if (productExists) {
          let newCart = req.session.cart.filter(({ _id }) => req.body._id !== _id);
          newCart.push(Object.assign({}, productExists, {
            quantity: productExists.quantity + req.body.quantity
          }));
          req.session.cart = newCart;
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
