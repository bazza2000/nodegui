import * as _commonMethods from '../../src/utils/_commonMethods';
import { ROUTE_PATH_NAME } from '../../src/constants/routeConstants';

// test '_getRedirectUrl' method
it('should return "ResetPassword"', () => {
  expect(_commonMethods._getRedirectUrl('forgot-password')).toEqual(ROUTE_PATH_NAME.RESETPASSWORD);
});
it('should return "RESETSECURITYCODE"', () => {
    expect(_commonMethods._getRedirectUrl('forgot-security-code')).toEqual(ROUTE_PATH_NAME.RESETSECURITYCODE);
});
it('should return "RESETBOTHSECURITYDETAILS"', () => {
    expect(_commonMethods._getRedirectUrl('forgot-both-credential')).toEqual(ROUTE_PATH_NAME.RESETBOTHSECURITYDETAILS);
});
it('should return "SOFTTOKENSUCCESSFUL"', () => {
    expect(_commonMethods._getRedirectUrl('login')).toEqual(ROUTE_PATH_NAME.SOFTTOKENSUCCESSFUL);
});

// test '_utagDataByPage' method
it('should return "UTAGDATA ENTERUSERNAME"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.ENTERUSERNAME.substr(1), page_title:'Log in'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.ENTERUSERNAME)).toEqual(utagData);
});
it('should return "UTAGDATA PROFILEDETAILS"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.PROFILEDETAILS.substr(1), page_title:'Log in'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.PROFILEDETAILS)).toEqual(utagData);
});
it('should return "UTAGDATA SECURITYVERIFICATIONCODEMETHOD"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.SECURITYVERIFICATIONCODEMETHOD.substr(1), page_title:"Verify it's you"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.SECURITYVERIFICATIONCODEMETHOD)).toEqual(utagData);
});
it('should return "UTAGDATA VERIFYCODE"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.VERIFYCODE.substr(1), page_title:"Verify it's you"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.VERIFYCODE)).toEqual(utagData);
});
it('should return "UTAGDATA SECURITYINFORMATION"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.SECURITYINFORMATION.substr(1), page_title:'How you verify yourself has changed'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.SECURITYINFORMATION)).toEqual(utagData);
});
it('should return "UTAGDATA DECLINEDNOTIFICATION"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.DECLINEDNOTIFICATION.substr(1), page_title:'You declined verification'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.DECLINEDNOTIFICATION)).toEqual(utagData);
});
it('should return "UTAGDATA WECOULDNOTLOGYOUIN"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN.substr(1), page_title:"We couldn't verify it's you"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.WECOULDNOTLOGYOUIN)).toEqual(utagData);
});

it('should return "UTAGDATA SOFTTOKENVERIFICATIONCODEMETHOD"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.SOFTTOKENVERIFICATIONCODEMETHOD.substr(1), page_title:'How you verify yourself has changed'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.SOFTTOKENVERIFICATIONCODEMETHOD)).toEqual(utagData);
});
it('should return "UTAGDATA WEHAVESENTYOUANOTIFICATION"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.WEHAVESENTYOUANOTIFICATION.substr(1), page_title:"Verify it's you"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.WEHAVESENTYOUANOTIFICATION)).toEqual(utagData);
});
it('should return "UTAGDATA CHANGEVERIFICATIONMETHOD"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.CHANGEVERIFICATIONMETHOD.substr(1), page_title:"Verify it's you"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.CHANGEVERIFICATIONMETHOD)).toEqual(utagData);
});
it('should return "UTAGDATA NEWSECURITYDETAILSCREATED"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED.substr(1), page_title:'New Security Details Created'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.NEWSECURITYDETAILSCREATED)).toEqual(utagData);
});
it('should return "UTAGDATA WHICHDETAILSDOYOUNEEDTORESET"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.WHICHDETAILSDOYOUNEEDTORESET.substr(1), page_title:'Forgotten password/security code'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.WHICHDETAILSDOYOUNEEDTORESET)).toEqual(utagData);
});
it('should return "UTAGDATA FORGOTTENBOTHSECURITYDETAILS"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.FORGOTTENBOTHSECURITYDETAILS.substr(1), page_title:"We need to verify it's you"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.FORGOTTENBOTHSECURITYDETAILS)).toEqual(utagData);
});
it('should return "UTAGDATA FORGOTPASSWORD"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.FORGOTPASSWORD.substr(1), page_title:'Forgotten password'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.FORGOTPASSWORD)).toEqual(utagData);
});
it('should return "UTAGDATA FORGOTSECURITYCODE"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.FORGOTSECURITYCODE.substr(1), page_title:'Forgotten security code'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.FORGOTSECURITYCODE)).toEqual(utagData);
});
it('should return "UTAGDATA RESETPASSWORD"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.RESETPASSWORD.substr(1), page_title:'Reset password'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.RESETPASSWORD)).toEqual(utagData);
});
it('should return "UTAGDATA RESETSECURITYCODE"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.RESETSECURITYCODE.substr(1), page_title:'Reset security code'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.RESETSECURITYCODE)).toEqual(utagData);
});
it('should return "UTAGDATA SOFTTOKENSUCCESSFUL"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.SOFTTOKENSUCCESSFUL.substr(1), page_title:"Login Successfully"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.SOFTTOKENSUCCESSFUL)).toEqual(utagData);
});
it('should return "UTAGDATA CONSENT"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.CONSENT.substr(1), page_title:"Verification"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.CONSENT)).toEqual(utagData);
});
it('should return "UTAGDATA RESETBOTHSECURITYDETAILS"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.RESETBOTHSECURITYDETAILS.substr(1), page_title:'Reset security details'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.RESETBOTHSECURITYDETAILS)).toEqual(utagData);
});
it('should return "UTAGDATA CHANGEDEFAULTPREFERENCE"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.CHANGEDEFAULTPREFERENCE.substr(1), page_title:'Change how you verify yourself'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.CHANGEDEFAULTPREFERENCE)).toEqual(utagData);
});
it('should return "UTAGDATA MANAGEYOURDEVICE"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.MANAGEYOURDEVICE.substr(1), page_title:"Your devices"};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.MANAGEYOURDEVICE)).toEqual(utagData);
});
it('should return "UTAGDATA FORGOTUSERNAME"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.FORGOTUSERNAME.substr(1), page_title:'Forgotten your username?'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.FORGOTUSERNAME)).toEqual(utagData);
});
it('should return "UTAGDATA ERRORPAGE"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.ERRORPAGE.substr(1), page_title:'Error Page'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.ERRORPAGE)).toEqual(utagData);
});
it('should return "UTAGDATA FORGOTUSERNAMESUCCESS"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.FORGOTUSERNAMESUCCESS.substr(1), page_title:'Username reminder sent'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.FORGOTUSERNAMESUCCESS)).toEqual(utagData);
});
it('should return "UTAGDATA ONETIMEPASSWORD"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.ONETIMEPASSWORD.substr(1), page_title:'Enter the one-time password we emailed you'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.ONETIMEPASSWORD)).toEqual(utagData);
});
it('should return "UTAGDATA ONETIMEPASSWORDEXPIRE"', () => {
    let utagData = {page_name:ROUTE_PATH_NAME.ONETIMEPASSWORDEXPIRE.substr(1), page_title:'Your one-time password has expired'};
    expect(_commonMethods._utagDataByPage(ROUTE_PATH_NAME.ONETIMEPASSWORDEXPIRE)).toEqual(utagData);
});
