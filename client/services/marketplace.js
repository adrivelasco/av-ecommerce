import request from '../utils/request';

const Marketplace = {
  getProducts: () => {
    return request('/api/marketplace/products');
  }
};

export default Marketplace;
