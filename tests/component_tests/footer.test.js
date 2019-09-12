import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from "enzyme";
import Footer from "../../src/components/Footer";
import { store } from '../../src/store/store';

import { links } from '../../src/constants/links';

configure({adapter: new Adapter()});


describe('Footer component', () => {

  // check component renders
  it('should render at least a div', () => {
    let shallowWrapper = shallow(<Footer />);
    expect(shallowWrapper.exists('div')).toEqual(true);
  });

  /*
  * Props
  - NO props
  */

  /*
   * State
   * - NO default state
   */

   /*
   * Events and state updates
   */
  it('should render contact us link to co-op contact us page', () => {
    let shallowWrapper = shallow(<Footer />);
    let link = shallowWrapper.find("a").at(0);
    expect(link.props().href).toEqual(links.footer[0].url);
  });

  it('should render accessibility link to co-op page', () => {
    let shallowWrapper = shallow(<Footer />);
    let link = shallowWrapper.find("a").at(1);
    expect(link.props().href).toEqual(links.footer[1].url);
  });

  it('should render terms and conditions link to co-op page', () => {
    let shallowWrapper = shallow(<Footer />);
    let link = shallowWrapper.find("a").at(2);
    expect(link.props().href).toEqual(links.footer[2].url);
  });

  it('should open contact us link in new tab', () => {
    let shallowWrapper = shallow(<Footer />);
    let link = shallowWrapper.find("a").at(0);
    expect(link.props().target).toEqual("_blank");
  });

  it('should open accessibility link in new tab', () => {
    let shallowWrapper = shallow(<Footer />);
    let link = shallowWrapper.find("a").at(1);
    expect(link.props().target).toEqual("_blank");
  });

  it('should open terms and conditions link in new tab', () => {
    let shallowWrapper = shallow(<Footer />);
    let link = shallowWrapper.find("a").at(1);
    expect(link.props().target).toEqual("_blank");
  });

});