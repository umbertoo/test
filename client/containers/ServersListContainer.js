import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ServersList from '../components/ServersList';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';

class ServersListContainer extends Component {
  constructor(props){
    super(props);
    autoBind(this);
  }
  componentWillMount(){
    this.props.selectServer(this.props.params.server_id);
  }
  componentWillReceiveProps(nextProps){
    const {channel_id:prevChannelId, server_id:prevServerId} = this.props.params;
    const {channel_id:nextChannelId, server_id:nextServerId} = nextProps.params;
    if (prevServerId!==nextServerId) this.handleSwitchServer(prevServerId, nextServerId);
  }
  handleSwitchServer(prevId, nextId){
    this.props.selectServer(nextId);
  }
  selectServer(serverId){
    console.log('selectServer! serverId:', serverId);
    /* где я могу взять channelId
    его можно взять в : когда подгрузится сервер с каналами.
    Если так то тогда нужно дожидаться подгрузки сервера с
    каналами и только потом переходить
    или подгрузить каналы серверов заранее, что в принципе логично*/
    this.props.router.push(`/channels/${serverId}/`);
  }
  render(){
    const {servers, ids, params:{server_id}} = this.props;
    return (
      <div>
        <ServersList
          onSelectServer={this.selectServer}
          selectedItem={server_id}
          order={ids}
          servers={servers}/>
      </div>
    );
  }
}
const mapStateToProps = (state) =>({
  ids:state.entities.servers.ids,
  servers:state.entities.servers.items
});

export default withRouter(connect(mapStateToProps, Actions)(ServersListContainer));
