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
let host = 'http://localhost:';
let port = '8080';

if (authnUrl != undefined){
  host = authnUrl;
  port = authnPort
}

export const API = {
  LOGIN: host + port + '/authn/login',
};
