import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import '../static/scss/chat-header.scss';
import autoBind from 'react-autobind';
import shallowEqual from 'shallowequal';
class ChatHeaderContainer extends Component {
  onClickSidePanel=()=>{
    console.log('onClickSidePanel');
  }
  shouldComponentUpdate(nextProps, nextState){
    return !shallowEqual(this.props, nextProps);
  }
  render(){
    const {channelName} = this.props;
    return (
      <div className="chat-header">
        {channelName &&
          <h1 className="chat-header__title">#{channelName}</h1>
        }
        <div className="chat-header__sidepanel-btn"
          onClick={this.props.onClickSidePanel}>
          side panel
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state,props) =>{
  const { channelId } = props;
  const { name } = state.entities.channels.items[channelId] || {};
  return {
    channelName:name
  };
};

export default connect(mapStateToProps, Actions)(ChatHeaderContainer);
