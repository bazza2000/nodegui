import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ErrorBox from "../../src/components/ErrorBox";

configure({adapter: new Adapter()});

describe('ErrorBox component', () => {
    
  // check component renders
  it('should render at least a div', () => {
    let shallowWrapper = shallow(<ErrorBox />);
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