import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import LineText from "../../src/components/LineText";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe("LineText", () => {
  let props;
  let mountedLineText;
  const lineText = () => {
    if (!mountedLineText) {
      mountedLineText = mount(
        <LineText store={store} />
      );
    }
    return mountedLineText;
  }

  beforeEach(() => {
    mountedLineText = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = lineText().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


});