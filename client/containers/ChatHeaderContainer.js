import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import '../static/scss/chat-header.scss';
import autoBind from 'react-autobind';

class ChatHeaderContainer extends Component {
  onClickSidePanel=()=>{
    console.log('onClickSidePanel');
  }
  render(){
    const {channels, channelId} = this.props;
    return (
      <div className="chat-header">
        {channels[channelId] &&
          <h1 className="chat-header__title">{channels[channelId].name}</h1>
        }
        <div className="chat-header__sidepanel-btn"
          onClick={this.props.onClickSidePanel}>
          side panel
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  channelId:state.ui.params.channelId,
  channels:state.entities.channels.items,
});

export default connect(mapStateToProps, Actions)(ChatHeaderContainer);
