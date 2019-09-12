import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import Username from "../../src/routes/Username";
import { store } from '../../src/store/store';
import { changeUsername } from "../../src/actions/changeUsername";
import { actions } from '../../src/actions/indexActions';

configure({adapter: new Adapter()});

// check component renders
if ('should render at least a div', () => {
  let shallowWrapper = shallow(<Username />, {context}).dive({context});
  expect(shallowWrapper.exists('div')).to.equal(true);
});

/*
 * Props
 * - NO props to test on this component.
 */

/* 
 * State
 * - Test default state objects.
 */ 
it('usernameError on initial state should equal "false"', () => {
  
  const context = {
    store
  }
  
  let shallowWrapper = shallow(<Username />, {context}).dive({context});

  expect(shallowWrapper.state().usernameError).toEqual(false || null);

});

it('rememberUsername on initial state should equal "false"', () => {
  
  const context = {
    store
  }
  
  let shallowWrapper = shallow(<Username />, {context}).dive({context});

  expect(shallowWrapper.state().rememberUsername).toEqual(false);

});

it('currentlySending on initial state should equal "false"', () => {
  
  const context = {
    store
  }
  
  let shallowWrapper = shallow(<Username />, {context}).dive({context});

  expect(shallowWrapper.state().currentlySending).toEqual(false);

});

/*
 * Events and State updates
 */

it('should show usernameError in state as empty username is entered', () => {
  
  const context = {
    store
  }
  let shallowWrapper = shallow(<Username />, {context}).dive({context});
  const usernameInput = shallowWrapper.find("#username");

  const mockEvent = {type: "change", currentTarget: {value: ""}};
  usernameInput.simulate('change', mockEvent);
  console.log(shallowWrapper.props());

  expect(shallowWrapper.state().usernameError).toEqual("Please enter a valid username");
    
});

it('should username input to have redux value of the testValue', () => {
  
  const context = {
    store
  }
  let testValue = "HarryJacks77";

  store.dispatch(actions.changeUsername(testValue));

  let shallowWrapper = shallow(<Username />, {context}).dive({context});
  let usernameInputValue = shallowWrapper.find("#username").props().value

  expect(usernameInputValue).toEqual("HarryJacks77");
    
});