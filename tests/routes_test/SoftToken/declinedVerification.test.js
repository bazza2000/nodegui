import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import DeclinedVerification from "./../../../src/routes/SoftToken/DeclinedVerification";
import { store } from './../../../src/store/store';

configure({adapter: new Adapter()});

describe("DeclinedVerification component", () => {
  const context = {
    store
  }
  let shallowDeclinedVerification, pathHistory;
  
  beforeEach(() => {
    pathHistory = { push: jest.fn() };
    shallowDeclinedVerification = shallow(<DeclinedVerification history={pathHistory} />, {context}).dive({context});
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div for DeclinedVerification", () => {
    const divs = shallowDeclinedVerification.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it('checking click event handler on button', () => {
    let button = shallowDeclinedVerification.find("button");
    button.simulate('click');
    expect(pathHistory.push).toHaveBeenCalled();
  });

});