/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */

export const APP_CONSTANTS = {
  USERNAME : 'USERNAME',
  CHALLENGE : 'CHALLENGE',
  GRANTS : 'GRANTS',
  CHANNEL : 'CHANNEL',
  SET_AUTH : 'SET_AUTH',
  PROFILE : 'PROFILE',
  CURRENTLOCATION : 'CURRENTLOCATION',
  EXTENDEDTIMEOUT : 'EXTENDEDTIMEOUT',
  JOURNEY : 'JOURNEY',
  REMEMBERUSERNAME : 'REMEMBERUSERNAME'
};


export const SCA_PREFERENCE = {
  EMAIL_PREF: 'EMAIL',
  TEXT_PREF: 'PHONENUMBER',
  MOBILEAPP_PREF: 'MOBILE_APP',
  NONE_PREF: 'NONE'
};
