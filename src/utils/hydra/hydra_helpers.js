/*
 * The HYRDA Helpers file. 
 * Methods which hydra uses internally live here.
 * - Use camel case for method names.
 * 
 * Follow this format for methods with single param:
 * export const NAME-OF-METHOD = params => {};
 * 
 * Follow this format for methods with multiple params:
 * export const NAME-OF-METHOD = (param1, param2) => {};
 */

import axios from 'axios';
import { API, API_OPTIONS } from '../../constants/apiConstants';

export const get = (flow, challenge) => {

  console.log("calling hydra get flow " + flow + 'challenge ' + challenge);

  return axios({
    method: 'GET',
    url: API.HYRDA_URL + '/oauth2/auth/requests/' + flow + '/' + encodeURIComponent(challenge),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (res) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        console.error('An error occurred while making a HTTP request: ', res.error);
        return Promise.reject(new Error(body.error.message));
      }
      return res.data;
    })
    .catch(function (error) {
      return error
    });

}

// A little helper that takes type (can be "login" or "consent"), the action (can be "accept" or "reject") and a challenge and returns the response from ORY Hydra.
export const put = (flow, action, challenge, body) => {

  console.log("calling hydra put flow " + flow + 'action ' + action + 'challenge ' + challenge + 'body ' + body.toString());
  let data = JSON.stringify(body);
  return axios({
    method: 'PUT',
    url: API.HYRDA_URL + '/oauth2/auth/requests/' + flow + '/' + encodeURIComponent(challenge) + '/' + action,
    data: data
  })
    .then(function (res) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(function (body) {
          console.error('An error occurred while making a HTTP request: ', body);
          return Promise.reject(new Error(body.error.message))
        })
      }
      return res.data;
    })
    .catch(function (error) {
      return error
    });

}
