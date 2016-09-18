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
            this.props.switchChannel(nextId);
        }
        // if(!shallowEqual(prevMsgIds,nextMsgIds)/* && prevId !== nextId */){
        //     // console.log('>>>>',nextProps.allMessagesIds.slice(0,90));
        //     if(this.messageList.isScrollOnBottom()){
        //         this.setState({
        //             currentIds:nextProps.allMessagesIds.slice(0,90)
        //         });
        //     }
        //
        //     console.log('айдишники поменялсь , это может значить подгрузку новых сообщений');
        // }

    }
    handleSwitchChannel(prevId,nextId){
        //можно объеденить? saveScrollPosition и saveLastVisibleMessage
        this.props.saveScrollPosition(prevId, this.messageList.scrollView.getScrollTop(), this.findFirstVisibleId());

        // this.props.saveLastVisibleMessage(prevId);
        this.props.fetchMessages(nextId).then(()=>{
            this.props.unsetChannelHasNewMessages(nextId);
            const { scrollPosition, firstVisibleId, allMessagesIds } = this.props;

            if(scrollPosition && firstVisibleId){
                const index = allMessagesIds.indexOf(firstVisibleId);
                // console.log('вырезка', allMessagesIds.slice(index,index+45));
                this.setState({
                    currentIds: allMessagesIds.slice(index,index+30)
                });
                this.messageList.scrollView.scrollTop(60);
            }else{
                this.setState({
                    currentIds: allMessagesIds
                });
                this.messageList.scrollView.scrollToBottom();

            }

        });
    }
    componentDidMount(){
        this.props.onMount(this.messageList);
    }
    checkBefore(){
        // console.log('checkBefore!!');
        const lastId = this.state.currentIds[0];
        const index = this.props.allMessagesIds.indexOf(lastId);
        return this.props.allMessagesIds.slice(0,index).length;
    }
    loadHistory(oldScrollHeight){
        // console.log('oldScrollHeight',oldScrollHeight);
        if(this.checkBefore()){
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
                // const oldScrollHeight = this.messageList.scrollView.getScrollHeight();
                // let start = index-30 < 0 ? 0 : index-30;
                const sliced = this.props.allMessagesIds.slice(0,index);
                this.setState({
                    // currentIds:[...sliced,...this.state.currentIds]
                    currentIds:[...sliced,...this.state.currentIds]
                },()=>{
                    const newScrollHeight = this.messageList.scrollView.getScrollHeight();
                    this.messageList.scrollView.scrollTop(newScrollHeight-oldScrollHeight);
                });
              });

        }
    }
    checkAfter(){
        console.log('checkAfter!!');
        const lastId = this.state.currentIds.slice(-1)[0];
        const index = this.props.allMessagesIds.indexOf(lastId);
        return !!this.props.allMessagesIds[index+1];

    }
    onScrollBottom(){
        const view = this.messageList.scrollView;
        const { allMessagesIds, messagesIds }= this.props;
        if(allMessagesIds.length > this.state.currentIds.length && this.checkAfter()) {
            console.log('есть еще!');
            console.log('allMessagesIds',allMessagesIds.length);
            let lastId = 1+this.props.allMessagesIds.indexOf(this.state.currentIds.slice(-1)[0]);
            this.setState({
                currentIds:[...this.state.currentIds,...slice(allMessagesIds,lastId,lastId+30)]
            });
        }
    }
    regELem(message){
        this.registeredElements[message.id]=message;
    }
    unregELem(message){
        delete this.registeredElements[message.id];
    }
    findFirstVisibleId(){
        return +findKey(this.registeredElements,({elem})=>
            elem.offsetTop+elem.offsetHeight > this.messageList.scrollView.getScrollTop()
            // elem.getBoundingClientRect().bottom > 0
        );
    }
    onScrollStop(){
        // console.log('Первое видимое', this.findFirstVisibleId());
    }
    render(){
        const {
            messages, allMessagesIds,
            messagesIsFetching, users
        } = this.props;
        return (
            <MessageList
              onScrollStop={this.onScrollStop}
              onMountMessage={this.regELem}
              onUnmountMessage={this.unregELem}
              messagesIds={this.state.currentIds}
              onScrollTop={this.loadHistory}
              onScrollBottom={this.onScrollBottom}
              users={users}
              ref={c=>this.messageList=c}
              messages={messages}>
                <LoadMoreBlock
                  isLoading={messagesIsFetching}/>
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

    // let reducedList = messagesIds.lenth>90? reduceList(messagesIds,90):
    const messages = state.entities.messages.items;
    return {
        allMessagesIds:messagesIds,
        // messagesIds:reduceList(messagesIds,90),
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
