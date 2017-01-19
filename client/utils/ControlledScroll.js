import React, { Component, PropTypes, Children, cloneElement } from 'react';

import findKey from 'lodash/findKey';
import find from 'lodash/find';
import { findDOMNode } from 'react-dom';
import shallowEqual from 'shallowequal';

import { BOTTOM_POSITION } from '../actions';

export default Comp => {
  class ControlledScroll extends Component {
    regs={};
    scrollHeight=null;
    oldScrollHeight=null;

    findFirstVisibleId=()=>{
      const scrollTop = this.scroll.getScrollTop();
      const key = findKey(this.regs, ({elem})=>
      elem && elem.offsetTop + elem.offsetHeight > scrollTop );
      return key ? +key : null;
    }
    findLastVisibleId=()=>{
      const scrollTop = this.scroll.getScrollTop();
      const key = findKey(this.regs, ({elem})=>

      elem && elem.offsetTop + elem.offsetHeight > scrollTop

    );
      return key ? +key : null;
    }
    findElemByKey=(key)=>{
      return this.regs[key].elem;
    }
    findPostionOfElemByKey=(key)=>{
      if(!this.regs[key]) return false;
      const elem = this.regs[key].elem;
      if(!elem) return false;

      return elem.offsetTop + elem.offsetHeight;
    }
    goToKey=(key)=>{
      const elem = this.findElemByKey(key);
      if(elem) elem.scrollIntoView();
    }

    componentDidUpdate(prevProps, prevState){
      // const newPosition = this.unconvertPosition(this.props.position);
      //
      // if(newPosition!=this.scroll.getScrollTop()){
      //   this.scroll.scrollTop(newPosition);
      // }
    }
    getBottomPosition=()=>{
      return this.scroll.getScrollHeight()-this.scroll.getClientHeight();
    }
    isBottom=()=>{
      return this.getBottomPosition() == this.scroll.getScrollTop();
    }
    unconvertPosition=(position)=>{
      return position == BOTTOM_POSITION ? this.getBottomPosition() : position;
    }
    convertPosition=(position)=>{
      return position == this.getBottomPosition() ? BOTTOM_POSITION : position;
    }
    onUpdate=({scrollHeight})=>{
      if (scrollHeight!=this.scrollHeight){
        this.scrollHeight=scrollHeight;
        this.onScrollStop();
      }
    }
    onScrollStop=()=>{
      const scrollTop = this.scroll.getScrollTop();
      this.onChange(scrollTop);
    }
    onChange=(scrollTop)=>{
      if(scrollTop != this.unconvertPosition(this.props.position)){
        this.props.onChange(scrollTop, this.getBottomPosition());
      }
    }
    render(){
      const { renderThumbVertical,header,footer } = this.props;
      this.regs={};
      return (
        <Comp
          renderThumbVertical={renderThumbVertical}
          // onScroll={this.props.onUpdate}
          onUpdate={this.onUpdate}
          className={this.props.className}
          style={this.props.style}
          ref={c=>this.scroll=c}
          onScrollStop={this.onScrollStop}
          >
          {header}
          {Children.map(this.props.children, ch=>
            cloneElement(ch, {ref:c=>this.regs[ch.key]={key:ch.key,elem: findDOMNode(c)}} )
          )}
          {footer}
        </Comp>);
        }
      }

      return ControlledScroll;
    };
