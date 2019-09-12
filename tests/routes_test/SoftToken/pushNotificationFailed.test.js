import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import PushNotificationFailed from './../../../src/routes/SoftToken/PushNotificationFailed';
import { store } from './../../../src/store/store';

configure({adapter: new Adapter()});

describe("PushNotificationFailed component", () => {
  let state={};
  let pathHistory = { push: jest.fn() };
  const context = {
    store
  }
  let shallowWrapper = shallow(<PushNotificationFailed history={pathHistory} location={state={isOTPFlow:false}} />, {context}).dive({context});

  it("always renders a div", () => {
    const divs = shallowWrapper.find("div");
    expect(divs.length).toBeGreaterThan(1);
  });

  it('checking click event handler on button', () => {
    let button = shallowWrapper.find("button");
    button.simulate('click');
    expect(pathHistory.push).toHaveBeenCalled();
  });

});