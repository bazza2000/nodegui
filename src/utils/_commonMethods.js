/*
 * Get Redirect Url on OTP success validation for respective journey
 */
import { ROUTE_PATH_NAME } from '../constants/routeConstants';
import { journeyConstants } from '../constants/commonConstants';

export const _getRedirectUrl = journey => {
  let journeyName = '';
  switch (journey) {

  case journeyConstants.ForgotPassword:
    journeyName = ROUTE_PATH_NAME.RESETPASSWORD
    break;

  case journeyConstants.ForgotSecurityCode:
    journeyName = ROUTE_PATH_NAME.RESETSECURITYCODE
    break;

  case journeyConstants.ForgotBothCredentials:
    journeyName = ROUTE_PATH_NAME.RESETBOTHSECURITYDETAILS
    break;

  case journeyConstants.Login:
    journeyName = ROUTE_PATH_NAME.SOFTTOKENSUCCESSFUL
    break;

  default:
  }
  return journeyName;
}
export const _utagDataByPage = location => {
  let utagData = {page_name:'', page_title:''};
  switch (location) {

  case ROUTE_PATH_NAME.ENTERUSERNAME:
    utagData.page_name = ROUTE_PATH_NAME.ENTERUSERNAME.substr(1);
    utagData.page_title = 'Log in';
    break;
  
  case ROUTE_PATH_NAME.ENTERSECURITYDETAILS:
    utagData.page_name = ROUTE_PATH_NAME.ENTERSECURITYDETAILS.substr(1);
    utagData.page_title = 'Log in';
    break;
  case ROUTE_PATH_NAME.SECURITYVERIFICATIONCODEMETHOD:
    utagData.page_name = ROUTE_PATH_NAME.SECURITYVERIFICATIONCODEMETHOD.substr(1);
    utagData.page_title = "Verify it's you";
    break;
  case ROUTE_PATH_NAME.VERIFYCODE:
    utagData.page_name = ROUTE_PATH_NAME.VERIFYCODE.substr(1);
    utagData.page_title = "Verify it's you";
    break;
  case ROUTE_PATH_NAME.SECURITYINFORMATION:
    utagData.page_name = ROUTE_PATH_NAME.SECURITYINFORMATION.substr(1);
    utagData.page_title = 'How you verify yourself has changed';
    break;
  
  case ROUTE_PATH_NAME.DECLINEDNOTIFICATION:
    utagData.page_name = ROUTE_PATH_NAME.DECLINEDNOTIFICATION.substr(1);
    utagData.page_title = 'You declined verification';
    break;
  case ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN:
    utagData.page_name = ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN.substr(1);
    utagData.page_title = "We couldn't verify it's you";
    break;
  case ROUTE_PATH_NAME.SOFTTOKENVERIFICATIONCODEMETHOD:
    utagData.page_name = ROUTE_PATH_NAME.SOFTTOKENVERIFICATIONCODEMETHOD.substr(1);
    utagData.page_title = 'How you verify yourself has changed';
    break;
  case ROUTE_PATH_NAME.WEHAVESENTYOUANOTIFICATION:
    utagData.page_name = ROUTE_PATH_NAME.WEHAVESENTYOUANOTIFICATION.substr(1);
    utagData.page_title = "Verify it's you";
    break;
  
  case ROUTE_PATH_NAME.CHANGEVERIFICATIONMETHOD:
    utagData.page_name = ROUTE_PATH_NAME.CHANGEVERIFICATIONMETHOD.substr(1);
    utagData.page_title = "Verify it's you";
    break;
  case ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED:
    utagData.page_name = ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED.substr(1);
    utagData.page_title = 'New Security Details Created';
    break;
  case ROUTE_PATH_NAME.WHICHDETAILSDOYOUNEEDTORESET:
    utagData.page_name = ROUTE_PATH_NAME.WHICHDETAILSDOYOUNEEDTORESET.substr(1);
    utagData.page_title = 'Forgotten password/security code';
    break;
  case ROUTE_PATH_NAME.FORGOTTENBOTHSECURITYDETAILS:
    utagData.page_name = ROUTE_PATH_NAME.FORGOTTENBOTHSECURITYDETAILS.substr(1);
    utagData.page_title = "We need to verify it's you";
    break;
  
  case ROUTE_PATH_NAME.FORGOTPASSWORD:
    utagData.page_name = ROUTE_PATH_NAME.FORGOTPASSWORD.substr(1);
    utagData.page_title = 'Forgotten password';
    break;
  case ROUTE_PATH_NAME.FORGOTSECURITYCODE:
    utagData.page_name = ROUTE_PATH_NAME.FORGOTSECURITYCODE.substr(1);
    utagData.page_title = 'Forgotten security code';
    break;
  case ROUTE_PATH_NAME.RESETPASSWORD:
    utagData.page_name = ROUTE_PATH_NAME.RESETPASSWORD.substr(1);
    utagData.page_title = 'Reset password';
    break;
  case ROUTE_PATH_NAME.RESETSECURITYCODE:
    utagData.page_name = ROUTE_PATH_NAME.RESETSECURITYCODE.substr(1);
    utagData.page_title = 'Reset security code';
    break;
    
  case ROUTE_PATH_NAME.SOFTTOKENSUCCESSFUL:
    utagData.page_name = ROUTE_PATH_NAME.SOFTTOKENSUCCESSFUL.substr(1);
    utagData.page_title = 'Login Successfully';
    break;

  case ROUTE_PATH_NAME.CONSENT:
    utagData.page_name = ROUTE_PATH_NAME.CONSENT.substr(1);
    utagData.page_title = 'Verification';
    break;

  case ROUTE_PATH_NAME.RESETBOTHSECURITYDETAILS:
    utagData.page_name = ROUTE_PATH_NAME.RESETBOTHSECURITYDETAILS.substr(1);
    utagData.page_title = 'Reset security details';
    break;
  case ROUTE_PATH_NAME.CHANGEDEFAULTPREFERENCE:
    utagData.page_name = ROUTE_PATH_NAME.CHANGEDEFAULTPREFERENCE.substr(1);
    utagData.page_title = 'Change how you verify yourself';
    break;
  
  case ROUTE_PATH_NAME.MANAGEYOURDEVICE:
    utagData.page_name = ROUTE_PATH_NAME.MANAGEYOURDEVICE.substr(1);
    utagData.page_title = 'Your devices';
    break;
  case ROUTE_PATH_NAME.FORGOTUSERNAME:
    utagData.page_name = ROUTE_PATH_NAME.FORGOTUSERNAME.substr(1);
    utagData.page_title = 'Forgotten your username?';
    break;
  case ROUTE_PATH_NAME.ERRORPAGE:
    utagData.page_name = ROUTE_PATH_NAME.ERRORPAGE.substr(1);
    utagData.page_title = 'Error Page';
    break;
  case ROUTE_PATH_NAME.FORGOTUSERNAMESUCCESS:
    utagData.page_name = ROUTE_PATH_NAME.FORGOTUSERNAMESUCCESS.substr(1);
    utagData.page_title = 'Username reminder sent';
    break;
  
  case ROUTE_PATH_NAME.ONETIMEPASSWORD:
    utagData.page_name = ROUTE_PATH_NAME.ONETIMEPASSWORD.substr(1);
    utagData.page_title = 'Enter the one-time password we emailed you';
    break;
  case ROUTE_PATH_NAME.ONETIMEPASSWORDEXPIRE:
    utagData.page_name = ROUTE_PATH_NAME.ONETIMEPASSWORDEXPIRE.substr(1);
    utagData.page_title = 'Your one-time password has expired';
    break;
  
  default:
  }
  return utagData;
}

export const _generateRandomString = () => {
  let str = Date.now().toString(36);
  for(str; str.length < 16;) {
    str += Math.random().toString(36).substr(2, 1);
  }
  return str;
}