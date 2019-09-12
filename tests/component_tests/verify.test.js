import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import Verify from "../../src/routes/Verify";
import { store } from '../../src/store/store';
import { BrowserRouter as Router } from 'react-router-dom';

configure({adapter: new Adapter()});

describe("Verify", () => {
  let props;
  let mountedVerify;
  const verify = () => {
    if (!mountedVerify) {
      mountedVerify = mount(
        <Router>
          <Verify store={store} />
        </Router>
      );
    }
    return mountedVerify;
  }

  beforeEach(() => {
    mountedVerify = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = verify().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });


});