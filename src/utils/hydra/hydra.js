/*
 * HYRDA Main file.
 * These are the main export and methods for Hyrda.
 * - Use camel case for method names.
 * 
 * Follow this format for methods with single parameter:
 * YOUR-METHOD-NAME: param => {};
 * 
 * Follow this format for methods with multiple parameters:
 * YOUR-METHOD-NAME: (param1, param2) => {};
 */

import { get, put } from '../hydra/hydra_helpers';

const hydra = {
  // Fetches information on a login request.
  getLoginRequest: challenge => {
    return get('login', challenge);
  },
  // Accepts a login request.
  acceptLoginRequest: (challenge, body) => {
    return put('login', 'accept', challenge, body);
  },
  // Rejects a login request.
  rejectLoginRequest: (challenge, body) => {
    return put('login', 'reject', challenge, body);
  },
  // Fetches information on a consent request.
  getConsentRequest: challenge => {
    return get('consent', challenge);
  },
  // Accepts a consent request.
  acceptConsentRequest: (challenge, body) => {
    return put('consent', 'accept', challenge, body);
  },
  // Rejects a consent request.
  rejectConsentRequest: (challenge, body) => {
    return put('consent', 'reject', challenge, body);
  }
};

export default hydra