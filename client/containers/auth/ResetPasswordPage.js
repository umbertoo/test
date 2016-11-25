import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';


class ResetPasswordPage extends Component {
  onSubmit(email){
    console.log('onSubmit ResetPasswordPage ');
    // this.props.loginUser(creds).then(res=>console.log('1111111111111111111111111',res));
  }
  onClickForgotPassword(){
    // console.log('push to /resetPassword');
    //
    // this.props.router.push('/resetPassword');
  }
  render(){
    return (
      <div>
        <h1>ResetPasswordPage</h1>
        {JSON.stringify(this.props.errors)}
        <ResetPasswordForm  onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  errors:state.auth.errors
});

export default connect(mapStateToProps, actions)(ResetPasswordPage);
