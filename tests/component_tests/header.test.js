import React from "react";
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import Header from "../../src/components/Header";
import { store } from '../../src/store/store';
import { actions } from '../../src/actions/indexActions';
import { ROUTE_PATH_NAME } from '../../src/constants/routeConstants';

configure({adapter: new Adapter()});

describe('Header component', () => {

  const context = {
    store
  }

  // check component renders
  it('should render at least a div', () => {
    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    expect(shallowWrapper.exists('div')).toEqual(true);
  });



  it('should render Back btn with tabIndex="0"', () => {
    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    let questionMark = shallowWrapper.find("#header__back");
    expect(questionMark.props().tabIndex).toEqual(0);
  });

  it('should render question mark with target="_blank"', () => {
    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    let questionMark = shallowWrapper.find("a").at(2);
    expect(questionMark.props().target).toEqual("_blank");
  });

  it('should render question mark with tabIndex="0"', () => {
    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    let questionMark = shallowWrapper.find("#header__helper");
    expect(questionMark.props().tabIndex).toEqual(0);
  });

  /*
   * State
   * - NO default state
   */

  /*
   * Events and state updates
   */
  it('should update currentLocation in the store', () => {
    store.dispatch(actions.changeCurrentLocation(ROUTE_PATH_NAME.ENTERUSERNAME));
    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    expect(store.getState().data.currentLocation).toEqual(ROUTE_PATH_NAME.ENTERUSERNAME);
  });

  // BACK ICON
  it("should call mouseover on back icon (mounted)", () => {

    let props = {
      data: {
        currentLocation: "NotEnterUsernameScreen"
      }
    }

    let event = {
      currentTarget : {
        src: "test-file-stub"
      }
    }

    let shallowWrapper = mount(
      <Header store={store} {...props} />, {
        context: {ROUTE_PATH_NAME},
        childContextTypes: {
          ROUTE_PATH_NAME: PropTypes.object,
          ENTERUSERNAME : PropTypes.string,
          PROFILEDETAILS : PropTypes.string,
          SECURITYVERIFICATIONCODEMETHOD : PropTypes.string,
          VERIFYCODE : PropTypes.string,
          SECURITYINFORMATION : PropTypes.string,
          DECLINEDNOTIFICATION : PropTypes.string,
          WECOULDNOTLOGYOUIN : PropTypes.string,
          SOFTTOKENVERIFICATIONCODEMETHOD : PropTypes.string,
          WEHAVESENTYOUANOTIFICATION : PropTypes.string,
          CHANGEVERIFICATIONMETHOD : PropTypes.string,
          NEWSECURITYDETAILSCREATED : PropTypes.string,
          WHICHDETAILSDOYOUNEEDTORESET : PropTypes.string,
          FORGOTTENBOTHSECURITYDETAILS : PropTypes.string,
          FORGOTPASSWORD : PropTypes.string,
          FORGOTSECURITYCODE : PropTypes.string,
          RESETPASSWORD : PropTypes.string,
          RESETSECURITYCODE : PropTypes.string,
          SOFTTOKENSUCCESSFUL : PropTypes.string,
          CONSENT : PropTypes.string,
          RESETBOTHSECURITYDETAILS: PropTypes.string,
          CHANGEDEFAULTPREFERENCE: PropTypes.string,
          MANAGEYOURDEVICE: PropTypes.string,
          FORGOTUSERNAME : PropTypes.string,
          ERRORPAGE : PropTypes.string,
          FORGOTUSERNAMESUCCESS : PropTypes.string,
          ONETIMEPASSWORD: PropTypes.string,
          ONETIMEPASSWORDEXPIRE:PropTypes.string
        }
      }
    );
    shallowWrapper.setContext(ROUTE_PATH_NAME);
    store.dispatch(actions.changeCurrentLocation("NOT A MATCH ROUTE"));
    let image = shallowWrapper.find("img").at(0);
    image.simulate('mouseover', event);
    console.log(shallowWrapper.props());
    console.log(shallowWrapper.html());
    expect(image.props().src).toContain("test-file-stub");
  });

  it("should call mouseover on back icon (shallow)", () => {

    const props = {
      data: { currentLocation: "AnythingButUsernameScreen" }
    }

    let event = {
      currentTarget : {
        src: "test-file-stub"
      }
    }

    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    let image = shallowWrapper.find("img").at(0);
    image.simulate('mouseover', event);

    expect(image.props().src).toContain("test-file-stub");
  });

  it("should call _back method on enter", () => {
    const event = {keyCode: 13, type: "click"};
    let wrapper = shallow(<Header />, {context}).dive({context});
    expect(wrapper.instance()._back(event)).toEqual(undefined);
  });

  it("should call _back method on click", () => {
    const event = {type: "click"};
    let wrapper = shallow(<Header />, {context}).dive({context});
    expect(wrapper.instance()._back(event)).toEqual(undefined);
  });

  it("should call mouseout on back icon", () => {

    const props = {
      data: { currentLocation: "AnythingButUsernameScreen" }
    }

    let event = {
      currentTarget : {
        src: "test-file-stub"
      }
    }

    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    let image = shallowWrapper.find("img").at(0);
    image.simulate('mouseout', event);

    expect(image.props().src).toContain("test-file-stub");
  });

  // HELP ICON
  it("should call mouseover on Help icon", () => {

    const props = {
      data: { currentLocation: "AnythingButUsernameScreen" }
    }

    let event = {
      currentTarget : {
        src: "test-file-stub"
      }
    }

    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    let image = shallowWrapper.find("img").at(2);
    image.simulate('mouseover', event);

    expect(image.props().src).toContain("test-file-stub");
  });

  it("should call mouseout on Help icon", () => {

    const props = {
      data: { currentLocation: "AnythingButUsernameScreen" }
    }

    let event = {
      currentTarget : {
        src: "test-file-stub"
      }
    }

    let shallowWrapper = shallow(<Header />, {context}).dive({context});
    let image = shallowWrapper.find("img").at(2);
    image.simulate('mouseout', event);

    expect(image.props().src).toContain("test-file-stub");
  });

  it("should call _open method on enter", () => {
    const event = {keyCode: 13, type: "click"};
    let wrapper = shallow(<Header />, {context}).dive({context});
    expect(wrapper.instance()._open(event)).toEqual(undefined);
  });

  it("should call _open method on click", () => {
    const event = {type: "click"};
    let wrapper = shallow(<Header />, {context}).dive({context});
    expect(wrapper.instance()._open(event)).toEqual(undefined);
  });

});

