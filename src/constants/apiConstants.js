/*
 * AppAPIs
 * These are the variables that determine what our central API URL's
 * When you add a new API URL, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_API_CONSTANT = 'YOUR_API_CONSTANT';
 */
// for Stub Data only
export const API_OPTIONS = {
  'headers': {
    'Content-Type': 'application/json'
  }
};


export const API = {
  LOGIN: authnUrl + authnPort + '/demo/login',

};
