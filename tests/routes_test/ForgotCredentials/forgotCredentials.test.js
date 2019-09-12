import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import { store } from './../../../src/store/store';
import ForgotCredentials from './../../../src/routes/ForgotCredentials/ForgotCredentials';
import { changeJourney } from '../../../src/actions/changeJourney';
import { journeyConstants } from '../../../src/constants/commonConstants';

configure({adapter: new Adapter()});

describe('Which details do you need to reset', () => {

  let stateObj = store.getState();
  let shallowWrapper,pathHistory;

  const context = {
    store
  }
  
  beforeEach(() => {
    store.dispatch = jest.fn();
    pathHistory = { push: jest.fn() };
    shallowWrapper = shallow(<ForgotCredentials history={pathHistory} />, {context}).dive({context});
  });

  it('should render all buttons', () => {
    expect(shallowWrapper.find('button')).toHaveLength(3);
  });

  it('should render ForgotPassword link', () => {
    const button = shallowWrapper.find('button').at(0);

    const action = changeJourney(
      journeyConstants.ForgotPassword
    );

    button.simulate('click');
    expect(store.dispatch).toHaveBeenCalledWith(action);

    expect(button.props().tabIndex).toBe(0);
  });

  it('should render ForgotSecurityCode link', () => {
    const button = shallowWrapper.find('button').at(1);

    const action = changeJourney(
      journeyConstants.ForgotSecurityCode
    );

    button.simulate('click');
    expect(store.dispatch).toHaveBeenCalledWith(action);

    expect(button.props().tabIndex).toBe(0);
  });

  it('should render ForgottenBothSecurityDetails link', () => {
    const button = shallowWrapper.find('button').at(2);

    const action = changeJourney(
      journeyConstants.ForgotBothCredentials
    );

    button.simulate('click');
    expect(store.dispatch).toHaveBeenCalledWith(action);
    
    expect(button.props().tabIndex).toBe(0);
  });
});