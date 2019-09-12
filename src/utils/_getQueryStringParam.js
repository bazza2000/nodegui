/*
 * Returns the Query string parameter based on name.
 */

export const _getQueryStringParam = (param, window) => {
  let result = window.location.search.split(param + "=")[1];
  if (result && result.indexOf("&") != -1) {
    return result = result.split("&")[0];
  } else {
    return result
  }
}