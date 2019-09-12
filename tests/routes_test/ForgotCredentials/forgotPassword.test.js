import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ForgotPassword from "../../../src/routes/ForgotCredentials/ForgotPassword";
import { store } from '../../../src/store/store';

configure({adapter: new Adapter()});

describe('Header component', () => {
  
  const context = {
    store
  }
  let shallowWrapper = shallow(<ForgotPassword />, {context}).dive({context});

  // check component renders
  it('should render at least a div', () => {
    expect(shallowWrapper.exists('div')).toEqual(true);
  });
  
  /*
   * State
   */
  it('should render the state as expected', () => {
    const shallowWrapper = shallow(<ForgotPassword />, {context}).dive({context});
    const expectedState = {
      pinPos1:'',
      pinPos2:'',
      pinPos1Error:'',
      pinPos2Error:''
    }
    expect(shallowWrapper.state()).toEqual(expectedState);
  });

  /*
   * Events and state updates
   */

  it('should call onChange for 1st Pin Position', () => {
    const event = {
      currentTarget: { value: '1' }
    };

    shallowWrapper.find('#pin1').at(0).simulate('change', event);
    expect(shallowWrapper.state('pinPos1')).toBe('1');
  });

  it('should call onChange for 2nd Pin Position', () => {
    const event = {
      currentTarget: { value: '2' }
    };

    shallowWrapper.find('#pin2').at(0).simulate('change', event);
    expect(shallowWrapper.state('pinPos2')).toBe('2');
  });

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