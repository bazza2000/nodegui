import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import TitleBlock from "../../src/components/TitleBlock";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe("TitleBlock", () => {
  let props;
  let mountedTitleBlock;
  const titleBlock = () => {
    if (!mountedTitleBlock) {
      mountedTitleBlock = mount(
        <TitleBlock store={store} />
      );
    }
    return mountedTitleBlock;
  }

  beforeEach(() => {
    mountedTitleBlock = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = titleBlock().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


});