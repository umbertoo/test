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
  state = { currentIds:[], curChannel:null };
  registeredElements = {};
  shouldComponentUpdate(nextProps, nextState){
      return !isEqual(this.props, nextProps)
       || !isEqual(this.state, nextState);
  }
  componentWillMount(){
    const {channelId} = this.props;
    this.props.fetchMessages(channelId)
    .then(()=> this.messageList.scrollView.scrollToBottom() );
  }
  componentDidMount(){
    this.props.onMount(this.messageList);
  }
  componentDidUpdate(prevProps, prevState){
    // const {channelId:prevId} = nextProps;
    // const {channelId:nextId} = this.props;
    // // console.info(prevId,nextId,prevId == nextId);
    // if (prevId != nextId) {
    //   this.handleSwitchChannel(prevId,nextId);
    // }
  }
    componentWillReceiveProps(nextProps){
    const {channelId:prevId} = this.props;
    const {channelId:nextId} = nextProps;
    console.info(prevId,nextId,this.state.curChannel,prevId == nextId);
    if (prevId !== nextId ) {
      // this.setState({curChannel :nextId });
      this.handleSwitchChannel(prevId,nextId);
    }

    const {allMessagesIds:prevMsgIds} = this.props;
    const {allMessagesIds:nextMsgIds} = nextProps;

    const nextLastId = nextMsgIds.slice(-1)[0];
    const prevLastId = prevMsgIds.slice(-1)[0];
  }
  handleSwitchChannel=(prevId,nextId)=>{
    console.info('handleSwitchChannel');
    const channelInfo = {
      channelId: prevId,
      scrollPosition: this.messageList.scrollView.getScrollTop(),
      firstVisibleId: this.findFirstVisibleId()
    };
    this.props.saveScrollPosition(channelInfo);

    this.props.fetchMessages(nextId).then(()=>{

      const { scrollPosition, firstVisibleId } = this.props;
      if (scrollPosition && firstVisibleId){
        this.messageList.scrollView.scrollTop(60);
      } else {
        // firstVisibleId is not saved,
        // (it means that that channel was never opened)
        this.messageList.scrollView.scrollToBottom();
      }
    });
    this.props.unsetChannelHasNewMessages(nextId);

  }

  loadMoreBefore=(oldScrollHeight)=>{
    const view = this.messageList.scrollView;
    this.props.loadMoreBefore(this.props.channelId)
    .then(()=> view.scrollTop(view.getScrollHeight() - oldScrollHeight));
  }

  loadMoreAfter=()=>{
    this.props.loadMoreAfter(this.props.channelId);
  }
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
  }
  render(){
    const {
      messages, allMessagesIds, messagesIsFetching, users, slice,
      editableMessageId,currentUser
    } = this.props;
    console.log('MessageListContainer');
    return (
      <MessageList
        onSaveMessageEdit={this.onSaveMessageEdit}
        onCancelMessageEdit={this.onCancelMessageEdit}
        onMessageEdit={this.onMessageEdit}
        onMessageDelete={this.onMessageDelete}
        editableMessageId={editableMessageId}
        currentUser={currentUserId}
        onScrollStop={this.onScrollStop}
        onMountMessage={this.regElem}
        onUnmountMessage={this.unregElem}
        messagesIds={slice}
        onScrollTop={this.loadMoreBefore}
        onScrollBottom={this.loadMoreAfter}
        users={users}
        ref={c=>this.messageList=c}
        messages={messages}>
        <LoadMoreBlock isLoading={messagesIsFetching}/>
      </MessageList>
    );
  }
}
const mapStateToProps = (state) =>{
  const channel  = state.pagination.idsByChannel[state.ui.params.channelId];
  const {
    ids:messagesIds = [], scrollPosition = null , lastVisibleMessage={},
    firstVisibleId , slice = []
  } = channel||{};

  const messages = state.entities.messages.items;
  return {
    channelId:state.ui.params.channelId,
    currentUserId:state.auth.user,
    editableMessageId:state.ui.editableMessage,
    slice,
    allMessagesIds: messagesIds,
    users: state.entities.users.items,
    messages: messages,
    messagesIsFetching: state.entities.messages.isFetching,
    scrollPosition,
    firstVisibleId
  };
};

export default connect(mapStateToProps, Actions)(MessageListContainer);
