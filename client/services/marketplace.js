import request from '../utils/request';

const Marketplace = {
  getProducts: () => {
    return request('/api/marketplace/products');
  },

  getCart: () => {
    return request('/api/marketplace/cart');
  },

  removeProductFromCart: (product, quantity) => {
    return request(`/api/marketplace/products/${product._id}/remove-from-cart`, {
      method: 'PUT',
      body: {
        quantity,
        ...product
      }
    }); 
  },

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
