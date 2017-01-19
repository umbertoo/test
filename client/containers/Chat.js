import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ChannelListContainer from '../containers/ChannelListContainer';
import MessageForm from '../components/MessageForm';
import TypingIndicator from '../components/TypingIndicator';
import UserListContainer from '../containers/UserListContainer';
import MessageListContainer from '../containers/MessageListContainer';
import ChatHeaderContainer from '../containers/ChatHeaderContainer';
import ServersListContainer from '../containers/ServersListContainer';
import ServerMenuContainer from '../containers/ServerMenuContainer';
import UserBlockContainer from '../containers/UserBlockContainer';
import '../static/scss/chat.scss';

import throttle from 'lodash/throttle';
import ifvisible from 'ifvisible.js';
import ConfirmDialogContainer from '../containers/ConfirmDialogContainer';
import SocketContainer from '../containers/SocketContainer';

class Chat extends Component {
  state={
    message_input_height:66,
    sidePanelIsOpen:JSON.parse(localStorage.getItem('sidePanelIsOpen'))
  }
  onTypingMessage=()=>{
    this.props.sendTyping(this.props.params.channelId);
  }
  onTypingMessage = throttle(this.onTypingMessage, 8000, {trailing :false})
  componentWillMount(){
    this.props.fetchServers();
    this.props.fetchCurrentUser();
    window.onbeforeunload=()=>{
      console.log('onbeforeunload');
      localStorage.setItem('aaaa',2);
    };
  }
  componentDidMount(){
    ifvisible.on("blur",()=>this.props.windowBlur(this.props.params.channelId));
  }
  handleChangeHeightMessageForm=(height)=>{
    const view =this.messageList.scrollView;
    let callback = ()=>{};
    //if scrollOnBottom
    if(view.getScrollTop()+view.getClientHeight()==view.getScrollHeight()){
      callback = view.scrollToBottom;
    }
    this.setState({
      message_input_height:this.refs.messageForm.offsetHeight
    }, callback);
  }
  onClickSidePanel=()=>{
    this.setState({
      sidePanelIsOpen:!this.state.sidePanelIsOpen
    },()=> {
      localStorage.setItem('sidePanelIsOpen',this.state.sidePanelIsOpen);
    });
  }
  sendMessage=(text)=>{
    if(text){
      const {channelId, serverId} = this.props.params;
      this.props.createMessage({text,channelId,serverId });
      this.onTypingMessage.cancel();
    }
  }
  onMountMessageListContainer=(c)=>this.messageList=c
  render(){
    const { message_input_height, sidePanelIsOpen } = this.state;
    const { params:{serverId, channelId} } = this.props;

    const paddingRight = sidePanelIsOpen ? 200+'px' : 0;
    return (
      <div className="chat">
        <ConfirmDialogContainer/>

        <div className="chat__col-left">
          <div className="chat__servers-list-place">
            <ServersListContainer serverId={serverId} />
          </div>
          <div className="chat__channels-list-place">
            <ServerMenuContainer serverId={serverId}/>
            <ChannelListContainer serverId={serverId} channelId={channelId}/>
            <UserBlockContainer />
          </div>
        </div>
        <div className="chat__col-right">
          <ChatHeaderContainer channelId={channelId} serverId={serverId} onClickSidePanel={this.onClickSidePanel}/>
          <div className="chat__body" style={{paddingRight}}>
            <div className="chat__body-top"
              style={{paddingBottom:message_input_height+'px'}}>
              <MessageListContainer serverId={serverId} channelId={channelId}
                onMount={this.onMountMessageListContainer} />
            </div>
            <div ref="messageForm" className="chat__body-bottom" style={{paddingRight}}>
              <MessageForm
                onTypingMessage={this.onTypingMessage}
                onChangeHeight={this.handleChangeHeightMessageForm}
                onSubmit={this.sendMessage} />
              <TypingIndicator channelId={channelId}/>
            </div>
            {sidePanelIsOpen &&
              <div className="chat__side-panel">
                <UserListContainer />
              </div>
            }
          </div>
        </div>
      </div>
        );
      }
    }

    export default SocketContainer(connect(null,actions)(Chat));
