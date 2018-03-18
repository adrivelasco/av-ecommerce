import request from '../utils/request';

/** Marketplace Client Service */
const Marketplace = {
  /**
   * Get products of marketplace
   * @return {object} Products
   */
  getProducts: () => {
    return request('/api/marketplace/products');
  },

  /**
   * Get products added to Cart
   * @return {object} Products added to Cart
   */
  getCart: () => {
    return request('/api/marketplace/cart');
  },

  /**
   * Remove a product from cart
   * @param {object} product - Product data
   * @param {number} quantity - Units to remove
   * @return {object} Succesfull message
   */
  removeProductFromCart: (product, quantity) => {
    return request(`/api/marketplace/products/${product._id}/remove-from-cart`, {
      method: 'PUT',
      body: {
        quantity,
        ...product
      }
    });
  },

  /**
   * Add a product to cart
   * @param {object}  product - Product data
   * @param {number}  quantity - Units to remove
   * @return {object} Succesfull message
   */
  addProductToCart: (product, quantity) => {
    return request(`/api/marketplace/products/${product._id}/add-to-cart`, {
      method: 'POST',
      body: {
        quantity,
        ...product
      }
    });
  }
};

export default Marketplace;
