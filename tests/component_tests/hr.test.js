import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import Hr from '../../src/components/Hr';

configure({adapter: new Adapter()});

describe('Hr component', () => {

  let shallowWrapper = shallow(<Hr />);

  it("testing div tag for render",()=>{
    const div = shallowWrapper.find('div');
    expect(div.length).toBeGreaterThanOrEqual(1);
  })
});