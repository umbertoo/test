import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import ChannelListContainer from '../containers/ChannelListContainer';
import MessageForm from '../components/MessageForm';
import TypingIndicator from '../components/TypingIndicator';
import UserListContainer from '../containers/UserListContainer';
import MessageListContainer from '../containers/MessageListContainer';
import ChatHeaderContainer from '../containers/ChatHeaderContainer';
import '../static/scss/chat.scss';
import '../static/scss/server-menu.scss';
import autoBind from 'react-autobind';
import * as actions from '../actions';
import { socket } from '../actions/common/socketEvents';
import { withRouter } from 'react-router';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

class Chat extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      message_input_height:66,
      sidePanelIsOpen:JSON.parse(localStorage.getItem('sidePanelIsOpen'))
    };
    this.onTypingMessage = throttle(this.onTypingMessage, 8000, {trailing :false});
  }
  componentWillMount(){
    this.props.fetchChannels(this.props.params.server_id);
    this.props.fetchCurrentUser();
  }
  sendMessage(text){
    if(text){
      const {channel_id:channelId, server_id:serverId} = this.props.params;
      console.log(serverId,'serverId');
      this.props.createMessage({text,channelId,serverId })
      .then(msg => {
        this.messageList.scrollView.scrollToBottom();
        this.onTypingMessage.cancel();

      });
    }
  }
  handleChangeHeightMessageForm(height){
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
  onTypingMessage(){
    this.props.sendTyping(this.props.params.channel_id);
    console.log('onTypingMessage...');
  }
  onClickSidePanel(){
    this.setState({
      sidePanelIsOpen:!this.state.sidePanelIsOpen
    },()=> {
      localStorage.setItem('sidePanelIsOpen',this.state.sidePanelIsOpen);
    });

  }
  render(){
    const { params:{channel_id} , user} = this.props,
    { message_input_height, sidePanelIsOpen } = this.state;
    const paddingRight = sidePanelIsOpen ? 200+'px' : 0;
    return (
        <div className="chat">
            <div className="chat__col-left">
                <div className="server-menu">
                    Server <br/>
                    <span>user.name {user.name}</span> <br/>
                    <span>user.id {user.id}</span> <br/>
                    <img src={user.avatar}/>
                </div>
                <br/><br/><br/>
                <ChannelListContainer />
            </div>
            <div className="chat__col-right">
                <ChatHeaderContainer onClickSidePanel={this.onClickSidePanel}/>
                <div className="chat__body" style={{paddingRight}}>

                    <div className="chat__body-top"
                      style={{paddingBottom:message_input_height+'px'}}>
                        <MessageListContainer onMount={c=>this.messageList=c} />
                    </div>
                    <div ref="messageForm" className="chat__body-bottom" style={{paddingRight}}>

                        <MessageForm
                          onTypingMessage={this.onTypingMessage}
                          onChangeHeight={this.handleChangeHeightMessageForm}
                          onSubmit={this.sendMessage} />
                        <TypingIndicator channelId={channel_id} />
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
const mapStateToProps = (state)=>({
  user:state.auth.user
});
export default connect(mapStateToProps,actions)(withRouter(Chat));
