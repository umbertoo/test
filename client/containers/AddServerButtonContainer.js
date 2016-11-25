import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ModalDialog from '../components/ModalDialog';
import AddServerSteps from '../components/AddServerSteps';
import AddServerButton from '../components/AddServerButton';

class AddServerButtonContainer extends Component {
  static contextTypes = { router: PropTypes.object.isRequired }
  state={
    openAddServerDialog:false
  }
  toggleAddServerDialog=()=>{
    this.setState({ openAddServerDialog: !this.state.openAddServerDialog});
  }
  onSubmitCreateServer=(server)=>{
    this.props.createServer(server).then((server)=>{
      this.toggleAddServerDialog();
      const {id} = server;
      this.context.router.transitionTo('/channels/'+id);
    });
  }
  render(){
    const {openAddServerDialog} = this.state;
    return (
      <div>
        {openAddServerDialog &&
          <ModalDialog
            showHeader={false}
            isOpen={openAddServerDialog}
            onClose={this.toggleAddServerDialog}
            style={{content:{background:'#2e3136'}}} >
            <AddServerSteps
              onSubmitCreateServer={this.onSubmitCreateServer}
             />
          </ModalDialog>
        }
        <AddServerButton onClick={this.toggleAddServerDialog}/>
      </div>
    );
  }
}

// const mapStateToProps = (state) =>({
//   state:state
// });

export default connect(null, Actions)(AddServerButtonContainer);
