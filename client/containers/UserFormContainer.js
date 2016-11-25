import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import UserForm from '../components/UserForm';

class UserFormContainer extends Component {
  onChangeUserForm = (user)=>{
    this.props.editUser(user);
  }
  onSuccessUploadIcon = ({avatar})=>{
    const {user} = this.props;
    this.props.uploadUserAvatarSuccess(avatar, user.id);
  }
  render(){
    const {user} = this.props;
    return (
      <UserForm
        onStartUploadAvatar={this.props.uploadUserAvatarRequest}
        onSuccessUploadAvatar={this.onSuccessUploadIcon}
        onErrorUploadAvatar={this.props.uploadUserAvatarFailure}
        user={user}
        onChange={this.onChangeUserForm}/>
      );
    }
  }

  // const mapStateToProps = (state)=>({
  //   user:state.auth.user
  // });
  export default connect(null, Actions)(UserFormContainer);
