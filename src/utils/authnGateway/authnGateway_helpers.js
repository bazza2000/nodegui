/*
 * The AUTHN GATEWAY Helpers file.
 * Methods which the AUTHN GATEWAY uses internally live here.
 * - Use camel case for method names.
 *
 * Follow this format for methods with single param:
 * export const NAME-OF-METHOD = params => {};
 *
 * Follow this format for methods with multiple params:
 * export const NAME-OF-METHOD = (param1, param2) => {};
 */

import axios from 'axios';
import { API_OPTIONS } from '../../constants/apiConstants';


export const get = endpoint => {

  return axios({
    method: 'GET',
    url: endpoint,
    headers: API_OPTIONS.headers
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

export const post = (endpoint, body) => {
  let data = JSON.stringify(body);
  let headers = API_OPTIONS.headers;
  headers.clientHeaders = `{"correlationId":"${body.journeyId}","customerJourneyId":"1234","requestId":"XXXXXXXXX"}`;
  return axios({
    method: 'POST',
    url: endpoint,
    data: data,
    headers
  })
    .then(function (res) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return res.json().then(function (body) {
          console.error('An error occurred while making a HTTP request: ', body);
          return Promise.reject(new Error(body.error.message))
        })
      } else if(res.data) {
        return res.data;
      } else {
        throw error;
      }
    })
    .catch(function (error) {
      throw error;
    });
}
