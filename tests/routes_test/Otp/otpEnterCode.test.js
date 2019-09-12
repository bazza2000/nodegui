import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import OtpEnterCode from "../../../src/routes/OTP/OtpEnterCode";
import { store } from '../../../src/store/store';
import { links } from '../../../src/constants/links';
import { actions } from '../../../src/actions/indexActions';
import { ROUTE_PATH_NAME } from '../../../src/constants/routeConstants';

configure({adapter: new Adapter()});

describe('Header component', () => {
  
  const context = {
    store
  }

  // check component renders
  it('should render at least a div', () => {
    const shallowWrapper = shallow(<OtpEnterCode />, {context}).dive({context});
    expect(shallowWrapper.exists('div')).toEqual(true);
  });

  /*
   * Props
   */  

   /*
   * State
   */
  it('should render the state as expected', () => {
    const shallowWrapper = shallow(<OtpEnterCode />, {context}).dive({context});
    const expectedState = {"OtpSendCodeError": null, "code1Error": null, "code1Value": "", "code2Error": null, "code2Value": "", "currentlyResending": false, "currentlySending": false, "currentlySendingProfile": false, "generalError": null, "redirect_to": null, "showPopup": false}
    expect(shallowWrapper.state()).toEqual(expectedState);
  });

   /*
   * Events and state updates
   */
  it('should have a link to change verification method', () => {
    const shallowWrapper = shallow(<OtpEnterCode />, {context}).dive({context});
    const link = shallowWrapper.find('Link');
    expect(link.props().to).toContain(ROUTE_PATH_NAME.CHANGEVERIFICATIONMETHOD);
  });

  it('should have a link to contact us', () => {
    const shallowWrapper = shallow(<OtpEnterCode />, {context}).dive({context});
    const link = shallowWrapper.find('a').at(0);
    expect(link.props().href).toContain(links.footer[0].url);
  });

});