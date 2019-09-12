import React from 'react';
import { createStore, combineReducers } from 'redux';
import reducer from '../reducers/indexReducers.js';

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);