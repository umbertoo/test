import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import Tab from '../components/Tabs/Tab';
import Tabs from '../components/Tabs';
import ChannelFormContainer from '../containers/ChannelFormContainer';

class ChannelSettings extends Component {
  onChange=(data)=>{
    console.log('onChangeTab',data);
  }
  onClickDelete=()=>{

  }
  render(){
    const { channel, onDeleteChannel }= this.props;
    console.log('ChannelSettings',channel);

    const tabPaneStyle={
      backgroundColor:'#fff',
      height:'400px'
    };
    return (
      <Tabs onChange={this.onChange} tabPaneStyle={tabPaneStyle} >
        <Tab label="Обзор">
          <ChannelFormContainer
            onDeleteChannel={onDeleteChannel}
            channel={channel}/>
        </Tab>
      </Tabs>
    );
  }
}

export default connect(null, Actions)(ChannelSettings);
