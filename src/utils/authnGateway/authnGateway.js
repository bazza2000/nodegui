/*
 * AUTHN Gateway Main file.
 * These are the main export and methods for Hyrda.
 * - Use camel case for method names.
 *
 * Follow this format for methods with single parameter:
 * YOUR-METHOD-NAME: param => {};
 *
 * Follow this format for methods with multiple parameters:
 * YOUR-METHOD-NAME: (param1, param2) => {};
 */

import { post } from '../authnGateway/authnGateway_helpers';
import { API } from '../../constants/apiConstants';

const authnGateway = {

  login: data => {
    return post(API.LOGIN, data);
  },


};

export default authnGateway
