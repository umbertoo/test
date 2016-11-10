import React, { Component } from 'react';
import ModalDialog from '../components/ModalDialog';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import Tab from '../components/Tabs/Tab';
import Tabs from '../components/Tabs';

class ChannelSettings extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
    };
  }
  onChange(data){
    console.log('onChangeTab',data);
  }
  onClickDelete(){

  }
  render(){
    const {channel, onDeleteChannel}= this.props;
    console.log('ChannelSettings',channel);
    const tabPaneStyle={
      backgroundColor:'#fff',
      height:'400px'
    };
    return (
      <Tabs onChange={this.onChange} >
        <Tab label="Обзор" style={tabPaneStyle}>
          <h1>{channel.name}</h1>
          <input type="text" name="name" value={channel.name}/>
          <input type="text" name="description" value={channel.description}/>
          <input type="button" value="Готово"/>
          <input onClick={onDeleteChannel} type="button" value="Удалить"/>
        </Tab>
      </Tabs>
    );
  }
}

// const mapStateToProps = (state,props) =>({
//     channel:state.entities.channels.items[props.channelId]
// });

export default connect(null, Actions)(ChannelSettings);
