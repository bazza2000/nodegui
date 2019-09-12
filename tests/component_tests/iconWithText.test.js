import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import IconWithText from "../../src/components/IconWithText";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe("IconWithText", () => {
  let props;
  let mountedIconWithText;
  const iconWithText = () => {
    if (!mountedIconWithText) {
      mountedIconWithText = mount(
        <IconWithText store={store} />
      );
    }
    return mountedIconWithText;
  }

  beforeEach(() => {
    mountedIconWithText = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = iconWithText().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


});