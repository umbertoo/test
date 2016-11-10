import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ServerMenu from '../components/ServerMenu';
import {withRouter} from 'react-router';
import autoBind from 'react-autobind';
import ModalDialog from '../components/ModalDialog';
import ServerSettings from '../components/ServerSettings';

class ServerMenuContainer extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      openServerSettings:false
    };
  }
  toggleServerSettings(){
    this.setState({
      openServerSettings:!this.state.openServerSettings
    });
  }

  onSelect(e){
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
    const {server}= this.props;
    const {openServerSettings }=this.state;
    return (
      <div>
        {openServerSettings &&
          <ModalDialog
            showHeader={false}
            isOpen
            onClose={this.toggleServerSettings}
            style={{content:{background:'#2e3136'}}} >
            <ServerSettings server={server}/>
          </ModalDialog>
        }
        {server ? <ServerMenu onSelect={this.onSelect} server={server}/>  : null}
      </div>
    );
  }
}

const mapStateToProps = (state,props) =>({
  server:state.entities.servers.items[props.params.serverId]
});

export default withRouter(connect(mapStateToProps, Actions)(ServerMenuContainer));
