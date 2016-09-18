import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import MessageList from '../components/MessageList';
import autoBind from 'react-autobind';
import { withRouter } from 'react-router';
import { socket } from '../actions/common/socketEvents';
import LoadMoreBlock from '../components/LoadMoreBlock';
import shallowEqual from 'shallowequal';
//edits new branch new new_loading_logic
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
    }

    componentWillReceiveProps(nextProps){
        const {channel_id:prevId} = this.props.params;
        const {channel_id:nextId} = nextProps.params;
        const {allMessagesIds:prevMsgIds} = this.props;
        const {allMessagesIds:nextMsgIds} = nextProps;

        const nextLastId = nextMsgIds.slice(-1)[0];
        const prevLastId = prevMsgIds.slice(-1)[0];

        if( prevMsgIds.length && nextMsgIds.length > prevMsgIds.length && nextLastId !== prevLastId){
            let message = nextProps.messages[nextLastId];
            console.log('new MESSAGE CATCHED!',message);

            if(this.messageList.isScrollOnBottom()){
                console.log('крутим вниз');
                this.messageList.scrollView.scrollTop(
                    this.messageList.scrollView.getScrollHeight()-5
                );
            }
        }
        if(prevId !== nextId) {
            this.handleSwitchChannel(prevId,nextId);
        }
    }
    handleSwitchChannel(prevId,nextId){
        this.props.saveScrollPosition(prevId, this.messageList.scrollView.getScrollTop(), this.findFirstVisibleId());
        // this.props.saveLastVisibleMessage(prevId);
        this.props.switchChannel(nextId);

        this.props.fetchMessages(nextId)
        .then(()=>{
            this.props.unsetChannelHasNewMessages(nextId);
            const { scrollPosition, firstVisibleId, allMessagesIds } = this.props;

            if(scrollPosition && firstVisibleId){
                const index = allMessagesIds.indexOf(firstVisibleId);
                this.setState({
                    currentIds: allMessagesIds.slice(index, index+30)
                });
                this.messageList.scrollView.scrollTop(60);
            }else{
                this.setState({ currentIds: allMessagesIds });
                this.messageList.scrollView.scrollToBottom();
            }

        });


    }
    componentDidMount(){
        this.props.onMount(this.messageList);
    }
    checkMoreBefore(){
        // console.log('checkBefore!!');
        const lastId = this.state.currentIds[0];
        const index = this.props.allMessagesIds.indexOf(lastId);
        return this.props.allMessagesIds.slice(0,index).length;
    }
    loadMoreBefore(oldScrollHeight){
        // console.log('oldScrollHeight',oldScrollHeight);
        if(this.checkMoreBefore()){
            console.warn('есть еще вверху уже подгруженые');
            const firstId = this.state.currentIds[0];
            const index = this.props.allMessagesIds.indexOf(firstId)-1;
            // const oldScrollHeight = this.messageList.scrollView.getScrollHeight();
            const start = index-30 < 0 ? 0 : index-30;
            this.setState({
                currentIds:[...this.props.allMessagesIds.slice(start,index),...this.state.currentIds]
            },()=>{
                const newScrollHeight = this.messageList.scrollView.getScrollHeight();
                this.messageList.scrollView.scrollTop(newScrollHeight-oldScrollHeight);
            });
        }else{
            console.warn('грузим с сервера');
            this.props.fetchMessages(this.props.params.channel_id,true).then(()=>{
                const firstId = this.state.currentIds[0];
                const index = this.props.allMessagesIds.indexOf(firstId)-1;
                const sliced = this.props.allMessagesIds.slice(0,index);
                this.setState({
                    currentIds:[...sliced,...this.state.currentIds]
                },()=>{
                    const newScrollHeight = this.messageList.scrollView.getScrollHeight();
                    this.messageList.scrollView.scrollTop(newScrollHeight-oldScrollHeight);
                });
              });

        }
    }
    checkMoreAfter(){
        const lastId = this.state.currentIds.slice(-1)[0];
        const index = this.props.allMessagesIds.indexOf(lastId);
        return !!this.props.allMessagesIds[index+1];
    }
    loadMoreAfter(){
        const view = this.messageList.scrollView;
        const { allMessagesIds, messagesIds }= this.props;
        if(allMessagesIds.length > this.state.currentIds.length && this.checkMoreAfter()) {
            console.log('есть еще!');
            let lastId = 1+this.props.allMessagesIds.indexOf(this.state.currentIds.slice(-1)[0]);
            this.setState({
                currentIds:[...this.state.currentIds,...slice(allMessagesIds,lastId,lastId+30)]
            });
        }
    }
    regElem(message){
        this.registeredElements[message.id]=message;
    }
    unregElem(message){
        delete this.registeredElements[message.id];
    }
    findFirstVisibleId(){
        return +findKey(this.registeredElements,({elem})=>
            elem.offsetTop + elem.offsetHeight > this.messageList.scrollView.getScrollTop()
            // elem.getBoundingClientRect().bottom > 0
        );
    }
    onScrollStop(){
    }
    render(){
        const {
            messages, allMessagesIds,
            messagesIsFetching, users
        } = this.props;
        return (
            <MessageList
              onScrollStop={this.onScrollStop}
              onMountMessage={this.regElem}
              onUnmountMessage={this.unregElem}
              messagesIds={this.state.currentIds}
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
const mapStateToProps = (state,props) =>{
    const channel  = state.pagination.idsByChannel[props.params.channel_id];
    let {
        ids:messagesIds = [], scrollPosition = null , lastVisibleMessage={},
        firstVisibleId
    } = channel||{};

    const messages = state.entities.messages.items;
    return {
        allMessagesIds:messagesIds,
        // lastVisibleMessage,
        users: state.entities.users.items,
        // messages: messagesIds.map(id => messages[id]),
        messages: messages,
        messagesIsFetching: state.entities.messages.isFetching,
        scrollPosition,
        firstVisibleId
    };
};

export default withRouter(connect(mapStateToProps, Actions)(MessageListContainer));
