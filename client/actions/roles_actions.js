import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";


export const fetchRolesRequest = () =>({
  type:type.FETCH_ROLES_REQUEST,
  isFetching:true,
  error:null
});
export const fetchRolesFailure = (error) =>({
  type:type.FETCH_ROLES_FAILURE,
  isFetching:false,
  error
});
export const fetchRolesSuccess = (payload,serverId) =>({
  type:type.FETCH_ROLES_SUCCESS,
  serverId,
  isFetching:false,
  payload
});



export const fetchRoles = serverId => async dispatch =>{
  try {
    dispatch(fetchRolesRequest());

    const res = await API.Role.getByServer(serverId);
    const payload = normalize(res,arrayOf(schemas.role));

    dispatch(fetchRolesSuccess(payload, serverId));
  } catch (e) {
    dispatch(fetchRolesFailure('fetch roles error'));
    console.error('error',e);
  }
};
