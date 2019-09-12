/*
 * COOKIES Main file.
 *
 * - Use camel case for method names.
 * 
 * Follow this format for methods with single parameter:
 * YOUR-METHOD-NAME: param => {};
 * 
 * Follow this format for methods with multiple parameters:
 * YOUR-METHOD-NAME: (param1, param2) => {};
 */

const cookie = {

  set: username => {
    document.cookie = "customerUsername="+username+"; expires="+expiryDate();
  },

  read: cookieName => {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

}

const expiryDate = () => {
  let d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d;
}

export default cookie;