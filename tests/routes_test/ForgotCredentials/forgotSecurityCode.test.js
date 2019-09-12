import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ForgotSecurityCode from "../../../src/routes/ForgotCredentials/ForgotSecurityCode";
import { store } from '../../../src/store/store';

configure({adapter: new Adapter()});

describe('Test cases for Forgot Security Code screen', () => {
  
  const context = {
    store
  }
  let pathHistory = { push: jest.fn() };
  const shallowWrapper = shallow(<ForgotSecurityCode history={pathHistory} />, {context}).dive({context});

  it('should render the state as expected', () => {
    
    const expectedState = {
      inputError:null,
      inputValue:''
    }
    expect(shallowWrapper.state()).toEqual(expectedState);
  });

  it('should check value and error as null when entered in textbox', () => {

    const newPasswordInput = shallowWrapper.find("#EnterPassword");

    const mockEvent = {currentTarget: {value: "12345678901234567890"}};
    newPasswordInput.simulate('change', mockEvent);
        
    expect(shallowWrapper.state().inputError).toEqual(null);
    expect(shallowWrapper.state().inputValue).toEqual('12345678901234567890');

  });

  /*
   * Events and state updates
   */

  it('testing form submit', () => {
    let prevented = false;
    shallowWrapper.find('form').simulate('submit',{
      preventDefault:()=>{
        prevented = true;
      }
    });

    expect(prevented).toBe(true);
  });
});