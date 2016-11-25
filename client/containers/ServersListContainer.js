import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import SortableServersList from '../components/ServersList';
import { socket } from '../actions/common/socketEvents';

import AddServerButtonContainer from '../containers/AddServerButtonContainer';
import {getGeneralChannelId} from '../selectors/selectors.js';
import RedirectServer from '../containers/RedirectServer';


import history from 'history';
class ServersListContainer extends Component {
  static contextTypes = { router: PT.object.isRequired }

  componentWillMount(){
    const {serverId}=this.props;
    // this.props.selectServer(serverId);
    this.props.fetchChannels(serverId);
    socket.emit('connectServer', serverId);
  }
  componentDidUpdate(prevProps, prevState){
    const {serverId, channelId} = this.props;
    const {generalChannelId} = this.props;
    // if(!channelId && generalChannelId) this.context.router.transitionTo('/channels/'+serverId+'/'+generalChannelId);
  }
  // componentWillReceiveProps(nextProps){
  //   const {serverId:prevServerId} = this.props;
  //   const {serverId:nextServerId} = nextProps;
  //   if (prevServerId!==nextServerId) this.handleSwitchServer(prevServerId, nextServerId);
  // }
  // handleSwitchServer=(prevId, nextId)=>{
  // }
  selectServer=(serverId)=>{
    // this.props.selectServer(serverId);
    this.props.fetchChannels(serverId).then(()=>{
      const {generalChannelId} = this.props;
      this.context.router.transitionTo('/channels/'+serverId+'/'+generalChannelId);
      socket.emit('connectServer', serverId);
    });
  }
  onSortEnd=({oldIndex, newIndex})=> {
    this.props.editServersOrder(oldIndex, newIndex);
  }

  render(){
    const {servers, order, serverId, channelId} = this.props;
    return (
      <SortableServersList
        distance={4}
        onSortEnd={this.onSortEnd}
        lockAxis="y"
        onSelectServer={this.selectServer}
        selectedItem={serverId}
        order={order}
        servers={servers}>
        {!channelId && <RedirectServer />}

        <AddServerButtonContainer />
      </SortableServersList>
    );
  }
}
const mapStateToProps = (state) =>{
  const { params: {serverId, channelId} } = state.ui;
  const { channels:channelsIds=[] } = state.entities.servers.items[serverId]||{};
  const channels = channelsIds.map(id=>state.entities.channels.items[id]);
  // const generalChannelId =getGeneralChannelId(channels);
  return {
    order: state.entities.servers.ids,
    serverId,
    channelId,
    // generalChannelId,
    servers: state.entities.servers.items
  };
};

export default connect(mapStateToProps, Actions)(ServersListContainer);
