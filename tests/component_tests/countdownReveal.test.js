import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from "enzyme";
import { shallow } from 'enzyme';
import CountdownReveal from "../../src/components/CountdownReveal";
import { store } from '../../src/store/store';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe("CountdownReveal", () => {

  let props;
  let mountedCountdownReveal;

  const countdownReveal = () => {
    if (!mountedCountdownReveal) {
      mountedCountdownReveal = mount(
        <CountdownReveal store={store} seconds={5} hiddenContent={<p className="hiddenContent">content</p>} />
      );
    }
    return mountedCountdownReveal;
  }

  beforeEach(() => {
    mountedCountdownReveal = undefined;
  });

  /* 
   * Actual Tests
   */
  it("always renders a div", () => {
    const divs = countdownReveal().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("has the correct props", () => {
    const component = countdownReveal();
    expect(component.props().seconds).toEqual(5);
    expect(component.props().hiddenContent).toEqual(<p className="hiddenContent">content</p>);
  });

});


describe('test componentDidMount', () => {

  const props = {
    seconds: 5
  }

  it("should call componentDidMount and update state to equal 3 seconds and showZero: true", () => {
    let clock = sinon.useFakeTimers();
    const spy = jest.spyOn(CountdownReveal.prototype, 'componentDidMount');
    const wrapper = mount(<CountdownReveal {...props} />);
    wrapper.instance().componentDidMount();
    clock.tick(1000);
    wrapper.update();
    expect(wrapper.state()).toEqual({ showHidden: false, showZero: true, seconds: 3 });
  });

});

describe('test componentDidMount', () => {

  const props = {
    seconds: 1
  }

  it("should call componentDidMount and update state to equal 1 second and showHidden: true", () => {
    let clock = sinon.useFakeTimers();
    const spy = jest.spyOn(CountdownReveal.prototype, 'componentDidMount');
    const wrapper = mount(<CountdownReveal {...props} />);
    wrapper.instance().componentDidMount();
    clock.tick(1000);
    wrapper.update();
    expect(wrapper.state()).toEqual({ showHidden: true, showZero: false, seconds: 1 });
  });

});

describe('test componentDidMount', () => {
  
    const props = {
      seconds: 12
    }
  
    it("should call componentDidMount and update state to equal 10 seconds and showZero: true", () => {
      let clock = sinon.useFakeTimers();
      const spy = jest.spyOn(CountdownReveal.prototype, 'componentDidMount');
      const wrapper = mount(<CountdownReveal {...props} />);
      wrapper.instance().componentDidMount();
      clock.tick(1000);
      wrapper.update();
      expect(wrapper.state()).toEqual({ showHidden: false, showZero: false, seconds: 10 });
    });
  
  });