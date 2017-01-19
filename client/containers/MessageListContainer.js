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
import isEqual from 'lodash/isEqual';
import { getChannelData, getMessagesWithDividers, getLastOwnMessageId, getLastNotOwnMessageId } from '../selectors/selectors';

class MessageListContainer extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return !shallowEqual(this.props, nextProps);
  }
  componentWillMount(){
    const {channelId, serverId} = this.props;
    this.props.switchChannel({prevId:null, nextId:channelId});
  }
  componentDidMount(){ 
    this.props.onMount(this.messageList);
  }
  componentWillReceiveProps(nextProps){
    const { channelId:prevId } = this.props;
    const { channelId:nextId, serverId} = nextProps;
    if(nextProps.isBottomAndIsLastSlice && this.props.isBottomAndIsLastSlice !== nextProps.isBottomAndIsLastSlice){
      if(nextProps.messages.slice(-1)[0]){
        // this.props.updateMessageAck(nextProps.messages.slice(-1)[0].id);
      }
    }
    if (prevId !== nextId ) {
      this.handleSwitchChannel(prevId, nextId, serverId);
    }
  }
  handleSwitchChannel=(prevId, nextId, serverId)=>{
    console.log('message list');
    const firstVisibleId = this.messageList.scrollView.scrollView.findFirstVisibleId();
    this.props.switchChannel({prevId, nextId, firstVisibleId, serverId});
  }
  onMessageEdit=(id)=>{
    this.props.setEditableMessage(id);
  }
  onMessageDelete=(id)=>{
    // this.props.deleteMessage(id);
    this.props.deleteMessageWithConfirm(id);
  }
  onSaveMessageEdit=(id,text)=>{
    if(text){
      this.props.unsetEditableMessage();
      this.props.editMessageWithConfirm(id,text);
    }
  }
  onChangeScroll=(position,bottomPosition)=>{
    const {channelId} = this.props;
    this.props.setScrollPosition(position, channelId, bottomPosition);
  }
  loadMoreBefore=()=>{
    this.props.loadMoreBefore(this.props.channelId);
  }
  loadMoreAfter=(position)=>{
    this.props.loadMoreAfter(this.props.channelId,position);
  }
  render(){
    const {
      messages, messagesIsFetching, users,
      editableMessageId, currentUserId, scrollPosition,
      moreBefore, moreAfter,
      moreCacheBefore, moreCacheAfter ,channelId,
      newMessages,
      newMessagesAfterId,
      showIndicatorAboutNewMessages,
      lastOwnMessageId, lastNotOwnMessageId
    } = this.props;

    // console.log('MessageListContainer', this.props.moreBefore);
    return (
      <MessageList
        showIndicatorAboutNewMessages={showIndicatorAboutNewMessages}
        newMessages={newMessages}
        loadMoreBefore={this.loadMoreBefore}
        loadMoreAfter={this.loadMoreAfter}
        moreBefore={!!moreCacheBefore || moreBefore}
        moreAfter={!!moreCacheAfter || moreAfter}
        isLoadingMoreBefore={messagesIsFetching}
        isLoadingMoreAfter={false}

        lastOwnMessageId={lastOwnMessageId}
        lastNotOwnMessageId={lastNotOwnMessageId}

        onSaveMessageEdit={this.onSaveMessageEdit}
        onCancelMessageEdit={this.props.unsetEditableMessage}
        onMessageEdit={this.onMessageEdit}
        onMessageDelete={this.onMessageDelete}
        editableMessageId={editableMessageId}
        currentUserId={currentUserId}
        // onMountMessage={this.regElem}
        // onUnmountMessage={this.unregElem}
        channelId={channelId}
        newMessagesAfterId={newMessagesAfterId}
        scrollPosition={scrollPosition}
        onChangeScroll={this.onChangeScroll}
        users={users}
        ref={c=>this.messageList=c}
        messages={messages}/>

      );
    }
  }


  const mapStateToProps = (state,props) =>{
    const { channelId } = props;
    const {
      scrollPosition = null,
      firstVisibleId ,
      moreBefore=false, moreAfter=false,
      moreCacheBefore=false, moreCacheAfter=false,
      lastMessage,
      isBottomAndIsLastSlice,
      hasNewMessages,
      ids=[]
      // newMessages
    } = getChannelData(state,{channelId}) || {};
    // console.timeEnd('getMessages');
    const { isFetching  } = state.entities.messages;
    let newMessages=[];
    if(ids.length>2 && lastMessage){
      // console.log('HEllo');
      const index = ids.indexOf(lastMessage);
      if(index>=0) newMessages = ids.slice(index+1);

    }
    // console.log(moreBefore,'newMessages');
    const currentUserId =state.auth.user;

    return {
      lastOwnMessageId:getLastOwnMessageId(state,{channelId, currentUserId}),
      lastNotOwnMessageId:getLastNotOwnMessageId(state,{channelId, currentUserId}),
      isBottomAndIsLastSlice,
      newMessagesAfterId:lastMessage,
      showIndicatorAboutNewMessages:hasNewMessages,
      moreBefore,
      moreAfter,
      moreCacheBefore,
      moreCacheAfter,
      newMessages,
      currentUserId,
      editableMessageId:state.ui.editableMessage,
      users: state.entities.users.items,
      messages: getMessagesWithDividers(state, {channelId})||[],
      messagesIsFetching: isFetching,
      scrollPosition,
      firstVisibleId
    };
  };

  export default connect(mapStateToProps, Actions)(MessageListContainer);
