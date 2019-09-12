/*
 * Security Matrix Service Main file.
 * These are the main export and methods for the Security Matrix service.
 * - Use camel case for method names.
 * 
 * Follow this format for methods with single parameter:
 * YOUR-METHOD-NAME: param => {};
 * 
 * Follow this format for methods with multiple parameters:
 * YOUR-METHOD-NAME: (param1, param2) => {};
 */

import { post } from './securityMatrix_helpers';

import { API } from '../../constants/apiConstants';

export const securityMatrix = {

  // find scopes to bake into the token
  getScopes: context => {
    return post(context, API.SCOPES_URL);
  },

  // find minimum required auth strategy
  getAuthStrategy: context => {
    return post(context, API.TOKEN_POLICY);
  }

}