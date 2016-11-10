// import helpers from './helpers/browser';
import React from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import Input from 'react-input-autosize';

import Select from '../client/components/Select';
import Tether from 'react-tether';
import Option from '../client/components/Select/Option';
import OptionsList from '../client/components/Select/OptionsList';



describe('<Select />', ()=> {

  it('should have Input component', ()=> {
    const wrapper = shallow(<Select />);
    expect(wrapper.find(Input)).to.have.length(1);
  });

  it('should have Tether component', ()=> {
    const wrapper = shallow(<Select />);
    expect(wrapper.find(Tether)).to.have.length(1);
  });

  it('should have OptionsList component if state isOpen:true', ()=> {
    const wrapper = shallow(<Select />);
    wrapper.setState({isOpen:true});

    const menu = new ReactWrapper(wrapper.find(Tether).node.props.children[1]);
    expect(menu.find(OptionsList)).to.have.length(1);
  });

  it('should not have OptionsList component if state isOpen:false', function(){
    const wrapper = shallow(<Select />);
    wrapper.setState({isOpen:false});

    const menu = wrapper.find(Tether).prop('children')[1];
    expect(menu).to.be.false;
  });









  // it('should have an image to display the gravatar', ()=> {
  //   const wrapper = shallow(<Avatar/>);
  //   expect(wrapper.find('img')).to.have.length(1);
  // });
  //
  // it('should have props for email and src', ()=> {
  //   const wrapper = shallow(<Avatar/>);
  //   expect(wrapper.props().email).to.be.defined;
  //   expect(wrapper.props().src).to.be.defined;
  // });
});
