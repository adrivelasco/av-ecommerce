// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// Import root app
import App from './components/App';

import configureStore from './store/configureStore';
import history from './history';

const initialState = window.APP_STATE;
const store = configureStore(initialState, history);
const mountNode = document.getElementById('app');

// Rendering client side
ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  mountNode
);

// Easy-to-use library for eliminating the 300ms delay between a
// physical tap and the firing of a click event on mobile browsers
FastClick.attach(document.body);
