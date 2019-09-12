import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ResetBothSecurityDetails from "../../../src/routes/ForgotCredentials/ResetBothSecurityDetails"
import { store } from '../../../src/store/store';
import { err } from '../../../src/constants/messageConstants';

configure({adapter: new Adapter()});

describe('test case for resetBothSecurityDetails Screen',()=>{

  let shallowWrapper;
     
  const context = {
    store
  }
  shallowWrapper = shallow(<ResetBothSecurityDetails />, {context}).dive({context});


  /* 
  * State
  * - Test default state objects.
  */ 
  it('inputPasswordError on initial state should equal "null"', () => {
    
    expect(shallowWrapper.state().inputPasswordError).toEqual(null);

  });

  it('inputConfirmPasswordError on initial state should equal "null"', () => {
    
    expect(shallowWrapper.state().inputConfirmPasswordError).toEqual(false || null);

  });

  it('generalError on initial state should equal "null"', () => {

    expect(shallowWrapper.state().generalError).toEqual(false || null);

  });

  it('Input Box for New Password on initial state should equal "Password"', () => {
    
    expect(shallowWrapper.state().inputType).toEqual('Password');

  });

  it('Confirm Input Box for New Password on initial state should equal "Password"', () => {
    
    expect(shallowWrapper.state().confirmInputType).toEqual("Password");

  });

  it('Input Box for New Security Code on initial state should equal "Password"', () => {
    
    expect(shallowWrapper.state().inputSecurityType).toEqual('Password');

  });

  it('Confirm Input Box for New Security Code on initial state should equal "Password"', () => {
    
    expect(shallowWrapper.state().confirmSecurityType).toEqual("Password");

  });
  /*
  * Max New Password and Confirm New Password check
  */
  it('should show MaxPassWord error issue  in state as above 20 characters is entered', () => {
    
    const newPasswordInput = shallowWrapper.find("#NewPassword");

    const mockEvent = {type: "click", currentTarget: {value: "123456789012345678901", id:"NewPassword"}};
    newPasswordInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputPasswordError).toEqual(err.PASSWORD_MAXCHAR);
    //for testing less than 20 character

    const mockEvent2 = {type: "change", currentTarget: {value: "123456789", id:"NewPassword"}};
    newPasswordInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputPasswordError).toEqual(null);
      
  });

  it('should show MaxPassWord error issue  in state as above 20 characters is entered for Confirm New Password', () => {
  
    const confirmNewPasswordInput = shallowWrapper.find("#confirmNewPassword");
  
    const mockEvent = {type: "click", currentTarget: {value: "123456789012345678901", id:"confirmNewPassword"}};
    confirmNewPasswordInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputConfirmPasswordError).toEqual(err.PASSWORD_MAXCHAR);
    //for testing less than 20 character
  
    const mockEvent2 = {type: "change", currentTarget: {value: "123456789", id:"confirmNewPassword"}};
    confirmNewPasswordInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputConfirmPasswordError).toEqual(null);
    
  });

  it('should show MaxSecurityCode error issue  in state as above 6 characters is entered', () => {
  
    const newSecurityInput = shallowWrapper.find("#NewSecurityCode");

    const mockEvent = {type: "click", currentTarget: {value: "1234567", id:"NewSecurityCode"}};
    newSecurityInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputSecurityError).toEqual(err.SECURITY_CODE_MAX_DIGIT_ERR);
    //for testing less than 6 character

    const mockEvent2 = {type: "change", currentTarget: {value: "123456", id:"NewSecurityCode"}};
    newSecurityInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputSecurityError).toEqual(null);
    
  });

  it('should show MaxSecurityCode error issue  in state as above 6 characters is entered for Confirm New Password', () => {
  
    const confirmNewSecurityInput = shallowWrapper.find("#confirmSecurityCode");

    const mockEvent = {type: "click", currentTarget: {value: "1234567", id:"confirmSecurityCode"}};
    confirmNewSecurityInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputConfirmSecurityError).toEqual(err.SECURITY_CODE_MAX_DIGIT_ERR);
    //for testing less than 20 character

    const mockEvent2 = {type: "change", currentTarget: {value: "123456", id:"confirmSecurityCode"}};
    confirmNewSecurityInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputConfirmSecurityError).toEqual(null);
    
  });

  it('On NewPasswordMaskButton Show Button click inputType state should equal "Text"', () => {
  
    const button = shallowWrapper.find("#NewPasswordMaskButton");

    const mockEvent = {type:"inputType"};
    button.simulate('click', mockEvent);
    
    expect(shallowWrapper.state().inputType).toEqual('Text');
  });

  it('On NewConfirmPasswordMaskButton Show Button click confirmInputType state should equal "Text"', () => {
    
    const button = shallowWrapper.find("#NewConfirmPasswordMaskButton");

    const mockEvent = {type:"confirmInputType"};
    button.simulate('click', mockEvent);
    
    expect(shallowWrapper.state().confirmInputType).toEqual('Text');
  });

  it('On Security code input box Show Button click inputType state should equal "Text"', () => {
  
    const button = shallowWrapper.find("#SecurityCodeMaskButton");

    const mockEvent = {type:"inputSecurityType"};
    button.simulate('click', mockEvent);
    
    expect(shallowWrapper.state().inputSecurityType).toEqual('Text');
  });

  it('On Confirm Security code input box Show Button click confirmInputType state should equal "Text"', () => {
  
    const button = shallowWrapper.find("#ConfirmSecurityCodeMaskButton");

    const mockEvent = {type:"confirmSecurityType"};
    button.simulate('click', mockEvent);
    
    expect(shallowWrapper.state().confirmSecurityType).toEqual('Text');
  });

  it('testing button click execution',() => {
    const event = {keyCode: 13};
    shallowWrapper.find("#buttonSubmit").simulate('click', event);
  });
 
});