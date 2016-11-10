import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import SortableChannelList from '../components/ChannelList';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import ModalDialog from '../components/ModalDialog';
import CreateChannelForm from '../components/CreateChannelForm';
import ChannelSettings from '../components/ChannelSettings';
import { arrayMove } from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';


class ChannelListContainer extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      openCreateChannelModal:false,
      openChannelSettings:false,
    };
  }
  selectChannel(channel){
    this.props.router.push(`/channels/${this.props.params.serverId}/${channel.id}`);
  }
  toggleCreateChannelModal(){
    this.setState({
      openCreateChannelModal:!this.state.openCreateChannelModal
    });
  }
  submitCreateChannelForm(data){
    console.log('submitCreateChannelForm');
    const {
      description:{value:description},
      name:{value:name}
    } = this.createForm.elements;
    const {serverId}=this.props.params;
    this.props.createChannel({description,name, serverId});
  }
  onSortEnd({oldIndex, newIndex,...rest}) {
    const newOrder = arrayMove([...this.props.order], oldIndex, newIndex);

    const piece = oldIndex < newIndex
    ? newOrder.slice(oldIndex, newIndex+1)
    : newOrder.slice(newIndex, oldIndex+1);

    let index = oldIndex < newIndex
    ? oldIndex
    : newIndex;

    const orderData = piece.map(e=>({id:e, order: ++index}));
    console.log('orderData',orderData);
    const {serverId} = this.props.params;
    this.props.editChannelsOrder(orderData,newOrder,serverId);
  }
  onClickItemSettings(channel){
    console.log('onClickItemSettings',channel);
    this.setState({
      openChannelSettings:true,
      ChannelSettingId:channel.id
    });
  }
  closeChannelSettings(){
    this.setState({
      openChannelSettings:false
    });
  }
  handleDeleteChannel(){
    this.setState({
      openChannelSettings:false
    },()=>{
      this.props.deleteChannel(this.state.ChannelSettingId);
    });
  }
  render(){
    const {
      channels,selected, params:{channelId},
      channelsIsFetching, messagesIsFetching , channelsWithNewMessages,
      order
    } = this.props;
    const { openCreateChannelModal, openChannelSettings, ChannelSettingId} = this.state;
    const disableSorting=false;
    return (
      <div style={{width:'100%', height:'100%'}}>
        {openCreateChannelModal &&
          <ModalDialog
            title={'Создание канала'}
            isOpen
            onClose={this.toggleCreateChannelModal}>
            <CreateChannelForm
              formRef={f=>this.createForm=f}
              onSubmit={this.submitCreateChannelForm}/>
            <div>
              <input type="button" value="Создать" onClick={this.submitCreateChannelForm} />
              <input type="button" value="Отмена" onClick={this.toggleCreateChannelModal}/>
            </div>
          </ModalDialog>
        }
        {openChannelSettings &&
          <ModalDialog
            showHeader={false}
            isOpen
            onClose={this.closeChannelSettings}
            style={{content:{background:'#2e3136'}}} >
            <ChannelSettings
              onDeleteChannel={this.handleDeleteChannel}
              channel={channels[ChannelSettingId]}
        />
          </ModalDialog>
        }
        <SortableChannelList
          shouldCancelStart={()=>disableSorting?true:undefined}
          distance={4}
          // pressDelay={50}
          onSortEnd={this.onSortEnd}
          lockAxis="y"
          onClickItemSettings={this.onClickItemSettings}
          onCreateChannel={this.toggleCreateChannelModal}
          channelsWithNewMessages={channelsWithNewMessages}
          selected={channelId}
          onSelectChannel={this.selectChannel}
          order={order}
          channels={channels}/>

      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  console.log(state.ui.selectedServer,'state.ui.selectedServer');
  // const server  = state.pagination.idsByServer[state.ui.selectedServer];
  const {channels:order=[]} = state.entities.servers.items[state.ui.selectedServer]||{};
  // const {
  //   ids = []
  // } = server||{};
  // console.log(server,'server');
  // console.log(ids,'ids');
  return {
    channelsWithNewMessages:state.entities.channels.channelsWithNewMessages,
    channels:state.entities.channels.items,
    order
  };
};

export default withRouter(connect(mapStateToProps, Actions)(ChannelListContainer));
