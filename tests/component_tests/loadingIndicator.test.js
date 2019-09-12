import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import LoadingIndicator from "../../src/components/LoadingIndicator";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe("LoadingIndicator", () => {
  let props;
  let mountedLoadingIndicator;
  const loadingIndicator = () => {
    if (!mountedLoadingIndicator) {
      mountedLoadingIndicator = mount(
        <LoadingIndicator store={store} />
      );
    }
    return mountedLoadingIndicator;
  }

  beforeEach(() => {
    mountedLoadingIndicator = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = loadingIndicator().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


});