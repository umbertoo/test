import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import SortableChannelList from '../components/ChannelList';
import ModalDialog from '../components/ModalDialog';
import CreateChannelForm from '../components/CreateChannelForm';
import ChannelSettings from '../components/ChannelSettings';
import { Scrollbars } from 'react-custom-scrollbars';
import Redirect from 'react-router/Redirect';
import {getGeneralChannelId} from '../selectors/selectors.js';
 
class ChannelListContainer extends Component {
  static contextTypes = { router: PT.object.isRequired }
  state = {
    openCreateChannelModal:false,
    openChannelSettings:false,
  }
  selectChannel=(channel)=>{
    this.context.router.transitionTo(`/channels/${this.props.serverId}/${channel.id}`);
  }
  toggleCreateChannelModal=()=>{
    this.setState({
      openCreateChannelModal:!this.state.openCreateChannelModal
    });
  }
  submitCreateChannelForm=(data)=>{
    const {
      description:{value:description},
      name:{value:name}
    } = this.createForm.elements;
    const {serverId} = this.props;
    this.props.createChannel({description,name, serverId});
  }
  onSortEnd=({oldIndex, newIndex,...rest})=> {
    const {serverId} = this.props;
    this.props.editChannelsOrder(oldIndex, newIndex, serverId);
  }
  onClickItemSettings=(channel)=>{
    this.setState({
      openChannelSettings:true,
      ChannelSettingId:channel.id
    });
  }
  closeChannelSettings=()=>{
    this.setState({
      openChannelSettings:false
    });
  }
  handleDeleteChannel=()=>{
    this.setState({
      openChannelSettings:false
    },()=>{
      this.props.deleteChannel(this.state.ChannelSettingId);
    });
  }
  render(){
    const {
      channels, selectedChannelId,
      order, serverId, generalChannelId, channelsWithNewMessages
    } = this.props;
    const { openCreateChannelModal, openChannelSettings, ChannelSettingId} = this.state;
    const disableSorting = false;
    return (
      <div style={{width:'100%', height:'100%'}}>
        <SortableChannelList
          shouldCancelStart={()=>disableSorting?true:undefined}
          distance={4}
          onSortEnd={this.onSortEnd}
          lockAxis="y"
          onClickItemSettings={this.onClickItemSettings}
          onCreateChannel={this.toggleCreateChannelModal}
          channelsWithNewMessages={channelsWithNewMessages}
          selected={selectedChannelId}
          onSelectChannel={this.selectChannel}
          order={order}
          channels={channels}/>

        {(channels[selectedChannelId] && channels[selectedChannelId].deleted)
          && <Redirect to={`/channels/${serverId}/${generalChannelId}`}/>}

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
              channel={channels[ChannelSettingId]}/>
          </ModalDialog>
        }
      </div>
          );
        }
      }

      const mapStateToProps = (state) =>{
        const {
          channels:order=[]
        } = state.entities.servers.items[state.ui.params.serverId]||{};
        const channels = state.entities.channels.items;
        // const generalChannelId = getGeneralChannelId(channels);
        // const selectedChannelId = state.ui.params.channelId || generalChannelId ;
        const selectedChannelId = state.ui.params.channelId ;
        return {
          channelSettingsModal:state.ui.modals.channelSettings,
          serverId:state.ui.params.serverId,
          // generalChannelId,
          selectedChannelId,
          channelsWithNewMessages:state.entities.channels.channelsWithNewMessages,
          channels,
          order
        };
      };

      export default connect(mapStateToProps, Actions)(ChannelListContainer);
