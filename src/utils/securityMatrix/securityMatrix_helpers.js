/*
 * The Security Matrix Service Helpers file.
 * Methods which the Security Matrix Service uses internally live here.
 * - Use camel case for method names.
 * 
 * Follow this format for methods with single param:
 * export const NAME-OF-METHOD = params => {};
 * 
 * Follow this format for methods with multiple params:
 * export const NAME-OF-METHOD = (param1, param2) => {};
 */

import axios from 'axios';

export const post = (context, securityMatrixUrl) => {

  let data = JSON.stringify(context);
  let headers = {'Content-Type': 'application/json'}

  return axios({
    method: 'POST',
    url: securityMatrixUrl,
    data: data,
    cors: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    if (res.status < 200 || res.status > 302) {
      // This will handle any errors that aren't network related (network related errors are handled automatically)
      console.error('An error occurred while making a HTTP request: ', res.error);
      return Promise.reject(new Error(body.error.message));
    }
    return res.data;
  })
    .catch(err => {
      console.log(err);
      return err;
    });
}