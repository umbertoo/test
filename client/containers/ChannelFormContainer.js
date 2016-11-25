import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ChannelForm from '../components/ChannelForm';

class ChannelFormContainer extends Component {
  onChangeChannelForm = (channel)=>{
    this.props.editChannel(channel);
  }
  render(){
    const {channel} = this.props;
    return (
      <ChannelForm
        onDeleteChannel={this.props.onDeleteChannel}
        channel={channel}
        onChange={this.onChangeChannelForm}/>
      );
    }
  }
  export default connect(null, Actions)(ChannelFormContainer);
