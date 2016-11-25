import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import { getChangedItemsFromOrder } from "../utils/getChangedItemsFromOrder";

export const fetchPermissionsRequest = () =>({
  type:type.FETCH_PERMISSIONS_REQUEST,
  isFetching:true,
  error:null
});
export const fetchPermissionsFailure = (error) =>({
  type:type.FETCH_PERMISSIONS_FAILURE,
  isFetching:false,
  error
});
export const fetchPermissionsSuccess = (payload) =>({
  type:type.FETCH_PERMISSIONS_SUCCESS,
  isFetching:false,
  payload
});

export const fetchPermissions = () => async dispatch =>{
  try {
    dispatch(fetchPermissionsRequest());

    const res = await API.Permission.get();
    console.log('permissions', res);
    const payload = normalize(res,arrayOf(schemas.permission));
    console.log('permissions', payload);

    dispatch(fetchPermissionsSuccess(payload));
  } catch (e) {
    dispatch(fetchPermissionsFailure('fetch permissions error'));
    console.error('error',e);
  }
};
