/*
 * NODE LOG SERVER Main file.
 * These are the main export and methods for the Messaging service.
 * - Use camel case for method names.
 * 
 * Follow this format for methods with single parameter:
 * YOUR-METHOD-NAME: param => {};
 * 
 * Follow this format for methods with multiple parameters:
 * YOUR-METHOD-NAME: (param1, param2) => {};
 */

import { API } from '../../constants/apiConstants';
import axios from 'axios';

const nodeLogServer = {
  // Log to node server
  log: context => {
    axios({
      method: 'POST',
      url: API.NODE_LOG_SERVER,
      data: JSON.stringify(context),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status == 200) {
          console.log("node server logged");
        }
      });
  }
}

export default nodeLogServer

