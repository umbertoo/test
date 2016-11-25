import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ServerMenu from '../components/ServerMenu';
import ModalDialog from '../components/ModalDialog';
import ServerSettings from '../components/ServerSettings';
import Link from 'react-router/Link';
class ServerMenuContainer extends Component {
  state = {
    openServerSettings:false
  };
  toggleServerSettings=()=>{
    this.setState({
      openServerSettings:!this.state.openServerSettings
    });
  }
  onSelect=(e)=>{
    switch (e) {
      case 'settings':
      this.toggleServerSettings();
      break;
      case 'leave_server':
      console.log('leave_server');
      break;
    }
  }
  render(){
    const {server} = this.props;
    const {openServerSettings }=this.state;
    return (
      <div>
        {server
          ? <ServerMenu onSelect={this.onSelect} server={server}/>
          : null
        }
        <Link to={'/channels/8'}> SERVER 8</Link>
        {openServerSettings &&
          <ModalDialog
            showHeader={false}
            isOpen
            onClose={this.toggleServerSettings}
            style={{content:{background:'#2e3136'}}} >
            <ServerSettings server={server}/>
          </ModalDialog>
        }
      </div>
    );
  }
}

const mapStateToProps = (state,props) =>({
  server:state.entities.servers.items[state.ui.params.serverId]
});

export default connect(mapStateToProps, Actions)(ServerMenuContainer);
