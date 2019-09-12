/*
 * INDEX File.
 * - This component is the starting component.
 * 
 * - DO NOT CHANGE THIS.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import "@babel/polyfill";

import Main from './main';

import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('App')
);
