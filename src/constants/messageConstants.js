/*
 * MessageConstants
 * These are the variables that contain the text which is displayed on certain errors
 *
 * Follow this format:
 * export const YOUR_CONSTANT : 'Your message text';
 */

import React from 'react';
import { ROUTE_PATH_NAME } from './routeConstants';
import { Link } from 'react-router-dom';

export const err = {
  FIELD_MISSING : 'Please fill out the entire form.',
  WRONG_PASSWORD : 'Wrong pinPositions.',
  USER_NOT_FOUND : 'This password does not exist.',
  GENERAL_ERROR : 'Something went wrong, please try again',
  USERNAME_REQUIRED : 'Please enter a valid username',
  PASSWORD_REQUIRED : 'Please enter your password',
  PASSWORD_MINCHAR : 'Your password must be longer than 8 characters. Please try again.',
  PASSWORD_MAXCHAR : 'Your password cannot be more than 20 characters.',
  PIN_REQUIRED : 'Please enter the requested pin',
  CODE1_REQUIRED: 'Please enter your verification code digits',
  CODE2_REQUIRED: 'Please enter your verification code digits',
  VERIFICATION_ERROR: 'We do not hold either a valid email address or mobile phone number for you. Please contact us to update these details so that you can verify it\'s you.',
  USERNAME_LOGIN_FAIL: "Some or all of your details don't match. Please try again.",
  USERNAME_LOGIN_LAST_ATTEMPT: "Some or all of your details don't match. Please try again. You have one more attempt left.",
  USERNAME_LOGIN_COUNTDOWN: 'You have entered incorrect details too many times. Please try again in',
  USERNAME_LOGIN_LOCKED: 'You have entered incorrect details too many times. We have locked your account, please contact us',
  SECURITY_CODE_REQUIRED: 'Please enter your new security code',
  SECURITY_CODE_MIN_DIGIT_ERR: 'Your security code should be 6 digits. Please try again.',
  SECURITY_CODE_MAX_DIGIT_ERR: 'Your security code must be 6 digits.',
  SECURITY_CODE_MISMATCH: 'Your security code did not match. Please try again.',
  INVALID_SECURITY_CODE: 'Your security code can only contain digits',
  NEW_PASSWORD_ERROR: 'Please enter your new password',
  CONFIRM_NEW_PASSWORD_ERROR: 'Please confirm your new password',
  PASSWORD_NOT_MATCH_ERROR: 'Your password did not match. Please try again.',
  CONFIRM_SECURITY_CODE_REQUIRED: 'Please confirm your new security code',
  GENERAL_PAGE_ERROR: 'Sorry, there were some errors',
  EMAIL_ADDRESS_ERROR: 'Please enter a valid email address',
  EMAIL_ADDRESS_NOT_MATCH_ERROR: "Email doesn't match",
  ONE_TIME_PASSWORD_MAX_DIGIT_ERR:'Your one time password must be 10 digits.',
  ONE_TIME_PASSWORD_MIN_DIGIT_ERR: 'Your one time password must be 10 digits.',
  INVALID_ONE_TIME_PASSWORD:'Your one time password can only contain digits.',
  INCORRECT_ONE_TIME_PASSWORD:'Incorrect One-time password, please try again',
  ONE_TIME_PASSWORD_REQUIRED:'Please enter your one time password',
  PASSWORD_STRENGTH_ERROR: 'Your password did not meet the required validation rules, please read the provided password requirements and try again.',
  SECURITY_CODE_STRENGTH_ERROR: 'Your security code can only contain digits. For your security please do not enter the same digit consecutively',
  ALREADY_REGISTERED: <div>
    <p>You have previously already registered for online banking. If you have forgotten your username we can send you a username reminder - <Link to={ROUTE_PATH_NAME.FORGOTUSERNAME}>send me a username reminder</Link>.</p>
    <p>If you have also forgotten your security credentials such as your password and security code, you will also need to reset these once you have your username</p>
  </div>
}