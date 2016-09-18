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

        if (prevMsgIds.length && nextMsgIds.length > prevMsgIds.length && nextLastId !== prevLastId){
            const message = nextProps.messages[nextLastId];
            console.log('new MESSAGE CATCHED!',message);

            if(this.messageList.isScrollOnBottom()){
                console.log('крутим вниз');
                this.messageList.scrollView.scrollTop(this.messageList.scrollView.getScrollHeight()-5);
            }
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
        const lastId = this.state.currentIds[0];
        const index = this.props.allMessagesIds.indexOf(lastId);
        return this.props.allMessagesIds.slice(0,index).length;
    }
    loadMoreBefore(oldScrollHeight){
        const view = this.messageList.scrollView;
        const { currentIds } = this.state;

        const index = this.props.allMessagesIds.indexOf(currentIds[0]);
        if (this.checkMoreBefore()) {
            console.warn('есть еще вверху уже подгруженые');
            const start = index - 30 < 0 ? 0 : index - 30;

            this.setState({
                currentIds:[...this.props.allMessagesIds.slice(start, index-1),...currentIds]
            },()=>{
                view.scrollTop(view.getScrollHeight() - oldScrollHeight);
            });
        } else {
            console.warn('грузим с сервера');
            this.props.fetchMessages(this.props.params.channel_id, true).then(()=>{

                this.setState({
                    currentIds:[...this.props.allMessagesIds.slice(0, index-1),...currentIds]
                },()=>{
                    view.scrollTop(view.getScrollHeight() - oldScrollHeight);
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
        const { allMessagesIds } = this.props;
        const { currentIds } = this.state;
        if(this.checkMoreAfter()) {
            console.log('есть еще!');
            const index = 1 + allMessagesIds.indexOf(currentIds.slice(-1)[0]);
            this.setState({
                currentIds:[...currentIds, ...allMessagesIds.slice(index, index+30)]
            });
        }
    }
    regElem(element){
        this.registeredElements[element.id] = element;
    }
    unregElem(element){
        delete this.registeredElements[element.id];
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
            messages, allMessagesIds, messagesIsFetching, users
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
        allMessagesIds: messagesIds,
        // lastVisibleMessage,
        users: state.entities.users.items,
        messages: messages,
        messagesIsFetching: state.entities.messages.isFetching,
        scrollPosition,
        firstVisibleId
    };
};

export default withRouter(connect(mapStateToProps, Actions)(MessageListContainer));
