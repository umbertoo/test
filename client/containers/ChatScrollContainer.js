import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ControlledScroll from '../utils/ControlledScroll.js';
import { Scrollbars } from 'react-custom-scrollbars';
import LoadMoreBlock from '../components/LoadMoreBlock';
import { BOTTOM_POSITION } from '../actions';
import shallowEqual from 'shallowequal';
import isEqual from 'lodash/isEqual';
const Scroll = ControlledScroll(Scrollbars);

function checkBefore( prevList, nextList ){
  // if first element form prevlist exists in nextList
  const firstChild = prevList.find(c=>c.props.id);
  if(!firstChild) return false;
  const index = nextList.findIndex(c=>c.key==firstChild.key);
  if(index<0)  return false;
  return !!nextList[index-1];
}

// function checkAfterMinTwo( prevList,nextList ){
//   const lastElem = prevList.slice(-1)[0];
//
//   const lastIndex = nextList.findIndex(c=>c.key==lastElem.key);
//   //if there is minimum 2 items after last index
//   return !!nextList[lastIndex+2];
// }

class ChatScrollContainer extends Component {
  isBottom={}
  shouldComponentUpdate(nextProps, nextState){
    return !isEqual(nextProps,this.props);
  }
  jumpToNewMessagesLabel=()=>{
    const position = this.scrollView.findPostionOfElemByKey("new_messages");
    this.scrollView.scroll.scrollTop(position);
  }
  componentDidUpdate(prevProps, prevState){
    // if channel was not opened,
    if(!prevProps.children.length){
      // jump to new_messages label, if exists
      if(this.newMessagesLabelExists()) return this.jumpToNewMessagesLabel();
      // jump to bottom if messages was loaded
      if(this.props.children.length) return this.scrollView.scroll.scrollToBottom();
    }
    // if channel was changed
    if (prevProps.channelId != this.props.channelId)  {
      if(this.newMessagesLabelExists())  return this.jumpToNewMessagesLabel();

      if(this.isBottom[this.props.channelId] ){
        this.scrollView.scroll.scrollToBottom();
      }else this.scrollView.scroll.scrollTop(60);
      return;
    }
    if(this.newItemsBefore){
      console.log('newItemsBefore');
      this.scrollView.scroll.scrollTop(this.scrollView.scroll.getScrollHeight() - this.oldScrollHeight);
      return this.newItemsBefore=false;
    }
    if(this.scrollToBottom){
      console.log('scrollToBottom');
      this.scrollView.scroll.scrollToBottom();
      return this.scrollToBottom=false;
    }
  }
  newMessagesLabelExists=()=>{
    return this.props.children.find(c=>c.key=='new_messages');
  }
  newOwnMessage=(prevProps,nextProps)=>{
    return prevProps.lastOwnMessageId && prevProps.lastOwnMessageId !== nextProps.lastOwnMessageId;
  }
  newMessage=(prevProps,nextProps)=>{
    return prevProps.lastNotOwnMessageId && prevProps.lastNotOwnMessageId !== nextProps.lastNotOwnMessageId ;
  }
  componentWillReceiveProps(nextProps){
    const {children:prevList, channelId:prevChannelId} = this.props;
    const {children:nextList, channelId:nextChannelId} = nextProps;

    if(prevChannelId != nextChannelId) {
      this.isBottom[prevChannelId] = this.scrollView.isBottom();
    }else{
      if(this.newOwnMessage(this.props, nextProps) || (this.newMessage(this.props, nextProps) && this.scrollView.isBottom())){
        this.scrollToBottom=true;

      }else  if(checkBefore(prevList, nextList)){
        this.newItemsBefore = true;
        this.oldScrollHeight = this.scrollView.scroll.getScrollHeight()-this.scrollView.scroll.getScrollTop();
      }

    }
  }
  onChange=(scrollTop, bottomPosition)=>{
    if(scrollTop > bottomPosition-60  && !this.props.isLoadingMore && this.props.moreAfter){
      return  this.props.loadMoreAfter(scrollTop);
    }
    this.props.onChangeScroll(scrollTop, bottomPosition);
    if(scrollTop<60 && !this.props.isLoadingMore && this.props.moreBefore){
      return  this.props.loadMoreBefore();
    }

  }

  renderScrollTumb = (props) => <div {...props} className="message-list__thumb-vertical"/>;
  footer = <div className="message-list__footer"/>
  render(){

    const {
      scrollPosition,
      isLoadingMoreBefore, isLoadingMoreAfter,
      moreBefore, moreAfter,
    } = this.props;

    return (

      <Scroll
        // newMessagesRef={this.NEW_MESSAGES}
        // position={scrollPosition}
        onChange={this.onChange}
        className={this.props.className}
        renderThumbVertical={this.renderScrollTumb}
        ref={c=>this.scrollView=c}
        header = {moreBefore && <LoadMoreBlock onClick={this.props.loadMoreBefore} isLoading={isLoadingMoreBefore}/>}
        footer = {moreAfter && <LoadMoreBlock onClick={this.props.loadMoreAfter} isLoading={isLoadingMoreAfter}/>}
        >
        {this.props.children}

      </Scroll>


      );
    }
  }

  export default ChatScrollContainer;
  // export default connect(mapStateToProps, Actions)(ChatScrollContainer);
