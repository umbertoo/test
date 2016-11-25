import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import { getChangedItemsFromOrder } from "../utils/getChangedItemsFromOrder";

export const createServerRequest = () =>({
  type:type.CREATE_SERVER_REQUEST,
  isFetching:true,
  error:null
});
export const createServerFailure = (error) =>({
  type:type.CREATE_SERVER_FAILURE,
  isFetching:false,
  error
});
export const createServerSuccess = (payload) =>({
  type:type.CREATE_SERVER_SUCCESS,
  isFetching:false,
  payload
});

export const createServer = ({name}) => async (dispatch, getState) =>{
  try {
    dispatch(createServerRequest());
    const server = await API.Server.create({name});
    console.warn('createServer', server);

    const result = normalize(server, schemas.server);
    console.warn('createServer', result);
    dispatch(createServerSuccess(result));
    return getState().entities.servers.items[server.id];
  } catch (e) {
    console.error(e);
    dispatch(createServerFailure('createServer error'));
  }
};
//------------------------------------------------------------------------

export const uploadServerIconRequest = () =>({
  type:type.UPLOAD_SERVER_ICON_REQUEST,
  isFetching:true,
  error:null
});
export const uploadServerIconFailure = (error) =>({
  type:type.UPLOAD_SERVER_ICON_FAILURE,
  isFetching:false,
  error
});
export const uploadServerIconSuccess = (icon,serverId) =>({
  type:type.UPLOAD_SERVER_ICON_SUCCESS,
  isFetching:false,
  serverId,
  icon
});

//------------------------------------------------------------------------

export const editServersOrderRequest = () =>({
  type:type.EDIT_SERVERS_ORDER_REQUEST,
  isFetching:true,
  error:null
});
export const editServersOrderFailure = (error) =>({
  type:type.EDIT_SERVERS_ORDER_FAILURE,
  isFetching:false,
  error
});
export const editServersOrderSuccess = (oldIndex, newIndex,serverId) =>({
  type:type.EDIT_SERVERS_ORDER_SUCCESS,
  isFetching:false,
  serverId,
  oldIndex, newIndex
});


export const editServersOrder = (oldIndex, newIndex) =>
async (dispatch, getState) =>{
  try {
    dispatch(editServersOrderRequest());
    dispatch(editServersOrderSuccess(oldIndex, newIndex));

    const {ids:order} = getState().entities.servers;
    const orderData = getChangedItemsFromOrder(oldIndex, newIndex, order);

    const servers = await API.Server.editOrder(orderData);

  } catch (e) {
    console.error(e);
    dispatch(editServersOrderFailure('edit Servers Order error'));
  }
};
//------------------------------------------------------------------

export const editServerRequest = () =>({
  type:type.EDIT_SERVER_REQUEST,
  isFetching:true,
  error:null
});
export const editServerFailure = (error) =>({
  type:type.EDIT_SERVER_FAILURE,
  isFetching:false,
  error
});
export const editServerSuccess = (payload,serverId) =>({
  type:type.EDIT_SERVER_SUCCESS,
  serverId,
  isFetching:false,
  payload
});


export const editServer = ({name, description, id}) => async dispatch =>{
  try {
    editServerRequest();
    const server = await API.Server.edit({name, description, id});
    const res = normalize(server, schemas.server);
    editServerSuccess(server, id);
  } catch (e) {
    console.error(e);
    dispatch(editServersOrderFailure('edit server error'));
  }
};
//------------------------------------------------------------------------


export const selectServer = (id) =>({
  type:type.SELECT_SERVER,
  id
});

export const fetchServersRequest = () =>({
  type:type.FETCH_SERVERS_REQUEST,
  isFetching:true
});
export const fetchServersSuccess = (payload) =>({
  type:type.FETCH_SERVERS_SUCCESS,
  isFetching:false,
  payload
});
export const fetchServersFailure = (error) =>({
  type:type.FETCH_SERVERS_FAILURE,
  isFetching:false,
  error
});

export const fetchServers = () => async dispatch =>{
  try {
    dispatch(fetchServersRequest());
    const result = await API.Server.get();
    console.log(result);
    const payload = normalize(result, arrayOf(schemas.server));
    console.log(payload);
    dispatch(fetchServersSuccess(payload));
  } catch (e) {
    dispatch(fetchServersFailure(e));
  }
};
