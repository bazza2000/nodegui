import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import WeHaveSentYouANotification from "../../../src/routes/SoftToken/WeHaveSentYouANotification";
import { store } from '../../../src/store/store';
import { ROUTE_PATH_NAME } from '../../../src/constants/routeConstants';

import DefaultPrefPopUp from '../../../src/components/DefaultPrefPopUp';

configure({ adapter: new Adapter() });


describe('WeHaveSentYouANotification Created Screen', () => {

  let shallowWrapper;
     
  const context = {
    store
  }
  shallowWrapper = shallow(<WeHaveSentYouANotification />, {context}).dive({context});


  it('should render the content with tabIndex="0"', () => {
    let questionMark = shallowWrapper.find("h1").at(0);
    expect(questionMark.props().tabIndex).toEqual(0);
  });

  it("expect component is called at least once", () => {
    shallowWrapper.setState({displayPopup: true})
    expect(shallowWrapper.find(DefaultPrefPopUp).length).toEqual(1);
  });
  it('checking click event handler on button', () => {
      let history = { push: jest.fn() };
      let _getRedirectUrl =  jest.fn() ;
      let props = {history:history, data:{
        journey : 'test',
        profile:{
          redirectURL:'http://localhost:3001'
        }
      }}
      window['_getRedirectUrl'] = _getRedirectUrl;
      const shallowWrapperDiv = shallow(<WeHaveSentYouANotification {...props}/>, {context}).dive({context});
      shallowWrapperDiv.instance()._getRedirectionCall(props);
      expect(history.push).toHaveBeenCalled();
  });
  it('checking handleRedirection', () => {
    let history = { push: jest.fn() };
    let preventdefault = { preventDefault: jest.fn() };
    let props = {history:history, data:{
      journey : 'forgot-security-code',
      profile:{
        redirectURL:'http://localhost:3001'
      }
    }}
    let journeyConstants = {
      'ForgotPassword' : 'forgot-password',
      'ForgotSecurityCode' : 'forgot-security-code',
      'ForgotBothCredentials' : 'forgot-both-credential',
      'Login' : 'login'
    }
    window['jc'] = journeyConstants;
    const shallowWrapperDiv = shallow(<WeHaveSentYouANotification {...props}/>, {context}).dive({context});
    shallowWrapperDiv.instance().props.data['journey'] = 'forgot-security-code';
    //console.log(shallowWrapperDiv.instance().props.data);
    shallowWrapperDiv.instance().handleRedirection(preventdefault)
    expect(history.push).toHaveBeenCalledWith(ROUTE_PATH_NAME.FORGOTSECURITYCODE);
    shallowWrapperDiv.instance().props.data['journey'] = 'forgot-password';
    shallowWrapperDiv.instance().handleRedirection(preventdefault)
    expect(history.push).toHaveBeenCalledWith(ROUTE_PATH_NAME.FORGOTPASSWORD);
    shallowWrapperDiv.instance().props.data['journey'] = 'forgot-both-credential';
    shallowWrapperDiv.instance().handleRedirection(preventdefault)
    expect(history.push).toHaveBeenCalledWith(ROUTE_PATH_NAME.FORGOTTENBOTHSECURITYDETAILS);
    shallowWrapperDiv.instance().props.data['journey'] = 'forgot';
    shallowWrapperDiv.instance().handleRedirection(preventdefault)
    expect(history.push).toHaveBeenCalledWith(ROUTE_PATH_NAME.ENTERSECURITYDETAILS);
});

});