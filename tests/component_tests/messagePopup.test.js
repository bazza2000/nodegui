import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from "enzyme";
import { store } from '../../src/store/store';
import MessagePopup from '../../src/components/messagePopup';

configure({adapter: new Adapter()});

describe("Message popup component", () => {

  let shallowWrapper,pathHistory;
  const context = {
    store
  }  

  it("Call function for success Popup", () => {
    shallowWrapper = shallow(<MessagePopup 
      showPopup={ true }
      status = 'Success'
      message={'Test'} 
      buttonLabel={'Click Here'} 
    />);

    shallowWrapper.find("button").at(0).simulate('click');
    expect(shallowWrapper.state().showPopup).toEqual(false);

  });
  it("Call function for error Popup", () => {
    shallowWrapper = shallow(<MessagePopup 
      showPopup={ true }
      status = 'Failed'
      message={'Failed'} 
      buttonLabel={'Click Here'} 
    />);

    shallowWrapper.find("button").at(0).simulate('click');
    expect(shallowWrapper.state().showPopup).toEqual(false);

  });
  
  const prevProps = {
    showPopup: false,
  }
  const props = {
    showPopup: true,
    status: 'Success',
    message: 'Testing',
    buttonLabel: 'ClickHere',
  }

  it("should call componentDidUpdate and update state", () => {
    const wrapper = mount(<MessagePopup {...props} />);
    wrapper.instance().componentDidUpdate(prevProps);
    wrapper.update();
    expect(wrapper.state()).toEqual(props);
  });
});