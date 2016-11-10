import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import {withRouter} from 'react-router';
import '../static/scss/chat-header.scss';
import autoBind from 'react-autobind';

class ChatHeaderContainer extends Component {
  constructor(props){
    super(props);
    autoBind(this);
  }
  onClickSidePanel(){
    console.log('onClickSidePanel');
  }
  render(){
    const {channels, params:{channelId}} = this.props;
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
  channels:state.entities.channels.items,
});

export default connect(mapStateToProps, Actions)(withRouter(ChatHeaderContainer));
