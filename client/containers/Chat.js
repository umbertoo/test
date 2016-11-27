import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import MessageList from '../components/MessageList';
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
import { socket } from '../actions/common/socketEvents';
import throttle from 'lodash/throttle';
import syncParamsWithStore from '../utils/syncParamsWithStore';

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
      this.props.createMessage({text,channelId,serverId })
      .then(msg => {
        this.messageList.scrollView.scrollToBottom();
        this.onTypingMessage.cancel();
      });
    }
  }
  render(){
    const { message_input_height, sidePanelIsOpen } = this.state,
    paddingRight = sidePanelIsOpen ? 200+'px' : 0;
    return (
      <div className="chat">
        <div className="chat__col-left">
          <div className="chat__servers-list-place">
            <ServersListContainer />
          </div>
          <div className="chat__channels-list-place">
            <button className="ac" onClick={()=>this.props.setScrollPosition(99999999,this.props.params.channelId)}>AAAAAAAAAAAAA</button>

            <ServerMenuContainer />
            <ChannelListContainer />
            <UserBlockContainer />
          </div>
        </div>
        <div className="chat__col-right">
          <ChatHeaderContainer onClickSidePanel={this.onClickSidePanel}/>
          <div className="chat__body" style={{paddingRight}}>
            <div className="chat__body-top"
              style={{paddingBottom:message_input_height+'px'}}>
              <MessageListContainer
                onMount={c=>this.messageList=c} />
            </div>
            <div ref="messageForm" className="chat__body-bottom" style={{paddingRight}}>
              <MessageForm
                onTypingMessage={this.onTypingMessage}
                onChangeHeight={this.handleChangeHeightMessageForm}
                onSubmit={this.sendMessage} />
              <TypingIndicator />
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

export default syncParamsWithStore(connect(null,actions)(Chat));
