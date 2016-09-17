import { Route, IndexRoute } from 'react-router';
import React  from 'react';
import App from './containers/App';
import Chat from './containers/Chat';
import LoginPage from './containers/auth/LoginPage';

import ResetPasswordPage from './containers/auth/ResetPasswordPage';
import ChangePasswordPage from './containers/auth/ChangePasswordPage';
import SignUpPage from './containers/auth/SignUpPage';

import StartPage from './containers/StartPage';
import {browserHistory} from 'react-router';

const routes = (
    <Route  path="/" component={App} >
        <IndexRoute component={StartPage}/>
        <Route path="channels/:server_id/:channel_id"   component={Chat} />
        <Route path="channels/:server_id/"   component={Chat} />
        <Route path="login"   component={LoginPage} />
        <Route path="signup" component={SignUpPage}/>
        <Route path="resetpassword"  component={ResetPasswordPage}/>
        <Route path="change_password"  component={ChangePasswordPage}/>
    </Route>
);
export default routes;
