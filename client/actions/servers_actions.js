import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";

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
export const editServersOrderSuccess = (payload) =>({
  type:type.EDIT_SERVERS_ORDER_SUCCESS,
  isFetching:false,
  payload
});

export const editServersOrder = (orderData, newOrder) => async dispatch =>{
  try {
    dispatch(editServersOrderSuccess(newOrder));

    dispatch(editServersOrderRequest());
    const servers = await API.Server.editOrder(orderData);
    // const result = normalize(servers, arrayOf(schemas.server));
    console.log('editServersOrder', servers);

  } catch (e) {
    console.error(e);
    dispatch(editServersOrderFailure('create server error'));
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
