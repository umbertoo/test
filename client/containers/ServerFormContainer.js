import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ServerForm from '../components/ServerForm';

class ServerFormContainer extends Component {
  onChangeServerForm = ()=>{

  }
  onSuccessUploadIcon = ({icon})=>{
    const {server} = this.props;
    this.props.uploadServerIconSuccess(icon, server.id);
  }
  render(){
    const {server} = this.props;
    return (
      <ServerForm
        onStartUploadIcon={this.props.uploadServerIconRequest}
        onSuccessUploadIcon={this.onSuccessUploadIcon}
        onErrorUploadIcon={this.props.uploadServerIconFailure}
        server={server}
        onChange={this.onChangeServerForm}/>
      );
    }
  }

  const mapStateToProps = (state) =>({
    server:state.entities.servers.items[state.ui.params.serverId]
  });
  export default connect(mapStateToProps, Actions)(ServerFormContainer);
