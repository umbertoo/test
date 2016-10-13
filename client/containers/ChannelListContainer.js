import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ChannelList from '../components/ChannelList';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';


class ChannelListContainer extends Component {
  constructor(props){
    super(props);
    autoBind(this);
  }
  selectChannel(channel){
    this.props.router.push(`/channels/${this.props.params.server_id}/${channel.id}`);
  }
  render(){
    const {
      channels,selected, params:{channel_id},
      channelsIsFetching, messagesIsFetching , channelsWithNewMessages
    } = this.props;
    return (
      <ChannelList
        channelsWithNewMessages={channelsWithNewMessages}
        selected={channel_id}
        onSelectChannel={this.selectChannel}
        channels={channels}
      />
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    channelsWithNewMessages:state.entities.channels.channelsWithNewMessages,
    channels:state.entities.channels.items
  };
};

export default withRouter(connect(mapStateToProps, Actions)(ChannelListContainer));
