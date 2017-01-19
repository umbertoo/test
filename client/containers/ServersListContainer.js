import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import SortableServersList from '../components/ServersList';
import { socket } from '../actions/common/socketEvents';

import AddServerButtonContainer from '../containers/AddServerButtonContainer';
import {getServers, getFirstChannelsIds, getOpenedChannelsIdsByServer} from '../selectors/selectors.js';

import shallowEqual from 'shallowequal';
import history from 'history';

class ServersListContainer extends Component {
  static contextTypes = { router: PT.object.isRequired }

  componentWillMount(){
    const {serverId}=this.props;
    // this.props.selectServer(serverId);
    // this.props.fetchChannels(serverId);
    socket.emit('connectServer', serverId);
    this.props.fetchMessagesAck(serverId);
    
  }
  shouldComponentUpdate(nextProps, nextState){
      return !shallowEqual(nextProps, this.props);
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
    // this.props.fetchChannels(serverId).then(()=>{
    //
    // });
    const {firstChannelsIds, openedChannelsIds} = this.props;
    console.log(openedChannelsIds);

    const channelId = openedChannelsIds[serverId] || firstChannelsIds[serverId];
    this.context.router.transitionTo('/channels/'+serverId+'/'+channelId);
    socket.emit('connectServer', serverId);

    this.props.fetchMessagesAck(serverId);
  }
  onSortEnd=({oldIndex, newIndex})=> {
    this.props.editServersOrder(oldIndex, newIndex);
  }

  render(){
    const {servers, serverId} = this.props;
    console.warn('ServersListContainer');
    return (
      <SortableServersList
        distance={4}
        onSortEnd={this.onSortEnd}
        lockAxis="y"
        onSelectServer={this.selectServer}
        selectedItem={serverId}
        servers={servers}>

        <AddServerButtonContainer />
      </SortableServersList>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    servers: getServers(state),
    firstChannelsIds:getFirstChannelsIds(state),
    openedChannelsIds:getOpenedChannelsIdsByServer(state)
  };
};

export default connect(mapStateToProps, Actions)(ServersListContainer);
