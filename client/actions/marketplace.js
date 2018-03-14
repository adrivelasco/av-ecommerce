import { PRODUCT_LIST, PRODUCT } from '../constants';
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
            type: `${PRODUCT_LIST}_SUCCESS`,
            results: res.body
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
      type: `${PRODUCT_LIST}_RESET`
    });
  }
};

export const getProductById = {
  fetch: ({ productId, productList }) => dispatch => {
    dispatch({
      type: `${PRODUCT}_REQUEST`
    });
    if (productList.length > 0) {
      return dispatch({
        type: `${PRODUCT}_SUCCESS`,
        results: productList.filter(({ _id }) => _id === productId)[0]
      });
    }
    return dispatch(getMarketProducts.fetch())
      .then(res => {
        dispatch({
          type: `${PRODUCT}_SUCCESS`,
          results: res.body.filter(({ _id }) => _id === productId)[0]
        });
        return res;
      })
      .catch(err => {
        dispatch({
          type: `${PRODUCT}_REJECTED`,
          error: err
        });
        return err;
      });
  },
  reset: () => dispatch => {
    dispatch({
      type: `${PRODUCT}_RESET`
    });
  }
};