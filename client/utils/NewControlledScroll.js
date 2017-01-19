import React, { Component, PropTypes, Children, cloneElement } from 'react';

import findKey from 'lodash/findKey';
import find from 'lodash/find';
import {findDOMNode} from 'react-dom';

export const BOTTOM_POSITION = -1;

export default (Comp)=>
class ControlledScroll extends Component {
  regs={};
  scrollHeight=null
  oldScrollHeight=null
  findFirstVisibleId=()=>{
    const scrollTop = this.scroll.getScrollTop();
    const key = findKey(this.regs,({elem})=>
    elem &&     elem.offsetTop + elem.offsetHeight > scrollTop
  );
  return key ? +key : null;
}
findElemByKey=(key)=>{
  return this.regs[key].elem;
}
goToKey=(key, top=true)=>{
  const elem = this.findElemByKey(key);
  if(elem) elem.scrollIntoView(top);
}
onUpdate=({scrollHeight, ...rest})=>{
  if (scrollHeight!=this.scrollHeight){
    this.scrollHeight=scrollHeight;
    this.onScrollStop();
  }
}
componentDidUpdate(prevProps, prevState){
  if(this.newItemsBefore){
    //if there is minimum 1 items befere first item,
    // then sctoll to new position, in order to persist old scroll position
    // after adding new items before old list.
    this.scroll.scrollTop(this.scroll.getScrollHeight() - this.oldScrollHeight);
    return this.newItemsBefore=false;
  }
  if(this.newItemsAfter){
    //if there is minimum 2 items after last item,
    // then allow  to perform default behavior for sroll
    return this.newItemsAfter=false;
  }
  this.applyPositionFromProps(this.props.position);
}
applyPositionFromProps=(position)=>{
  if(position==BOTTOM_POSITION) {
    this.scroll.scrollTop(this.scroll.getScrollHeight()-this.scroll.getClientHeight());
  }else{
    this.scroll.scrollTop(position);
  }
}
componentWillReceiveProps(nextProps){

  const prevLength = this.props.children.length;
  if(prevLength){
    if(nextProps.children.length > prevLength) {
      // if first element form old list exists in new list
      const index = nextProps.children.findIndex(c=>c.key==this.props.children[0].key);

      if(index<0)  return;
      const lastElem = this.props.children.slice(-1)[0];
      const lastIndex = nextProps.children.findIndex(c=>c.key==lastElem.key);

      if(index>-1){
        const checkBefore = nextProps.children[index-1];
        if(checkBefore) {
          this.newItemsBefore = true;
          this.oldScrollHeight =this.scroll.getScrollHeight();
        }else {
          //if thereis minimum 2 items after last index
          const newItemsAfter = nextProps.children[lastIndex+2];
          if(newItemsAfter) this.newItemsAfter=true;
        }
      }
    }
  }
}

onScrollStop=()=>{
  const scrollTop=this.scroll.getScrollTop();
  if(scrollTop !== this.props.position) {
    const scrollIsBottom = scrollTop==this.scroll.getScrollHeight()-this.scroll.getClientHeight();

    if(scrollIsBottom){
      this.onChange(BOTTOM_POSITION);
    }else{
      this.onChange(scrollTop);
    }
  }
}
onChange=(scrollTop)=>{
  if(scrollTop !== this.props.position) {
    this.props.onChange(scrollTop);
  }
}
render(){
  const {header, footer}=this.props;
  this.regs={};
  return (
    <Comp
      onScroll={this.props.onUpdate}
      onUpdate={this.onUpdate}
      className={this.props.className}
      style={this.props.style}
      ref={c=>this.scroll=c}
      onScrollStop={this.onScrollStop}
      onScrollFrame={this.props.onScrollFrame}
      >
      {header}
      {Children.map(this.props.children, ch=>
        cloneElement(ch, {ref:c=>this.regs[ch.key]={key:ch.key,elem:findDOMNode(c)}} )
      )}
      {footer}

    </Comp>);
    }
  };
