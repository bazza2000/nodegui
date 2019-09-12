import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import { store } from '../../../src/store/store';
import SoftTokenVerification from "./../../../src/routes/ForgotCredentials/SoftTokenVerification";

configure({adapter: new Adapter()});

describe("SoftTokenVerification component", () => {
 
  let shallowWrapper, pathHistory;
  const context = {
    store
  }  

  pathHistory = { push: jest.fn() };
  shallowWrapper = shallow(<SoftTokenVerification history={pathHistory} />, {context}).dive({context});

  
  /* 
   * Actual Tests
   */
  it("always renders a div for SoftTokenVerification", () => {
    const divs = shallowWrapper.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it('checking click event handler on button', () => {
    shallowWrapper.instance()._softTokenLogin = jest.fn();
    let button = shallowWrapper.find("button");
    button.simulate('click');
    shallowWrapper.update();

    // expect(pathHistory.push).toHaveBeenCalled();
  });

});