import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import MessageList from '../components/MessageList';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router';
import { socket } from '../actions/common/socketEvents';
import LoadMoreBlock from '../components/LoadMoreBlock';
import shallowEqual from 'shallowequal';
//edits new branch new new_loading_logic
import slice from 'lodash/slice';
class MessageListContainer extends Component {
    constructor(props){
        super(props);
        autoBind(this);
        this.state={currentIds:[]};
    }
    componentWillMount(){
        this.props.fetchMessages(this.props.params.channel_id)
        .then(()=> this.messageList.scrollView.scrollToBottom() );

        // socket.on('message', (message)=>{
        //     if(message.channelId == this.props.params.channel_id){

        //         //
        //     }
        //
        // });
    }

    componentWillReceiveProps(nextProps){

            // const {allMessagesIds:nextIds} = nextProps;
            // const {allMessagesIds:prevIds} = this.props;
            //


        const {channel_id:prevId} = this.props.params,
              {channel_id:nextId} = nextProps.params;
        const {allMessagesIds:prevMsgIds} = this.props,
              {allMessagesIds:nextMsgIds} = nextProps;

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
        if(!shallowEqual(prevMsgIds,nextMsgIds)/* && prevId !== nextId */){
        // console.log('>>>>',nextProps.allMessagesIds.slice(0,90));
        if(this.messageList.isScrollOnBottom()){
            this.setState({
                currentIds:nextProps.allMessagesIds.slice(0,90)
            });
        }

        console.log('айдишники поменялсь , это может значить подгрузку новых сообщений');
    }

}
handleSwitchChannel(prevId,nextId){
    //можно объеденить? saveScrollPosition и saveLastVisibleMessage
    this.props.saveScrollPosition(prevId,this.messageList.scrollView.getScrollTop());
    // this.props.saveLastVisibleMessage(prevId);//OK
    this.props.fetchMessages(nextId).then(()=>{//OK
        this.props.unsetChannelHasNewMessages(nextId); //OK

        if(this.props.scrollPosition){//OK
            this.messageList.scrollView.scrollTop(this.props.scrollPosition);
        }else{
            this.messageList.scrollView.scrollToBottom();
        }

    });
}
componentDidMount(){
    this.props.onMount(this.messageList);
}
//
// componentWillReceiveProps(nextProps){

// }
loadHistory(oldScrollHeight){
    console.log('oldScrollHeight',oldScrollHeight);

    if(this.checkBefore()){
        console.warn('есть еще вверху уже подгруженые');
        const firstId = this.state.currentIds[0];
        const index = this.props.allMessagesIds.indexOf(firstId);


        this.setState({
            currentIds:this.state.currentIds.slice(0,60)
        },()=>{
                let oldestHeight = this.messageList.scrollView.getScrollHeight();
            this.setState({
                currentIds:this.props.allMessagesIds.slice(index-30,index-30+90)
            },()=>{

                const newScrollHeight = this.messageList.scrollView.getScrollHeight();
                this.messageList.scrollView.scrollTop(newScrollHeight-oldestHeight);

            });
        });
    }else{
        console.warn('грузим с сервера');
        this.setState({
            currentIds:this.props.allMessagesIds.slice(0,60)
        },()=>{
            let oldestHeight = this.messageList.scrollView.getScrollHeight();
            this.props.fetchMessages(this.props.params.channel_id,true).then(()=>{
                this.setState({
                    currentIds:this.props.allMessagesIds.slice(0,90)
                });
                const newScrollHeight = this.messageList.scrollView.getScrollHeight();
                this.messageList.scrollView.scrollTop(newScrollHeight-oldestHeight);
            });

        });
    }
}
getStartPoint(){
    const lastId = this.state.currentIds[0];
    return  this.props.allMessagesIds.indexOf(lastId);
}
checkAfter(){
    console.log('checkAfter!!');
    const lastId = this.state.currentIds.slice(-1)[0];
    const index = this.props.allMessagesIds.indexOf(lastId);
    return !!this.props.allMessagesIds[index+1];

}
checkBefore(){
    console.log('checkBefore!!');
    const lastId = this.state.currentIds[0];
    const index = this.props.allMessagesIds.indexOf(lastId);
    return !!this.props.allMessagesIds[index-1];

}
onScrollBottom(){
    const view = this.messageList.scrollView;
    const { allMessagesIds, messagesIds }= this.props;
    if(allMessagesIds.length > this.state.currentIds.length && this.checkAfter()) {
        console.log('есть еще!');
        console.log('allMessagesIds',allMessagesIds.length);
        this.setState({
            currentIds:slice(allMessagesIds,this.getStartPoint(),this.getStartPoint()+120)
        },()=>{
            console.log('прибавили ', this.state.currentIds.length);
            let oldHeight = view.getScrollHeight();

            let oldscrollTop = view.getScrollTop();
            // console.log('oldscrollTop',oldscrollTop);
            this.setState({
                currentIds:slice(this.state.currentIds,30,120)
            },()=>{
                console.log('почикали ',this.state.currentIds.length);
                view.scrollTop(oldscrollTop-(oldHeight-view.getScrollHeight()));
            });
        });
    }
}
render(){
    const {
        messages, messagesIds,
        messagesIsFetching, users
    } = this.props;
    return (
        <MessageList
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
        ids:messagesIds = [], scrollPosition = null , lastVisibleMessage={}
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
        scrollPosition
    };
};

export default withRouter(connect(mapStateToProps, Actions)(MessageListContainer));
