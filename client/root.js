import { Provider, connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import App from './containers/App';
import {Match, Miss, Link, Redirect } from 'react-router';

import BrowserRouter from 'react-router/BrowserRouter';

import Chat from './containers/Chat';
import LoginPage from './containers/auth/LoginPage';

import ResetPasswordPage from './containers/auth/ResetPasswordPage';
import ChangePasswordPage from './containers/auth/ChangePasswordPage';
import SignUpPage from './containers/auth/SignUpPage';

import StartPage from './containers/StartPage';
import RolesContainer from './components/RolesManager/RolesContainer';

class Root extends Component {
  render(){
    return (
      // <Provider store={this.props.store}>
      <BrowserRouter >
        <App>
          <Match exactly pattern="/" component={StartPage}/>
          <Match pattern="/channels/:serverId" component={Chat}/>
          <Match pattern="/channels/:serverId/:channelId" component={Chat} />
          <Match pattern="/roles" component={RolesContainer} />
          <Match pattern="/login" component={LoginPage} />
          <Match pattern="/signup" component={SignUpPage}/>
          {/* <Match pattern="/resetpassword"  component={ResetPasswordPage}/>
          <Match pattern="/change_password"  component={ChangePasswordPage}/> */}
        </App>
      </BrowserRouter>
      // </Provider>
    );
  }
}

export default Root;
