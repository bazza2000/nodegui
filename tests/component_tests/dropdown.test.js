import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import Dropdown from "../../src/components/Dropdown";
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

const context = {
    store
}

describe('Dropdown component', () => {

    const props = {
        id: "IDTEST",
        value: {},
        onChange: jest.fn(),
        className: {},
        options: [{"label": "1", "name": "1"},{"label": "2", "name": "2"},{"label": "3", "name": "3"}],
        type: "password",
        placeholder: "",
    }
    
    // check component renders
    it('should render at least a div', () => {
        let shallowWrapper = shallow(<Dropdown {...props} />);
        expect(shallowWrapper.exists('div')).toEqual(true);
    });

    /*
    * Props
    */
    it('should render correct props', () => {
        const mounted = mount(<Dropdown {...props} />);
        expect(mounted.props()).toEqual(props);
    });

    /* 
    * State
    * - NO default state objects.
    */ 

    /*
    * Events and State updates
    * - No events to test
    */

});
