import React, { Component , createElement } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import LoginForm from '../../components/auth/LoginForm';

class LoginPage extends Component {
  componentDidMount(){
    console.log(this.props.route,"!!!!!!!!1");
  }
  onSubmit(creds){
    this.props.loginUser(creds);
  }
  onClickForgotPassword(){
    this.props.router.push('/resetpassword');
  }

  render(){
    return (
      <div>

        {this.props.isFetching && "Loading... "}
        <div className="header"></div>

        {JSON.stringify(this.props.errors)}
        <div className="error_block">

        </div>
        <LoginForm
          onClickForgotPassword={this.onClickForgotPassword.bind(this)}
          onSubmit={this.onSubmit.bind(this)} />
      </div>
      );
    }
  }

  const mapStateToProps = (state) =>({
    errors:state.auth.errors,
    isFetching:state.auth.isFetching,
  });

  export default connect(mapStateToProps, actions)(LoginPage);
