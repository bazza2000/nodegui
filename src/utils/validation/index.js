/*
 * Validation index file
 * - All validation methods are pulled through this file.
 * - Use camel case for method names.
 * 
 * Follow this format for methods with single parameter:
 * YOUR-METHOD-NAME: param => {};
 * 
 * Follow this format for methods with multiple parameters:
 * YOUR-METHOD-NAME: (param1, param2) => {};
 */

export const validation = {

  // required
  required: value => {
    if (value !== "" && value !== null && value !== undefined) {
      return false
    } else {
      return true
    }
  },
  // special characters
  specialCharacters: value => {
    const trueOrFalse = /^[a-zA-Z0-9~`!@#£*$%&()_+-=^,[\]\\{}:'"|.\/?]*$/.test(value);
    if ( trueOrFalse == true ) {
      return false
    } else {
      return true
    }
  },

  // Min characters
  minChar: (value, min) => {
    return value.length < min
  },

  maxChar: (value, max) => {
    return value.length > max
  },

  numbersOnly: value => {
    const trueOrFalse = /^[0-9]*$/.test(value);
    if ( trueOrFalse == true ) {
      return false
    } else {
      return true
    }
  },

  regCheckValidityOfAEmailString: (email, min, max) => {
    //var filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~])+)*))@((([a-z]|\d)|(([a-z]|\d)([a-z]|\d|-|\.)*([a-z]|\d)))\.)+(([a-z])|(([a-z])([a-z]|\d|-|\.)*([a-z])))$/i;
    const filter = /^(([^<>£¬()[\]\\.,;:\s@\"]+(\.[^<>£¬()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
    const emailValue = email;
    let isValidEmail=false;
    if (filter.test(emailValue) && emailValue.indexOf(' ') == -1 && emailValue.length >= min && emailValue.length <= max) {
      isValidEmail = false;
      //false = correct email structure
    } else {
      isValidEmail = true;
      //true = incorrect email structure
    }
    return isValidEmail;
    
  },
  // at least 8 characters and have at least 3 of these four options:
  // 1. one number
  // 2. one special character
  // 3. one lowercase character
  // 4. one uppercase character
  checkPasswordStrength: value => {
    const containsNumber = /^(?=.*?[0-9])/.test(value);
    const containsSpecialCharacter = /^(?=.*?[#?!@€£$%^&*-+=,.;:()~"'|{}])/.test(value);
    const containsAnUppercaseCharacter = /^(?=.*[A-Z])/.test(value);
    const containsALowercaseCharacter = /^(?=.*[a-z])/.test(value);

    let numberOfConditionsMet = 0;
  
    [containsNumber, containsSpecialCharacter, containsAnUppercaseCharacter, containsALowercaseCharacter].map(item => {
      if (item === true) { numberOfConditionsMet = numberOfConditionsMet + 1 };
    });

    if ( numberOfConditionsMet > 2 ) {
      return false
    } else {
      return true
    }

  },
  
  checkSecurityCodeStrength: value => {
    const trueOrFalse = /([0-9])\1+\1/.test(value)
    return trueOrFalse;
  },

}