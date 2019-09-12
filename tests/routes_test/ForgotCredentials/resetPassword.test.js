import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ResetPassword from "../../../src/routes/ForgotCredentials/ResetPassword"
import { store } from '../../../src/store/store';
import { err } from '../../../src/constants/messageConstants';

configure({adapter: new Adapter()});

describe(' Test case for Reset Password Screen',() => {

  const context = {
    store
  }

  let shallowWrapper = shallow(<ResetPassword />, {context}).dive({context});

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

  it('Input Box type on initial state should equal "Password"', () => {
    expect(shallowWrapper.state().inputType).toEqual('Password');
  });

  it('Confirm Input Box type on initial state should equal "Password"', () => {
    expect(shallowWrapper.state().confirmInputType).toEqual("Password");
  });


  /*
  * Events and State updates
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
    
    const newPasswordInput = shallowWrapper.find("#confirmNewPassword");

    const mockEvent = {type: "click", currentTarget: {value: "123456789012345678901", id:"confirmNewPassword"}};
    newPasswordInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputConfirmPasswordError).toEqual(err.PASSWORD_MAXCHAR);
    //for testing less than 20 character

    const mockEvent2 = {type: "change", currentTarget: {value: "123456789", id:"confirmNewPassword"}};
    newPasswordInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputConfirmPasswordError).toEqual(null);
    
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

  it('testing button click execution',() => {
    const event = {keyCode: 13};
    shallowWrapper.find("#buttonSubmit").simulate('click', event);
  });

});