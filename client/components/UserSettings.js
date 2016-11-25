import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';

import UserFormContainer from '../containers/UserFormContainer';
import ModalDialog from '../components/ModalDialog';
import Tab from '../components/Tabs/Tab';
import Tabs from '../components/Tabs';
import Input from '../components/Input';

class UserSettings extends Component {
  onChange=(data)=>{
    console.log('onChangeTab',data);
  }
  render(){
    const {user}= this.props;
    const tabPaneStyle={
      backgroundColor:'#fff',
      height:'100%'
    };
    const tabStyle={
      width:'200px'
    };
    return (
      <Tabs onChange={this.onChange}
        style={{width:'800px', height:'650px'}}
        tabStyle={tabStyle}
        tabPaneStyle={tabPaneStyle}>
        <Tab label="Обзор">
          <UserFormContainer user={user}/>
        </Tab>
      </Tabs>
    );
  }
}

// const mapStateToProps = (state,props) =>({
//     channel:state.entities.channels.items[props.channelId]
// });

export default connect(null, Actions)(UserSettings);
