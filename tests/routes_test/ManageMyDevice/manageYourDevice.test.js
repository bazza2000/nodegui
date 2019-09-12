import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from "enzyme";
import ManageYourDevice from "../../../src/routes/ManageMyDevice/ManageYourDevice";
import { store } from '../../../src/store/store';
import RemoveDevicePopUp from '../../../src/routes/ManageMyDevice/RemoveDevicePopUp';

configure({adapter: new Adapter()});

describe('test case for ManageYourDevice Screen',()=>{

  let shallowWrapper;
  let history = { push: jest.fn() };
     
  const context = {
    store
  }
  shallowWrapper = shallow(<ManageYourDevice history={history} />, {context}).dive({context});


  /* 
  * State
  * - Test default state objects.
  */ 

  it('showPopUp on initial state should equal "null"', () => {
    
    expect(shallowWrapper.state().showPopUp).toEqual(false);

  });

  it('checking click event handler on button', () => {
    
    let button = shallowWrapper.find("#backButton");
    const mockEvent = { keyCode: 13, type: "click" };
    button.simulate('click', mockEvent);
    expect(history.push).toHaveBeenCalled();
  });

  it("expect component is called at least once", () => {
    shallowWrapper.setState({showPopUp: true})
    expect(shallowWrapper.find(RemoveDevicePopUp).length).toEqual(1);
  });

  it('Device list rendering',()=>{
    const shallowWrapper = mount(<ManageYourDevice store={store}
      deviceDetails = {{
        "isDeviceRegistered": "Y",
        "enabledDevices":[
          {
            "model": "Moto C PLus",
            "firebaseInstanceId": "firebaseInstancec1a3b8c3301c124",
            "deviceId": "a7273fa4b16be93d8f21ff5c27705fcg",
            "lastAccessTimestamp": "2019-04-08T05:39:44.000+0000"
          },
          {
            "model": "IPhone 8",
            "firebaseInstanceId": "firebaseInstancec1a3b8c3301c125",
            "deviceId": "a7273fa4b16be93d8f21ff5c27705abc",
            "lastAccessTimestamp": "2019-05-08T05:55:44.000+0000"
          }
        ]}}
    />);
    expect(shallowWrapper.find('button').length).toBe(1);
  });
 
});