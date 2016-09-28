import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import MessageList from '../components/MessageList';
import autoBind from 'react-autobind';
import { withRouter } from 'react-router';
import { socket } from '../actions/common/socketEvents';
import LoadMoreBlock from '../components/LoadMoreBlock';
import shallowEqual from 'shallowequal';
import slice from 'lodash/slice';
import uniq from 'lodash/uniq';
import findKey from 'lodash/findKey';

class MessageListContainer extends Component {
    constructor(props){
        super(props);
        autoBind(this);
        this.state={currentIds:[]};
        this.registeredElements={};
    }
    componentWillMount(){
        this.props.fetchMessages(this.props.params.channel_id)
        .then(()=> this.messageList.scrollView.scrollToBottom() );
        this.props.selectChannel(this.props.params.channel_id);
    }
    componentDidMount(){
        this.props.onMount(this.messageList);
    }
    componentWillReceiveProps(nextProps){
        const {channel_id:prevId} = this.props.params;
        const {channel_id:nextId} = nextProps.params;

        if (prevId !== nextId) {
            this.handleSwitchChannel(prevId,nextId);
        }

        const {allMessagesIds:prevMsgIds} = this.props;
        const {allMessagesIds:nextMsgIds} = nextProps;

        const nextLastId = nextMsgIds.slice(-1)[0];
        const prevLastId = prevMsgIds.slice(-1)[0];

        // if (prevMsgIds.length && nextMsgIds.length > prevMsgIds.length && nextLastId !== prevLastId){
        //     const message = nextProps.messages[nextLastId];
        //     console.log('new MESSAGE CATCHED!',message);
        //
        //     if(this.messageList.isScrollOnBottom()){
        //         console.log('крутим вниз');
        //         this.messageList.scrollView.scrollTop(this.messageList.scrollView.getScrollHeight()-5);
        //     }
        // }

    }
    handleSwitchChannel(prevId,nextId){
        const channelInfo = {
            channelId: prevId,
            scrollPosition: this.messageList.scrollView.getScrollTop(),
            firstVisibleId: this.findFirstVisibleId()
        };
        this.props.saveScrollPosition(channelInfo);
        // this.props.saveLastVisibleMessage(prevId);
        this.props.selectChannel(nextId);

        this.props.fetchMessages(nextId).then(()=>{

            this.props.unsetChannelHasNewMessages(nextId);
            const { scrollPosition, firstVisibleId } = this.props;
            if (scrollPosition && firstVisibleId){
                this.messageList.scrollView.scrollTop(60);
            } else {
                // firstVisibleId is not saved,
                // (it means that that channel was never opened)
                this.messageList.scrollView.scrollToBottom();
            }
        });
    }

    loadMoreBefore(oldScrollHeight){
        const view = this.messageList.scrollView;
        this.props.loadMoreBefore(this.props.params.channel_id)
        .then(()=> view.scrollTop(view.getScrollHeight() - oldScrollHeight));
    }

    loadMoreAfter(){
        this.props.loadMoreAfter(this.props.params.channel_id);
    }
    regElem(element){
        this.registeredElements[element.id] = element;
    }
    unregElem(element){
        delete this.registeredElements[element.id];
    }
    findFirstVisibleId(){
        return +findKey(this.registeredElements,({elem})=>
        elem.offsetTop + elem.offsetHeight > this.messageList.scrollView.getScrollTop());
        // elem.getBoundingClientRect().bottom > 0
    }
    onMessageEdit(id){
      console.log('onMessageEdit <<<<<<<',id);
      this.props.setEditableMessage(id);
    }
    onMessageDelete(id){
      console.log('onMessageEdit <<<<<<<',id);
      this.props.deleteMessage(id);
    }
    onSaveMessageEdit(id,text){
      console.log('onSaveMessageEdit <<<<<<<',id,text);
      if(text){
        this.props.unsetEditableMessage();
        this.props.editMessage(id,text);
      }
    }
    onCancelMessageEdit(){
      this.props.unsetEditableMessage();
      console.log('onCancelMessageEdit <<<<<<<');
    }
    onScrollStop(){
    }
    render(){
        const {
            messages, allMessagesIds, messagesIsFetching, users, slice,
            editableMessage
        } = this.props;
        return (
            <MessageList
              onSaveMessageEdit={this.onSaveMessageEdit}
              onCancelMessageEdit={this.onCancelMessageEdit}
              onMessageEdit={this.onMessageEdit}
              onMessageDelete={this.onMessageDelete}
              editableMessage={editableMessage}

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
    const channel  = state.pagination.idsByChannel[state.ui.selectedChannel];
    let {
        ids:messagesIds = [], scrollPosition = null , lastVisibleMessage={},
        firstVisibleId , slice = []
    } = channel||{};

    const messages = state.entities.messages.items;
    return {
        editableMessage:state.ui.editableMessage,
        slice,
        allMessagesIds: messagesIds,
        users: state.entities.users.items,
        messages: messages,
        messagesIsFetching: state.entities.messages.isFetching,
        scrollPosition,
        firstVisibleId
    };
};

export default withRouter(connect(mapStateToProps, Actions)(MessageListContainer));
