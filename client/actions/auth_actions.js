import types from './common/types';
import { normalize, arrayOf } from "normalizr";
import { schemas } from "./common/schemas";
import API from "./common/API/API";
import { checkStatus } from "./common/check_status_response";
// import 'whatwg-fetch';

//-----------Login--------------------------------------
export const requestLogin = () =>( {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    logtest:true,
    errors:"",
    // creds
});

export const receiveLogin = payload =>( {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: payload.token
});

export const loginError = (message,getState) =>( {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
    getState:getState
});


export const loginUser = creds => (dispatch ,getState) =>{
    dispatch(requestLogin());

    return API.auth.login(creds)
    .then(res =>  {
        localStorage.setItem('token', res.token);
        dispatch(receiveLogin(res));
        return res;
    })
    .catch(err => {
        err.response.json().then(body=>{
            // console.log('loginUser', body, err.response.status);
            dispatch(loginError(body,getState));
        });

    });

};
//-----------Logout--------------------------------------
export const requestLogout = () =>( {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
});

export const receiveLogout = () =>( {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
});

export const logoutUser = () => dispatch=>{
    dispatch(requestLogout());
    localStorage.removeItem('token');
    dispatch(receiveLogout());
};


//-----------Signup--------------------------------------
export const requestSignup = () =>( {
    type: types.SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    logtest:true
    // creds
});

export const receiveSignup = payload =>( {
    type: types.SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: payload.token
});

export const SignupError = message =>( {
    type: types.SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
});

export const signupUser = creds => dispatch =>{
    dispatch(requestSignup());

    return API.auth.signup(creds)
    .then(res =>  {
        localStorage.setItem('token', res.token);
        dispatch(receiveSignup(res));
        return res;
    })
    .catch(err => {
        err.response.json().then(body=>{
            console.log('loginUser', body, err.response.status);
            dispatch(SignupError(body));
        });

    });

};
