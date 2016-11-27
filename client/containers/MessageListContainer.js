import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import MessageList from '../components/MessageList';
import autoBind from 'react-autobind';
import { socket } from '../actions/common/socketEvents';
import LoadMoreBlock from '../components/LoadMoreBlock';
import shallowEqual from 'shallowequal';
import slice from 'lodash/slice';
import uniq from 'lodash/uniq';
import findKey from 'lodash/findKey';
import isEqual from 'lodash/isEqual';

class MessageListContainer extends Component {
  registeredElements = {};
  shouldComponentUpdate(nextProps, nextState){
    return !isEqual(this.props, nextProps);
  }
  componentWillMount(){
    const {channelId} = this.props;
    this.props.fetchMessages(channelId)
    .then(()=> this.messageList.scrollView.scrollToBottom() );
  }
  componentDidMount(){
    this.props.onMount(this.messageList);
  }
  componentWillReceiveProps(nextProps){
    const {
      slice, scrollPosition, channelId:prevId,
      scrollIsBottom
    } = this.props;
    const {
      slice:newSlice, scrollPosition:newScrollPosition, channelId:nextId,
      scrollIsBottom:newScrollIsBottom
    } = nextProps;

    if (prevId !== nextId ) {
      this.handleSwitchChannel(prevId,nextId);
    }
    if (scrollPosition != newScrollPosition ) {
      this.syncScrollPosition(newScrollPosition);
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.scrollIsBottom != this.props.scrollIsBottom)
    this.syncScrollOnBottom(this.props.scrollIsBottom);
  }
  syncScrollOnBottom=(isScrollOnBottom)=>{
    if(isScrollOnBottom){
      this.messageList.scrollView.scrollToBottom();
    }
  }
  handleSwitchChannel=(prevId,nextId)=>{
    console.info('handleSwitchChannel');
    const channelInfo = {
      channelId: prevId,
      scrollPosition: this.messageList.scrollView.getScrollTop(),
      firstVisibleId: this.findFirstVisibleId()
    };

    // console.log('isScrollOnBottom',isScrollOnBottom);
    const { scrollPosition, firstVisibleId } = this.props;
    if (scrollPosition && firstVisibleId){
      this.messageList.scrollView.scrollTop(60);
    } else {
      // firstVisibleId is not saved,
      // (it means that that channel was never opened)
      this.messageList.scrollView.scrollToBottom();
    }

    const { isScrollOnBottom } = this.props;

    // if (!isScrollOnBottom){
    //   // this.messageList.scrollView.scrollTop(60);
    //   this.props.setScrollPosition(60, nextId);
    // } else {
    //   // firstVisibleId is not saved,
    //   // (it means that that channel was never opened)
    //   this.props.setScrollIsBottom(true, nextId);
    //   // this.messageList.scrollView.scrollToBottom();
    // }


    this.props.saveChannelInfo(channelInfo);
    this.props.unsetChannelHasNewMessages(nextId);
    this.props.setMinimumSliceForChannel(prevId);
    // this.props.fetchMessages(nextId).then(()=>{
    //
    //
    // });

  }
  // onChangeScrollHeight=()=>{
  //   this.props.setScrollPosition(
  //     this.messageList.scrollView.getScrollTop(), this.props.channelId
  //   );
  //   // this.props.setScrollIsBottom(true, this.props.channelId);
  // }
  regElem=(element)=>{
    this.registeredElements[element.id] = element;
  }
  unregElem=(element)=>{
    delete this.registeredElements[element.id];
  }
  findFirstVisibleId=()=>{
    return +findKey(this.registeredElements,({elem})=>
    elem.offsetTop + elem.offsetHeight > this.messageList.scrollView.getScrollTop());
    // elem.getBoundingClientRect().bottom > 0
  }
  onMessageEdit=(id)=>{
    this.props.setEditableMessage(id);
  }
  onMessageDelete=(id)=>{
    this.props.deleteMessage(id);
  }
  onSaveMessageEdit=(id,text)=>{
    if(text){
      this.props.unsetEditableMessage();
      this.props.editMessage(id,text);
    }
  }
  onCancelMessageEdit=()=>{
    this.props.unsetEditableMessage();
  }
  onScrollStop=()=>{
    console.log('');
    this.props.setScrollPosition(this.messageList.scrollView.getScrollTop(), this.props.channelId);
  }
  syncScrollPosition=(position)=>{
    this.messageList.scrollView.scrollTop(position);
  }
  onScrollBottom=()=>{
    this.loadMoreAfter();
    this.props.setScrollIsBottom(true, this.props.channelId);
  }
  onScrollNotBottom=()=>{
    this.props.setScrollIsBottom(false, this.props.channelId);
  }
  loadMoreAfter=()=>{
    this.props.loadMoreAfter(this.props.channelId);
  }
  loadMoreBefore=(oldScrollHeight)=>{
    const view = this.messageList.scrollView;
    this.props.loadMoreBefore(this.props.channelId)
    .then(()=> view.scrollTop(view.getScrollHeight() - oldScrollHeight));
  }
  render(){
    const {
      messages, allMessagesIds, messagesIsFetching, users, slice,
      editableMessageId,currentUserId
    } = this.props;
    return (
      <MessageList
        onSaveMessageEdit={this.onSaveMessageEdit}
        onCancelMessageEdit={this.onCancelMessageEdit}
        onMessageEdit={this.onMessageEdit}
        onMessageDelete={this.onMessageDelete}
        editableMessageId={editableMessageId}
        currentUserId={currentUserId}
        onMountMessage={this.regElem}
        onUnmountMessage={this.unregElem}
        messagesIds={slice}
        // onChangeScrollHeight={this.onChangeScrollHeight}
        onScrollStop={this.onScrollStop}

        onScrollTop={this.loadMoreBefore}
        onScrollBottom={this.onScrollBottom}
        onScrollNotBottom={this.onScrollNotBottom}
        users={users}
        ref={c=>this.messageList=c}
        messages={messages}>
        <LoadMoreBlock isLoading={messagesIsFetching}/>
      </MessageList>
    );
  }
}
const mapStateToProps = (state) =>{
  const { channelId } = state.ui.params;
  const channel  = state.pagination.idsByChannel[channelId];
  const {
    scrollPosition = null , lastVisibleMessage={},scrollIsBottom,
    firstVisibleId , slice = []
  } = channel||{};

  const { items:messages, isFetching } = state.entities.messages;
  return {
    channelId,
    currentUserId:state.auth.user,
    editableMessageId:state.ui.editableMessage,
    slice,
    users: state.entities.users.items,
    messages,
    messagesIsFetching: isFetching,
    scrollPosition,
    scrollIsBottom,
    firstVisibleId
  };
};

export default connect(mapStateToProps, Actions)(MessageListContainer);
