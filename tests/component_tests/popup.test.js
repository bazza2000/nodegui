import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import Popup from "../../src/components/Popup";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe("Popup", () => {
  let props;
  let mountedPopup;
  //const escAction = jest.fn();
  
  const popup = (escAction) => {
    if (!mountedPopup) {
      mountedPopup = mount(
        <Popup store={store} escAction={escAction} showPopup={false} />
      );
    }
    return mountedPopup;
  }

  beforeEach(() => {
    mountedPopup = undefined;
  });
  
  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = popup().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("has the correct props", () => {
    const component = popup();
    expect(component.props().showPopup).toEqual(false);
    //expect(componentDidMount.mock.calls.length).toBe(1);
    component.instance().componentWillUnmount();
    //expect(componentWillUnmount.mock.calls.length).toBe(0)
  });
  it("checking esc function", () => {
    let escAction = jest.fn();
    const component = popup(escAction);
    
    let event = {keyCode:27};
    component.instance().escFunction(event);
  });
  it("without esc function", () => {
    const component = popup();
    
    let event = {keyCode:27};
    component.instance().escFunction(event);
    expect(component.state().showPopup).toEqual(false);
  });


});