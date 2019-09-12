import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from "enzyme";
import ErrorHandling from '../../src/components/ErrorHandling';
import { store } from '../../src/store/store';

configure({adapter: new Adapter()});

describe('Error handling component', () => {
  let state={};
  let data={
    challenge:'abc'
  }
  const context = {
    store
  }
  let shallowWrapper = shallow(<ErrorHandling data location={state={isLoggedIn:false}} />, {context}).dive({context});

  it("testing button tag for redirection",()=>{
    const button = shallowWrapper.find('button');
    button.simulate('click');
  })
});