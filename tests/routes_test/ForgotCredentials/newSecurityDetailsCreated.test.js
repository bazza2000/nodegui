import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import { store } from '../../../src/store/store';
import NewSecurityDetailsCreated from "../../../src/routes/ForgotCredentials/NewSecurityDetailsCreated";

configure({adapter: new Adapter()});

describe('New Security Details Created Screen', () => {

  let shallowWrapper, history;
  const state = { text: null};

  const context = {
    store
  }

  beforeEach(() => {
    history = { push: jest.fn() };
    shallowWrapper = shallow(<NewSecurityDetailsCreated location={state} history={history} />, {context}).dive({context});
  });
  
  // check component renders
  it('should render at least a div', () => {
    expect(shallowWrapper.exists('div')).toEqual(true);
  });

  it('should render the content with tabIndex="0"', () => {
    let questionMark = shallowWrapper.find("div").at(1);
    expect(questionMark.props().tabIndex).toEqual(0);
  });

  it('checking click event handler on button', () => {
    let button = shallowWrapper.find("#logInBtn");
    button.simulate('click');
    expect(history.push).toHaveBeenCalled();
  });

});