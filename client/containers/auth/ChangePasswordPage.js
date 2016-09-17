import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actions/index';
import ChangePasswordForm from '../../components/auth/ChangePasswordForm';


class ChangePasswordPage extends Component {
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
                <h1>ChangePasswordPage</h1>

                <ChangePasswordForm  onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    state:state
});

export default withRouter(connect(mapStateToProps, actions)(ChangePasswordPage));
