import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import { store } from '../../src/store/store';
import DefaultPrefPopUp from '../../src/components/DefaultPrefPopUp';
import { SCA_PREFERENCE } from '../../src/constants/appConstants';

configure({adapter: new Adapter()});

describe('Testing Default preference popup', () => {

  const context = {
    store
  }
  const mockEvent = { keyCode: 13, type:'click' };

  it("testing popup button click for no option", () => {
    const shallowWrapper = shallow(<DefaultPrefPopUp
      displayPopup={true} 
      profile={{
        email:'a*****a@a.com'
      }} 
      scaPreference={SCA_PREFERENCE.EMAIL_PREF} 
    />, {context}).dive({context});
    shallowWrapper.setState({displayPopup:true});

    shallowWrapper.find("button").at(1).simulate('click', {mockEvent,decision:"no"});
    shallowWrapper.update();
    // expect(shallowWrapper.state('displayPopup')).toBe(false);
  });

  it("testing popup button click for yes option", () => {
    const shallowWrapper = shallow(<DefaultPrefPopUp
      displayPopup={true} 
      profile={{
        email:'a*****a@a.com'
      }} 
      scaPreference={SCA_PREFERENCE.EMAIL_PREF} 
    />, {context}).dive({context});

    shallowWrapper.setState({displayPopup:true});

    shallowWrapper.find("button").at(0).simulate('click', {mockEvent,decision:"yes"});
    shallowWrapper.update();
    // expect(shallowWrapper.state('displayPopup')).toBe(false);
  });

  it("Get content for mobile app preference",()=>{
    const shallowWrapper = shallow(<DefaultPrefPopUp
      displayPopup={true} 
      scaPreference={SCA_PREFERENCE.MOBILEAPP_PREF} />, {context}).dive({context});
    shallowWrapper.update();
    shallowWrapper.find("#btnSubmitDefaultPreference").simulate('keyDown', {mockEvent,decision:"yes"});
  });

  it("Get content for text preference",()=>{
    const shallowWrapper = shallow(<DefaultPrefPopUp
      displayPopup={true} 
      profile={{
        mobile:'99999'
      }} 
      scaPreference={SCA_PREFERENCE.TEXT_PREF} />, {context}).dive({context});
    shallowWrapper.update();  
    shallowWrapper.find("#btnCancelDefaultPreference").simulate('keyDown', {mockEvent,decision:"no"});
  });

  it("Get content for default switch",()=>{
    const shallowWrapper = shallow(<DefaultPrefPopUp
      displayPopup={true} 
      scaPreference='' />, {context}).dive({context});
    shallowWrapper.update();  
  });

  it('invokes `componentDidMount` when mounted', () => {
    jest.spyOn(DefaultPrefPopUp.prototype, 'componentDidMount');
    shallow(<DefaultPrefPopUp displayPopup={true} />, {context}).dive({context});
    expect(DefaultPrefPopUp.prototype.componentDidMount).toHaveBeenCalled();
    DefaultPrefPopUp.prototype.componentDidMount.mockRestore();
  });

  it('calls `_setDefaultAuthMethod` when mounted', () => {
    const wrapper = shallow(<DefaultPrefPopUp 
      profile={{
        email:'a*****a@a.com'
      }}
      data = {{
        challenge: "10"
      }}
      scaPreference={SCA_PREFERENCE.EMAIL_PREF}  />, {context}).dive({context});
    const instance = wrapper.instance();
    jest.spyOn(instance, '_setDefaultAuthMethod');
    // instance.componentDidMount();
    wrapper.find("#btnCancelDefaultPreference").simulate('click', {keyCode: 13,decision:"no"});
    expect(instance._setDefaultAuthMethod).toHaveBeenCalled();
  });

});