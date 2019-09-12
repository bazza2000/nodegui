import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ForgotUsernameSuccess from "../../../src/routes/ForgotCredentials/ForgotUsernameSuccess"
import { store } from '../../../src/store/store';
import { err } from '../../../src/constants/messageConstants';

configure({adapter: new Adapter()});



describe(' Test case for ForgotUsernameSuccess Screen',() => {
  const context = {
    store
  }

  
  let history = { push: jest.fn() };
  const state = { state: { email: 'test@test.com'}};
  let shallowWrapper = shallow(<ForgotUsernameSuccess location={state} history={history} />, {context}).dive({context});
  
  /* 
  * State
  * - Test default state objects.
  */ 
  it('should render at least a div', () => {
    expect(shallowWrapper.exists('div')).toEqual(true);
  });

  it('should check back button click', () => {
    const backButton = shallowWrapper.find("#btnForgotUsernameSuccess");

    const event = {keyCode: 13, type:'click'};
    backButton.simulate('click', event);
    expect(history.push).toHaveBeenCalled();
  });

});