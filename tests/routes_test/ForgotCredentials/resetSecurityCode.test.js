import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ResetSecurityCode from "../../../src/routes/ForgotCredentials/ResetSecurityCode"
import { store } from '../../../src/store/store';
import { err } from '../../../src/constants/messageConstants';

configure({adapter: new Adapter()});

describe('Test cases for Reset Security Code Screen',()=>{

  const context = {
    store
  }
  let shallowWrapper = shallow(<ResetSecurityCode />, {context}).dive({context});

  /* 
  * State
  * - Test default state objects.
  */ 
  it('inputSecurityCodeError on initial state should equal "null"', () => {
    expect(shallowWrapper.state().inputSecurityCodeError).toEqual(null);
  });

  it('inputConfirmSecurityCodeError on initial state should equal "null"', () => {
    expect(shallowWrapper.state().inputConfirmSecurityCodeError).toEqual(false || null);
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
  it('should show MaxSecurityCode error issue  in state as above 6 characters is entered', () => {
    
    const newPasswordInput = shallowWrapper.find("#NewSecurityCode");

    const mockEvent = {type: "click", currentTarget: {value: "1234567", id:"NewSecurityCode"}};
    newPasswordInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputSecurityCodeError).toEqual(err.SECURITY_CODE_MAX_DIGIT_ERR);
    //for testing less than 6 character

    const mockEvent2 = {type: "change", currentTarget: {value: "123456", id:"NewSecurityCode"}};
    newPasswordInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputSecurityCodeError).toEqual(null);
      
  });

  it('should show MaxSecurityCode error issue  in state as above 6 characters is entered for Confirm New Password', () => {
    
    const newPasswordInput = shallowWrapper.find("#confirmSecurityCode");

    const mockEvent = {type: "click", currentTarget: {value: "1234567", id:"confirmSecurityCode"}};
    newPasswordInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputConfirmSecurityCodeError).toEqual(err.SECURITY_CODE_MAX_DIGIT_ERR);
    //for testing less than 20 character

    const mockEvent2 = {type: "change", currentTarget: {value: "123456", id:"confirmSecurityCode"}};
    newPasswordInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputConfirmSecurityCodeError).toEqual(null);
    
  });

  it('On Security code input box Show Button click inputType state should equal "Text"', () => {

    const button = shallowWrapper.find("#SecurityCodeMaskButton");

    const mockEvent = {type:"inputType"};
    button.simulate('click', mockEvent);
    
    expect(shallowWrapper.state().inputType).toEqual('Text');
  });

  it('On Confirm Security code input box Show Button click confirmInputType state should equal "Text"', () => {
    
    const button = shallowWrapper.find("#ConfirmSecurityCodeMaskButton");

    const mockEvent = {type:"confirmInputType"};
    button.simulate('click', mockEvent);
    
    expect(shallowWrapper.state().confirmInputType).toEqual('Text');
  });

  it('testing button click execution',() => {
    const event = {keyCode: 13};
    shallowWrapper.find("#buttonSubmit").simulate('click', event);
  });
  
});