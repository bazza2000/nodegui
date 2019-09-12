import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ForgotUsername from "../../../src/routes/ForgotCredentials/ForgotUsername"
import { store } from '../../../src/store/store';
import { err } from '../../../src/constants/messageConstants';
const helpIcon = require(`./../../../img/${IMG_URL}/help.png`);
const hoverHIcon = require(`./../../../img/${IMG_URL}/help-h.png`);
import authnGateway from '../../../src/utils/authnGateway/authnGateway';
configure({adapter: new Adapter()});



describe(' Test case for Forgot Username Screen',() => {
  const context = {
    store
  }

  
  let history = { push: jest.fn() };
  let shallowWrapper = shallow(<ForgotUsername history={history} />, {context}).dive({context});
  /* 
  * State
  * - Test default state objects.
  */ 
  it('inputEmailAddressError on initial state should equal "null"', () => {
    expect(shallowWrapper.state().inputEmailAddressError).toEqual(null);
  });

  it('inputConfirmEmailAddressError on initial state should equal "null"', () => {
    expect(shallowWrapper.state().inputConfirmEmailAddressError).toEqual(false || null);
  });

  it('generalError on initial state should equal "null"', () => {
    expect(shallowWrapper.state().generalError).toEqual(false || null);
  });

  
  /*
  * Events and State updates
  */
  it('should change input value is entered in textbox', () => {
    const newEmailInput = shallowWrapper.find("#EmailAddress");

    const mockEvent = {stateV: "inputValue", currentTarget: {value: "test@test.com"}};
    newEmailInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputValue).toEqual('test@test.com');
  });

  it('should change inputConfirmValue value is entered in textbox', () => {
    const newnewEmailAddressInput = shallowWrapper.find("#confirmEmailAddress");

    const mockEvent = {stateV: "inputValue", currentTarget: {value: "test2@test.com"}};
    newnewEmailAddressInput.simulate('change', mockEvent);
    
    expect(shallowWrapper.state().inputConfirmValue).toEqual('test2@test.com');
  });

  it('On EmailAddress mask Button click inputType state should equal "Text"', () => {

    const button = shallowWrapper.find("#EmailAddressMaskButton");

    const mockEvent = {type:"inputType"};
    button.simulate('click', mockEvent);
    
    expect(shallowWrapper.state().inputType).toEqual('Text');
  });

  it('On confirmEmailAddress mask Button click confirmInputType state should equal "Text"', () => {

    const button = shallowWrapper.find("#ConfirmEmailAddressMaskButton");

    const mockEvent = {type:"confirmInputType"};
    button.simulate('click', mockEvent);
    
    expect(shallowWrapper.state().confirmInputType).toEqual('Text');
  });

  it('EmailAddress should check incorrect email value is entered in textbox', () => {

    let state = {
      inputValue : 'test@test'
    }
    let shallowWrapper = shallow(<ForgotUsername state={state} />, {context}).dive({context});
    const newEmailInput = shallowWrapper.find("#EmailAddress");

    const mockEvent = {type: "inputValue"};
    newEmailInput.simulate('blur', mockEvent);
    
    expect(shallowWrapper.state().inputEmailAddressError).toEqual(err.EMAIL_ADDRESS_ERROR);
  });

  it('confirmEmailAddress should check incorrect email value is entered in textbox', () => {
    let state = {
      inputValue : 'test2@test'
    }
    let shallowWrapper = shallow(<ForgotUsername state={state} />, {context}).dive({context});
    const newnewEmailAddressInput = shallowWrapper.find("#confirmEmailAddress");

    const mockEvent = {stateV: "inputConfirmValue", currentTarget: {value: "test2@test"}};
    newnewEmailAddressInput.simulate('blur', mockEvent);
    
    expect(shallowWrapper.state().inputConfirmEmailAddressError).toEqual(err.EMAIL_ADDRESS_ERROR);
  });
  
  it('should check back button click', () => {
    const backButton = shallowWrapper.find("#buttonCancel");

    const event = {keyCode: 13, type:'click'};
    backButton.simulate('click', event);
    expect(history.push).toHaveBeenCalled();
  });
  
  it('testing button click execution',() => {
    const event = {keyCode: 13, type:'click'};
    shallowWrapper.find("#buttonSubmit").simulate('click', event);
  });

  it('testing button click execution 1',() => {
    
    let state = {
      inputValue : 'test2@test',
      inputConfirmValue: 'test2@test'
    }
    let shallowWrapper = shallow(<ForgotUsername />, {context}).dive({context});
    shallowWrapper.setState(state); 
    shallowWrapper.update();
    const event = {keyCode: 13, type:'click'};
    shallowWrapper.find("#buttonSubmit").simulate('click', event);
    expect(shallowWrapper.state().inputConfirmValue).toEqual(state.inputConfirmValue);
  });
  it('testing button click execution 2',() => {
    
    let state = {
      inputValue : 'test2@test',
      inputConfirmValue: 'test2@test'
    }
    let shallowWrapper = shallow(<ForgotUsername />, {context}).dive({context});
    shallowWrapper.setState(state); 
    shallowWrapper.update();
    const event = {keyCode: 13, type:'click'};
    shallowWrapper.find("#buttonSubmit").simulate('click', event);
    //expect(shallowWrapper.state().inputValue).toEqual(state.inputValue);
    expect(shallowWrapper.state().inputConfirmValue).toEqual(state.inputConfirmValue);
  });

});