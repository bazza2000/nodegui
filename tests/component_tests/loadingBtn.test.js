import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import LoadingBtn from "../../src/components/LoadingBtn";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe("LoadingBtn", () => {
  let props;
  let mountedLoadingBtn;
  const loadingBtn = () => {
    if (!mountedLoadingBtn) {
      mountedLoadingBtn = mount(
        <LoadingBtn store={store} />
      );
    }
    return mountedLoadingBtn;
  }

  beforeEach(() => {
    mountedLoadingBtn = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = loadingBtn().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


});