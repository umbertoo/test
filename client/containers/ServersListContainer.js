import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import SortableServersList from '../components/ServersList';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import { arrayMove } from 'react-sortable-hoc';
import { socket } from '../actions/common/socketEvents';

class ServersListContainer extends Component {
  constructor(props){
    super(props);
    autoBind(this);
  }
  componentWillMount(){
    const {serverId}=this.props.params;
    this.props.selectServer(serverId);
    this.props.fetchChannels(serverId);
    socket.emit('connectServer', serverId);
  }
  componentWillReceiveProps(nextProps){
    const {channelId:prevChannelId, serverId:prevServerId} = this.props.params;
    const {channelId:nextChannelId, serverId:nextServerId} = nextProps.params;
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
    this.props.fetchChannels(serverId).then(()=>{
      this.props.router.push('/channels/'+serverId+'/'+this.props.channelFirstId);
      socket.emit('connectServer', serverId);
    });

  }
  onSortEnd({oldIndex, newIndex,...rest}) {
    const newOrder = arrayMove(this.props.order, oldIndex, newIndex);

    const piece = oldIndex < newIndex
    ? newOrder.slice(oldIndex, newIndex+1)
    : newOrder.slice(newIndex, oldIndex+1);

    let index = oldIndex < newIndex
    ? oldIndex
    : newIndex;

    const orderData = piece.map(e=>({serverId:e, order: ++index}));
    console.log('orderData',orderData);
    this.props.editServersOrder(orderData,newOrder);
  }
  render(){
    const {servers, order, params:{serverId}} = this.props;
    return (
      <SortableServersList
        distance={4}
        // pressDelay={50}
        onSortEnd={this.onSortEnd}
        lockAxis="y"
        onSelectServer={this.selectServer}
        selectedItem={serverId}
        order={order}
        servers={servers}/>
    );
  }
}
const mapStateToProps = (state) =>({
  order:state.entities.servers.ids,
  channelFirstId:state.entities.channels.ids[0],
  servers:state.entities.servers.items
});

export default withRouter(connect(mapStateToProps, Actions)(ServersListContainer));
