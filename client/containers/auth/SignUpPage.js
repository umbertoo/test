import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import SignUpForm from '../../components/auth/SignUpForm';

class SignUpPage extends Component {
  onSubmit(creds){
    this.props.signupUser(creds);
  }
  render(){
    return (
      <div>
        {this.props.errors &&
          <div className="error_block">{this.props.errors.message}</div>
        }
        <SignUpForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  errors:state.auth.errors
});


export default connect(mapStateToProps, actions)(SignUpPage);
