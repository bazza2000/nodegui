import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import ChangeDefaultPreference from "../../../src/routes/ChangeDefaultPreference/ChangeDefaultPreference";
import { store } from '../../../src/store/store';
import { links } from '../../../src/constants/links';
import { actions } from '../../../src/actions/indexActions';
import { SCA_PREFERENCE } from '../../../src/constants/appConstants';

configure({adapter: new Adapter()});

describe('Header component', () => {
  
  const context = {
    store
  }
  const shallowWrapper = shallow(<ChangeDefaultPreference  />, {context}).dive({context});
  // check component renders
  it('should render at least a div', () => {
    expect(shallowWrapper.exists('div')).toEqual(true);
  });

   /*
   * Props
   */  

   /*
   * State
   */
  it('should render the state as expected', () => {
    const expectedState = { currentlySending: false, generalError: null, status: null , isVerifyScreen:true, showPopup:false};
    expect(shallowWrapper.state()).toEqual(expectedState);
  });

  it('should set as default button click', () => {
    const event = {keyCode: 13};
    const data = {
      profile:{
        scaPreference: "MOBILE_APP",
        newscaPreference: "MOBILE_APP"
      }
    }
    const shallowWrapperNew = shallow(<ChangeDefaultPreference data={data} />, {context}).dive({context});
    shallowWrapperNew.find("#btnChangeDefaultPreference").simulate('click', event);
    const expectedState = {"currentlySending": false, "generalError": null, "isVerifyScreen": true, "showPopup": false, "status": null}
    expect(shallowWrapperNew.state()).toEqual(expectedState);
  });

});