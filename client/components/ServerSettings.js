import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

import ServerRolesContainer from '../containers/ServerRolesContainer';
import ServerFormContainer from '../containers/ServerFormContainer';
import ModalDialog from '../components/ModalDialog';
import Tab from '../components/Tabs/Tab';
import Tabs from '../components/Tabs';
import Input from '../components/Input';

class ServerSettings extends Component {
  onChange=(data)=>{
    console.log('onChangeTab',data);
  }
  render(){
    const {server}= this.props;
    const tabPaneStyle={
      backgroundColor:'#fff',
      height:'100%'
    };
    const tabStyle={
      width:'200px'
    };
    return (
      <Tabs onChange={this.onChange}
        style={{width:'900px', height:'650px'}}
        tabStyle={tabStyle}
        tabPaneStyle={tabPaneStyle}>
        <Tab label="Обзор">
          <ServerFormContainer/>
        </Tab>
        <Tab label="Роли">
          <ServerRolesContainer/>
        </Tab>
      </Tabs>
    );
  }
}

// const mapStateToProps = (state,props) =>({
//     channel:state.entities.channels.items[props.channelId]
// });

export default connect(null, Actions)(ServerSettings);
