import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import UserBlock from '../components/UserBlock';
import ModalDialog from '../components/ModalDialog';
import ServerSettings from '../components/ServerSettings';
import UserSettings from '../components/UserSettings';
import shallowEqual from 'shallowequal';
import isEqual from 'lodash/isEqual';
class UserBlockContainer extends Component {
  state={
    openUserSettings:false
  }
  shouldComponentUpdate(nextProps, nextState){
      return !isEqual(this.props, nextProps)
       || !isEqual(this.state, nextState)
  }
  toggleUserSettings=()=>{
    this.setState({
      openUserSettings:!this.state.openUserSettings
    });
  }
  render(){
    const { user } = this.props;
    const { openUserSettings } = this.state;
    console.warn('UserBlockContainer');
    return (
      <div>
        {openUserSettings &&
          <ModalDialog
            showHeader={false}
            isOpen
            onClose={this.toggleUserSettings}
            style={{content:{background:'#2e3136'}}} >
            <UserSettings user={user}/>
          </ModalDialog>
        }
        {user && <UserBlock
          name={user.name}
          id={user.id}
          avatar={user.avatar}
          onClickSettings={this.toggleUserSettings}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  user:state.entities.users.items[state.auth.user]
});

export default connect(mapStateToProps, Actions)(UserBlockContainer);
