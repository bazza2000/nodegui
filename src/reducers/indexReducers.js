/*
 * REDUCERS index file
 * - All reducer methods are pulled through this file.
 * - Use camel case for method names.
 */

import data from './update-reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  data
});