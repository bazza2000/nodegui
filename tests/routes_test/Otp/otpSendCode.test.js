import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import OtpSendCode from "../../../src/routes/OTP/OtpSendCode";
import { store } from '../../../src/store/store';
import { links } from '../../../src/constants/links';
import { actions } from '../../../src/actions/indexActions';

configure({adapter: new Adapter()});

describe('Header component', () => {
  
  const context = {
    store
  }

  // check component renders
  it('should render at least a div', () => {
    const shallowWrapper = shallow(<OtpSendCode />, {context}).dive({context});
    expect(shallowWrapper.exists('div')).toEqual(true);
  });

  /*
   * Props
   */  

   /*
   * State
   */
  it('should render the state as expected', () => {
    const shallowWrapper = shallow(<OtpSendCode />, {context}).dive({context});
    const expectedState = { currentlySending: false, generalError: null, isVerifyScreen: false, message: null };
    console.log(shallowWrapper.state());
    expect(shallowWrapper.state()).toEqual(expectedState);
  });

   /*
   * Events and state updates
   */
  it('should have a link to contact us', () => {
    const shallowWrapper = shallow(<OtpSendCode />, {context}).dive({context});
    const link = shallowWrapper.find('a').at(0);
    expect(link.props().href).toContain(links.footer[0].url);
  });

  it('should open contact us link in new tab', () => {
    const shallowWrapper = shallow(<OtpSendCode />, {context}).dive({context});
    const link = shallowWrapper.find('a').at(0);
    expect(link.props().target).toContain("_blank");
  });

});