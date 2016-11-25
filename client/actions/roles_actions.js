import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import { getChangedItemsFromOrder } from "../utils/getChangedItemsFromOrder";

export const selectRole = (id) =>({
    type:type.SELECT_ROLE,
    id
});


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
    console.log('roles',res);
    const payload = normalize(res,arrayOf(schemas.role));
    console.log('roles',payload);

    dispatch(fetchRolesSuccess(payload, serverId));
  } catch (e) {
    dispatch(fetchRolesFailure('fetch roles error'));
    console.error('error',e);
  }
};

///////////////////////////////////////////////////////////

export const createRoleRequest = () =>({
  type:type.CREATE_ROLE_REQUEST,
  isFetching:true,
  error:null
});
export const createRoleFailure = (error) =>({
  type:type.CREATE_ROLE_FAILURE,
  isFetching:false,
  error
});
export const createRoleSuccess = (payload,serverId) =>({
  type:type.CREATE_ROLE_SUCCESS,
  serverId,
  isFetching:false,
  payload
});

export const createRole = (name,serverId) => async dispatch =>{
  try {
    dispatch(createRoleRequest());

    const res = await API.Role.create(name,serverId);
    console.log('roles',res);
    const payload = normalize(res, schemas.role);
    console.log('roles',payload);

    dispatch(createRoleSuccess(payload, serverId));
  } catch (e) {
    dispatch(createRoleFailure('create role error'));
    console.error('error',e);
  }
};
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

export const deleteRoleRequest = () =>({
  type:type.DELETE_ROLE_REQUEST,
  isFetching:true,
  error:null
});
export const deleteRoleFailure = (error) =>({
  type:type.DELETE_ROLE_FAILURE,
  isFetching:false,
  error
});
export const deleteRoleSuccess = (payload,serverId) =>({
  type:type.DELETE_ROLE_SUCCESS,
  serverId,
  isFetching:false,
  payload
});

export const deleteRole = (roleId, serverId) => async dispatch =>{
  try {
    dispatch(deleteRoleRequest());

    const res = await API.Role.delete(roleId, serverId);
    console.log('roles',res);
    const payload = normalize(res, schemas.role);
    console.log('roles',payload);

    dispatch(deleteRoleSuccess(payload, serverId));
  } catch (e) {
    dispatch(deleteRoleFailure('delete role error'));
    console.error('error',e);
  }
};
///////////////////////////////////////////////////////////
export const editRoleRequest = () =>({
  type:type.EDIT_ROLE_REQUEST,
  isFetching:true,
  error:null
});
export const editRoleFailure = (error) =>({
  type:type.EDIT_ROLE_FAILURE,
  isFetching:false,
  error
});
export const editRoleSuccess = (payload,serverId) =>({
  type:type.EDIT_ROLE_SUCCESS,
  serverId,
  isFetching:false,
  payload
});

export const editRole = (role, serverId) => async dispatch =>{
  try {
    dispatch(editRoleRequest());

    const res = await API.Role.edit(role, serverId);
    console.log('role',res);
    const payload = normalize(res, schemas.role);
    console.log('role',payload);

    dispatch(editRoleSuccess(payload, serverId));
  } catch (e) {
    dispatch(editRoleFailure('edit role error'));
    console.error('error',e);
  }
};
///////////////////////////////////////////////////////////
export const editRolesOrderRequest = () =>({
  type:type.EDIT_ROLES_ORDER_REQUEST,
  isFetching:true,
  error:null
});
export const editRolesOrderFailure = (error) =>({
  type:type.EDIT_ROLES_ORDER_FAILURE,
  isFetching:false,
  error
});
export const editRolesOrderSuccess = (oldIndex, newIndex,serverId) =>({
  type:type.EDIT_ROLES_ORDER_SUCCESS,
  isFetching:false,
  serverId,
  oldIndex, newIndex
});


export const editRolesOrder = (oldIndex, newIndex, serverId) =>
async (dispatch, getState) =>{
  try {

    dispatch(editRolesOrderSuccess(oldIndex, newIndex, serverId));

    const {roles:order} = getState().entities.servers.items[serverId]||{};
    const orderData = getChangedItemsFromOrder(oldIndex, newIndex, order);

    // dispatch(editRolesOrderRequest());
    // const channels = await API.Channel.editOrder(orderData);
    // const result = normalize(channels, arrayOf(schemas.channel));
    // console.log('editRolesOrder', result);

  } catch (e) {
    console.error(e);
    // dispatch(editRolesOrderFailure('create channel error'));
  }
};
