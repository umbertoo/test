import type from './common/types';
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import API from "./common/API/API";
import { checkStatus } from "./common/check_status_response";

//-----------Login--------------------------------------
export const requestLogin = () =>( {
  type: type.LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  logtest:true,
  errors:"",
});

export const receiveLogin = payload =>( {
  type: type.LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: payload.token
});

export const loginError =  message  =>( {
  type: type.LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
});


export const loginUser = creds => async (dispatch) =>{
  try {
    dispatch(requestLogin());

    const res = await API.auth.login(creds);
    localStorage.setItem('token', res.token);
    dispatch(receiveLogin(res));
    return res;

  } catch (err) {
    err.response.json().then(body=>{
      // console.log('loginUser', body, err.response.status);
      dispatch(loginError(body));
    });
  }
};
//-----------Logout--------------------------------------
export const requestLogout = () =>( {
  type: type.LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
});

export const receiveLogout = () =>( {
  type: type.LOGOUT_SUCCESS,
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
  type: type.SIGNUP_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  logtest:true
  // creds
});

export const receiveSignup = payload =>( {
  type: type.SIGNUP_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: payload.token
});

export const SignupError = message =>( {
  type: type.SIGNUP_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
});

export const signupUser = creds => async (dispatch) =>{
  try {
    dispatch(requestSignup());

    const res = await API.auth.signup(creds)
    localStorage.setItem('token', res.token);
    dispatch(receiveSignup(res));
    return res;

  } catch (err) {
    err.response.json().then(body=>{
      console.error('SignupError', body, err.response.status);
      dispatch(SignupError(body));
    });
  }
};



//---------------------current-user-----------------

export const fetchCurrentUserRequest = () =>({
  type:type.FETCH_CURRENT_USER_REQUEST,
  isFetching:true
});
export const fetchCurrentUserSuccess = (payload) =>({
  type:type.FETCH_CURRENT_USER_SUCCESS,
  isFetching:false,
  payload
});
export const fetchCurrentUserFailure = (error) =>({
  type:type.FETCH_CURRENT_USER_FAILURE,
  isFetching:false,
  error
});

export const fetchCurrentUser = () => async (dispatch) =>{
  try {
    dispatch(fetchCurrentUserRequest());
    const user = await API.User.get();
    const payload = normalize(user, schemas.user);

    console.log(payload, 'fetchCurrentUser');

    dispatch(fetchCurrentUserSuccess(payload));

    return user;
  } catch (e) {
    dispatch(fetchCurrentUserFailure(e));
  }
};

//---------------------upload avatar-----------------

export const uploadUserAvatarRequest = () =>({
  type:type.UPLOAD_USER_AVATAR_REQUEST,
  isFetching:true,
  error:null
});
export const uploadUserAvatarFailure = (error) =>({
  type:type.UPLOAD_USER_AVATAR_FAILURE,
  isFetching:false,
  error
});
export const uploadUserAvatarSuccess = (avatar, userId) =>({
  type:type.UPLOAD_USER_AVATAR_SUCCESS,
  isFetching:false,
  userId,
  avatar
});
