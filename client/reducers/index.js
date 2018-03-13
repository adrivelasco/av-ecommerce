import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import marketplaceReducer from './marketplace';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default combineReducers({

  // MarketPlace Reducer
  marketplace: marketplaceReducer,

  // React-Router-Redux
  routing: routerReducer

});
