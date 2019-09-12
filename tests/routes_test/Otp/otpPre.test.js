import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import OtpPre from "../../../src/routes/OTP/OtpPre";
import { store } from '../../../src/store/store';

configure({adapter: new Adapter()});


describe('OtpPre component', () => {

    const context = {
        store
    }
    
    // check component renders
    it('should render at least a div', () => {
        let shallowWrapper = shallow(<OtpPre />, {context}).dive({context});
        expect(shallowWrapper.exists('div')).toEqual(true);
    });

    /*
    * Props
    * - NO props to test on this component.
    */

    /* 
    * State
    * - NO default state objects.
    */ 

    /*
    * Events and State updates
    * - No events to test
    */

});