import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import { store } from '../../../src/store/store';
import ForgotBothCredentials from "./../../../src/routes/ForgotCredentials/ForgotBothCredentials";

configure({adapter: new Adapter()});

describe("ForgotBothCredentials component", () => {
 
  let shallowWrapper, pathHistory;
  const context = {
    store
  }  

  pathHistory = { push: jest.fn() };
  shallowWrapper = shallow(<ForgotBothCredentials history={pathHistory} />, {context}).dive({context});

  /* 
   * Actual Tests
   */
  it("always renders a div for ForgotBothCredentials", () => {
    const divs = shallowWrapper.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


});