import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";


export const editUserRequest = () =>({
  type:type.EDIT_USER_REQUEST,
  isFetching:true,
  error:null
});
export const editUserFailure = (error) =>({
  type:type.EDIT_USER_FAILURE,
  isFetching:false,
  error
});
export const editUserSuccess = (payload,userId) =>({
  type:type.EDIT_USER_SUCCESS,
  userId,
  isFetching:false,
  payload
});

export const editUser = (user, serverId) => async dispatch =>{
  try {
    dispatch(editUserRequest());

    const res = await API.User.edit(user);
    console.log('user',res);
    const payload = normalize(res, schemas.user);
    console.log('user',payload);

    dispatch(editUserSuccess(payload, user.id));
  } catch (e) {
    dispatch(editUserFailure('edit user error'));
    console.error('error',e);
  }
};


export const updateUsersOnline = (usersIds) =>({
    type:type.UPDATE_USERS_ONLINE,
    usersIds
});
