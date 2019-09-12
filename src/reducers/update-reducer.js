/*
 * Update Reducer file
 * - All update reducer methods are pulled through this file.
 * - Use camel case for method names.
 */

import initialState from '../utils/initialState';
import { APP_CONSTANTS } from '../constants/appConstants';

// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

export default function data(prevState = initialState, action) {

  switch (action.type) {
  case APP_CONSTANTS.USERNAME:
    return assign({}, prevState, {
      userName: action.newState
    });
    break;
  case APP_CONSTANTS.CHALLENGE:
    return assign({}, prevState, {
      challenge: action.newState
    });
  case APP_CONSTANTS.CHANNEL:
    return assign({}, prevState, {
      channel: action.newState
    });
  case APP_CONSTANTS.GRANTS:
    return assign({}, prevState, {
      grants: action.newState
    });
  case APP_CONSTANTS.PROFILE:
    return assign({}, prevState, {
      profile: action.newState
    });
  case APP_CONSTANTS.CURRENTLOCATION:
    return assign({}, prevState, {
      currentLocation: action.newState
    });
    break;
  case APP_CONSTANTS.EXTENDEDTIMEOUT:
    return assign({}, prevState, {
      extendedTimeout: action.newState
    });
    break;
  case APP_CONSTANTS.DEVICE_DETAILS:
    return assign({}, prevState, {
      deviceDetails: action.newState
    });
    break;
  case APP_CONSTANTS.SET_AUTH:
    return assign({}, prevState, {
      authStrategy: action.newState
    });
    break;
  case APP_CONSTANTS.JOURNEY:
    return assign({},prevState,{
      journey: action.newState
    });
    break;
  case APP_CONSTANTS.REMEMBERUSERNAME:
    return assign({},prevState,{
      rememberUsername: action.newState
    });
    break;  

  default:
    return prevState;
  }

}