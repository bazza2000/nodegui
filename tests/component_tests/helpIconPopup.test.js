import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import HelpIconPopup from "../../src/components/HelpIconPopup";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

const context = {
    store
}

const helpIcon = require(`./../../img/help.png`);
const hoverHIcon = require(`./../../img/help-h.png`);

describe('HelpIconPopup component', () => {

    const props = {
        defaultIcon: "defaultImgUrl",
        hoverIcon: "hoverImgUrl",
        showPopup: "false",
        popupContent: "<p>content</p>"
    }

    // check component renders
    it('should render at least a div', () => {
        let shallowWrapper = shallow(<HelpIconPopup {...props} />);
        expect(shallowWrapper.exists('div')).toEqual(true);
    });

    /*
    * Props
    */
    it('should render correct props', () => {
        const mounted = mount(<HelpIconPopup {...props} />);
        expect(mounted.props()).toEqual(props);
    });

    /*
    * State
    */
    it('should have correct default state', () => {
        const shallowWrapper = shallow(<HelpIconPopup {...props}/>);
        shallowWrapper.find(".header__content--icons").at(0).simulate('mouseover', {currentTarget: {src: ''}});
        expect(shallowWrapper.state()).toEqual({"showPopup": "false"});
    });

    /*
    * Events and State updates
    */
    it('should be able to mouseover on helpIcon', () => {
        const shallowWrapper = shallow(<HelpIconPopup {...props}/>);
        shallowWrapper.find(".header__content--icons").at(0).simulate('mouseover', {currentTarget: {src: ''}});
        expect(shallowWrapper.find(".header__content--icons").prop("src")).toEqual("defaultImgUrl");
    });

    it('should be able to mouseout on helpIcon', () => {
        const shallowWrapper = shallow(<HelpIconPopup {...props}/>);
        shallowWrapper.find(".header__content--icons").at(0).simulate('mouseout', {currentTarget: {src: ''}});
        expect(shallowWrapper.find(".header__content--icons").prop("src")).toEqual("defaultImgUrl");
    });

    it('should open the popup on click', () => {
        const shallowWrapper = shallow(<HelpIconPopup {...props}/>);
        shallowWrapper.find(".header__question-mark").at(0).simulate('click', { keycode: 13, type: "click" } );
    });
    it("shoul check closepopup function", () => {
        const shallowWrapper = shallow(<HelpIconPopup {...props}/>);
        shallowWrapper.instance()._closePopup();
        expect(shallowWrapper.state().showPopup).toEqual(false);
    });
});
