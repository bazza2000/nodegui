import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import SendCodeSelection from "../../src/components/SendCodeSelection";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe("SendCodeSelection", () => {
  let props;
  let mountedSendCodeSelection;
  const sendCodeSelection = () => {
    if (!mountedSendCodeSelection) {
      mountedSendCodeSelection = mount(
        <SendCodeSelection store={store} />
      );
    }
    return mountedSendCodeSelection;
  }

  beforeEach(() => {
    mountedSendCodeSelection = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = sendCodeSelection().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


});