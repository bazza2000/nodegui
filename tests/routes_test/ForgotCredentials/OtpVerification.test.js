import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import OtpVerification from "../../../src/routes/ForgotCredentials/OtpVerification"
import { store } from '../../../src/store/store';
import { err } from '../../../src/constants/messageConstants';

configure({adapter: new Adapter()});

describe('Test cases for OTP verfication Screen',()=>{

  const context = {
    store
  }
  let shallowWrapper = shallow(<OtpVerification />, {context}).dive({context});

  /* 
  * State
  * - Test default state objects.
  */ 
  it('inputOTPError on initial state should equal "null"', () => {
    expect(shallowWrapper.state().inputOTPError).toEqual(null);
  });

  it('Input Box type on initial state should equal "text"', () => {
    expect(shallowWrapper.state().inputType).toEqual("text");
  });


  /*
  * Events and State updates
  */
  it('should show MaxOTPLength error issue  in state as above 10 digits is entered', () => {
    
    const newOTPInput = shallowWrapper.find("#inputOneTimePass");

    const mockEvent = {type: "click", currentTarget: {value: "12345678901", id:"inputOneTimePass"}};
    newOTPInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputOTPError).toEqual(err.ONE_TIME_PASSWORD_MAX_DIGIT_ERR);

    const mockEvent2 = {type: "change", currentTarget: {value: "1234567890", id:"inputOneTimePass"}};
    newOTPInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputOTPError).toEqual(null);
      
  });

  it('should show MinOTPLength error issue  in state as below 10 digits is entered', () => {
    
    const newOTPInput = shallowWrapper.find("#inputOneTimePass");
    let state = {
      inputValue : '123456'
    }
    shallowWrapper.setState(state); 
    shallowWrapper.update();
    const mockEvent = {currentTarget: {value: "12345678", id:"inputOneTimePass"}};
    newOTPInput.simulate('blur', mockEvent);
    
    expect(shallowWrapper.state().inputOTPError).toEqual(err.ONE_TIME_PASSWORD_MIN_DIGIT_ERR);

    const mockEvent2 = {currentTarget: {value: "1234567890", id:"inputOneTimePass"}};
    newOTPInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputOTPError).toEqual(null);
      
  });

  it('should show one time password required error issue if OTP is not entered', () => {
    
    const newOTPInput = shallowWrapper.find("#inputOneTimePass");
    let state = {
      inputValue : ''
    }
    shallowWrapper.setState(state); 
    shallowWrapper.update();
    const mockEvent = {currentTarget: {value: "", id:"inputOneTimePass"}};
    newOTPInput.simulate('blur', mockEvent);
    
    expect(shallowWrapper.state().inputOTPError).toEqual(err.ONE_TIME_PASSWORD_REQUIRED);

    const mockEvent2 = {currentTarget: {value: "1234567890", id:"inputOneTimePass"}};
    newOTPInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputOTPError).toEqual(null);
      
  });


  it('should show invalid one time password error issue  in state as if entered other than digits', () => {
    
    const newOTPInput = shallowWrapper.find("#inputOneTimePass");

    const mockEvent = {type: "click", currentTarget: {value: "1abc#{&", id:"inputOneTimePass"}};
    newOTPInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputOTPError).toEqual(err.INVALID_ONE_TIME_PASSWORD);
    //for testing less than 6 character

    const mockEvent2 = {type: "change", currentTarget: {value: "1234567890", id:"inputOneTimePass"}};
    newOTPInput.simulate('change', mockEvent2);
    expect(shallowWrapper.state().inputOTPError).toEqual(null);
      
  });

  it('testing button click execution',() => {
    const event = {keyCode: 13};
    shallowWrapper.find("#buttonSubmit").simulate('click', event);
  });
  
});