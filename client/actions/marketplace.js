import { PRODUCT_LIST } from '../constants';
import Marketplace from '../services/marketplace';

export const getMarketProducts = {
  fetch: () => {
    return dispatch => {
      dispatch({
        type: `${PRODUCT_LIST}_REQUEST`
      });
      return Marketplace.getProducts()
        .then(res => {
          dispatch({
            type: `${PRODUCT_LIST}_REJECTED`,
            results: res.data
          });
          return res;
        })
        .catch(err => {
          dispatch({
            type: `${PRODUCT_LIST}_REJECTED`,
            error: err
          });
          return err;
        });
    };
  },
  reset: () => dispatch => {
    dispatch({
      type: `${PRODUCT_LIST}`
    });
  }
};
