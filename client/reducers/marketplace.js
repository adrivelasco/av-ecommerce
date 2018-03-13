import { PRODUCT_LIST } from '../constants';

const initialState = {
  isFetching: false,
  success: false,
  rejected: false,
  results: null
};

function getProducts(state = initialState, action) {
  switch (action.type) {
    case `${PRODUCT_LIST}_REQUEST`:
      return Object.assign({}, state, {
        isFetching: true
      });
    case `${PRODUCT_LIST}_SUCCESS`:
      return Object.assign({}, state, {
        isFetching: false,
        results: action.results,
        success: true
      });
    case `${PRODUCT_LIST}_REJECTED`:
      return Object.assign({}, state, {
        isFetching: false,
        rejected: true
      });
    case `${PRODUCT_LIST}_RESET`:
      return initialState;
    default:
      return state;
  }
}

export default function marketplaceReducer(state = {}, action) {
  return {
    products: getProducts(state.products, action),
    cart: null
  };
};
