/*
 * CommonConstants
 * These are the variables which we want to use commonly in app
 *
 * Follow this format:
 * export const YOUR_CONSTANT : 'Your message text';
 */

import { ROUTE_PATH_NAME } from '../constants/routeConstants';

export const ValidationRules = {
  'MinPasswordLength' : 8,
  'MaxPasswordLength' : 20,
  'MinSecurityCodeLength' : 6,
  'MaxSecurityCodeLength' : 6,
  'EmailAddressMaxLength': 70,
  'EmailAddressMinLength': 6,
  'MaxOTPLength':10,
  'MinOTPLength':10
}

export const journeyConstants = {
  'ForgotPassword' : 'forgot-password',
  'ForgotSecurityCode' : 'forgot-security-code',
  'ForgotBothCredentials' : 'forgot-both-credential',
  'Login' : 'login'
}

export const CommonLabels = {
  SUCCESS : 'Success',
  ERROR : 'Error',
  CHANGE_DEFAULT_PREFERENCE_ACCESSIBILTY_LBL :{
    TEXT: 'Select to change default preference to recieve a verification code by text',
    EMAIL: 'Select to change default preference to recieve a verification code by email',
    MOBILEAPP: 'Select to change default preference to verify with the mobile app'
  },
  DEFAULT_PREFERENCE_ACCESSIBILTY_LBL :{
    TEXT: 'Select to receive a verification code by text',
    EMAIL: 'Select to receive a verification code by email',
    MOBILEAPP: 'Select to verify with the mobile app'
  }

}

export const pinValuesArr = [...Array(10).keys()].map(val => {
  return {value:val, label:val};
});

export const noBackButtonPageArray = [
  ROUTE_PATH_NAME.ENTERUSERNAME,
  ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED,
  ROUTE_PATH_NAME.RESETBOTHSECURITYDETAILS,
  ROUTE_PATH_NAME.RESETPASSWORD,
  ROUTE_PATH_NAME.RESETSECURITYCODE,
  ROUTE_PATH_NAME.ERRORPAGE,
  ROUTE_PATH_NAME.FORGOTUSERNAMESUCCESS,
  ROUTE_PATH_NAME.ONETIMEPASSWORDEXPIRE
]