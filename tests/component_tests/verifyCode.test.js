import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from "enzyme";
import VerifyCode from "../../src/components/VerifyCode";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe("VerifyCode", () => {
  let props;
  let mountedVerifyCode;
  const context = {
    store
  }
  const verifyCode = () => {
    if (!mountedVerifyCode) {
      mountedVerifyCode = mount(
        <VerifyCode store={store} />
      );
    }
    return mountedVerifyCode;
  }

  beforeEach(() => {
    mountedVerifyCode = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    let props = {_getChangeDetails: jest.fn(), code1Error : 'code1Error' };
    let shallowWrapper = shallow(<VerifyCode {...props} />, {context}).dive({context});
    const divs = shallowWrapper.find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
  it("should trigger change event", () => {
    let props = {_getChangeDetails: jest.fn(), code1Error : 'code1Error' };
    let shallowWrapper = shallow(<VerifyCode {...props} />, {context}).dive({context});
    let InputField = shallowWrapper.find("#code1");
    const mockEvent = { e :{} };
    InputField.simulate('change', mockEvent);
  });


});