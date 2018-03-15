import request from '../utils/request';

const Marketplace = {
  getProducts: () => {
    return request('/api/marketplace/products');
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
