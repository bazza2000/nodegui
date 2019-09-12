import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import SoftTokenVerificationCodeMethod from "../../../src/routes/SoftToken/SoftTokenVerificationCodeMethod";

configure({ adapter: new Adapter() });


describe('SoftTokenVerificationCodeMethod Created Screen', () => {

    it('should render the content with tabIndex="0"', () => {
        let shallowWrapper = mount(<SoftTokenVerificationCodeMethod />);
        let questionMark = shallowWrapper.find("h1").at(0);
        expect(questionMark.props().tabIndex).toEqual(0);
    });

    it('checking click event handler on button', () => {
        let history = { push: jest.fn() };
        let shallowWrapper = mount(<SoftTokenVerificationCodeMethod history={history} />);
        let button = shallowWrapper.find("button");
        const mockEvent = { keyCode: 13, type: "click" };
        button.simulate('click', mockEvent);

        expect(history.push).toHaveBeenCalled();
    });

});