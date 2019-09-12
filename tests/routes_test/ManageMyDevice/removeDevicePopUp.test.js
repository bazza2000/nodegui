import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import { store } from '../../../src/store/store';
import RemoveDevicePopUp from '../../../src/routes/ManageMyDevice/RemoveDevicePopUp';

configure({adapter: new Adapter()});

describe("Remove Device popup component", () => {

  let shallowWrapper;
  const context = {
    store
  }  

  it("Call function on remove device button click", () => {
    shallowWrapper = shallow(<RemoveDevicePopUp 
      _removeDevice={ jest.fn() }
      showSuccessErrorPopup = ''
      deviceName={'Test'} 
      displayPopUp={true} 
      selectedDevice={{model:'Test',id:{firebaseInstanceId:1,deviceId:123}}}
    />, {context}).dive({context});
    shallowWrapper.setState({displayPopup:true});
    shallowWrapper.find("button").at(0).simulate('click');

  });

  it("testing cancel button click", () => {
    shallowWrapper = shallow(<RemoveDevicePopUp 
      _removeDevice={ jest.fn() }
      showSuccessErrorPopup = ''
      displayPopUp={true} 
      selectedDevice={{model:'Test'}}
    />, {context}).dive({context});
    shallowWrapper.setState({displayPopup:true});
    shallowWrapper.find("button").at(1).simulate('click');
  });

  it("testing success popup", () => {
    shallowWrapper = shallow(<RemoveDevicePopUp 
      _removeDevice={ jest.fn() }
      showSuccessErrorPopup = 'Success'
      displayPopUp={true}
    />, {context}).dive({context});
    shallowWrapper.find("button").at(0).simulate('click');
  });

  it("testing error popup", () => {
    shallowWrapper = shallow(<RemoveDevicePopUp 
      _removeDevice={ jest.fn() }
      showSuccessErrorPopup = 'Error'
      displayPopUp={true} 
    />, {context}).dive({context});
    shallowWrapper.find("button").at(0).simulate('click');
  });
});