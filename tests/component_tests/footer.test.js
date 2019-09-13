import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import Footer from "../../src/components/Footer";
import { store } from '../../src/store/store';


configure({adapter: new Adapter()});


describe('Footer component', () => {

  // check component renders
  it('should render at least a div', () => {
    let shallowWrapper = shallow(<Footer />);
    expect(shallowWrapper.exists('div')).toEqual(true);
  });



});
