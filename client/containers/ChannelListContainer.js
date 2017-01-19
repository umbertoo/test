import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import SortableChannelList from '../components/ChannelList';
import ModalDialog from '../components/ModalDialog';
import CreateChannelForm from '../components/CreateChannelForm';
import ChannelSettings from '../components/ChannelSettings';
import shallowEqual from 'shallowequal';
import isEqual from 'lodash/isEqual';
import Redirect from 'react-router/Redirect';
import {getChannels, getChannelsWithNewMessages} from '../selectors/selectors.js';

class ChannelListContainer extends Component {
  static contextTypes = { router: PT.object.isRequired }
  state = {
    openCreateChannelModal:false,
    openChannelSettings:false,
  }
  shouldComponentUpdate(nextProps, nextState){
      return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState,this.state);
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
      channel
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
      this.props.deleteChannelWithConfirm(this.state.channel.id);
    });
  }
  selectChannel=(channel)=>{
    this.context.router.transitionTo(`/channels/${this.props.serverId}/${channel.id}`);
  }
  render(){
    const {
      channels,
      serverId, channelId:selectedChannelId,
      channelsWithNewMessages
    } = this.props;
    const { openCreateChannelModal, openChannelSettings, channel} = this.state;
    const disableSorting = false;
    const isLastChannel = channels.length == 1;
    // console.warn('ChannelListContainer');
    return (
      <div style={{width:'100%', height:'100%'}}>
        <SortableChannelList
          // shouldCancelStart={()=>disableSorting?true:undefined}
          distance={4}
          onSortEnd={this.onSortEnd}
          lockAxis="y"
          onClickItemSettings={this.onClickItemSettings}
          onCreateChannel={this.toggleCreateChannelModal}
          channelsWithNewMessages={channelsWithNewMessages}
          selected={selectedChannelId}
          onSelectChannel={this.selectChannel}
          channels={channels}/>

        {/* {(channels[selectedChannelId] && channels[selectedChannelId].deleted)
        && <Redirect to={`/channels/${serverId}/${generalChannelId}`}/>} */}

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
              showDeleteButton={isLastChannel}
              channel={channel}/>
          </ModalDialog>
        }
      </div>
          );
        }
      }

      const mapStateToProps = (state, props) =>{
        return {
          channelSettingsModal:state.ui.modals.channelSettings,
          channelsWithNewMessages:getChannelsWithNewMessages(state),
          channels:getChannels(state,props),
        };
      };

      export default connect(mapStateToProps, Actions)(ChannelListContainer);
