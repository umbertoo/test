import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import { socket } from './common/socketEvents';


const LIMIT_PAGINATION = 45;

export const receiveMessage = (message) =>({
    type:type.RECEIVE_MESSAGE,
    message,
    channelId:message.channelId
});

export const createMessageRequest = () =>({
    type:type.CREATE_MESSAGE_REQUEST,
    isCreating:true
});
export const createMessageSuccess = (message) =>({
    type:type.CREATE_MESSAGE_SUCCESS,
    isCreating:false,
    message,
    channelId:message.channelId
});
export const createMessageFailure = (error) =>({
    type:type.CREATE_MESSAGE_FAILURE,
    isCreating:false,
    error
});

export const createMessage = (message) => async (dispatch) =>{
    try {
        dispatch(createMessageRequest());
        const res = await API.Message.create(message);
        dispatch(createMessageSuccess(message));

    } catch (e) {
        dispatch(createMessageFailure(e));
    }
};

export const fetchMessagesRequest = () =>({
    type:type.FETCH_MESSAGES_REQUEST,
    isFetching:true,
    error:null
});
export const fetchMessagesSuccess = (payload,channelId) =>({
    type:type.FETCH_MESSAGES_SUCCESS,
    isFetching:false,
    channelId,
    payload,
    error:null
});
export const fetchMessagesFailure = (error) =>({
    type:type.FETCH_MESSAGES_FAILURE,
    isFetching:false,
    error
});

export const updateSlice = (ids, channelId) =>({
    type:'UPDATE_SLICE',
    ids,
    channelId
});

export const addMessageToSlice = (message) => (dispatch, getState) =>{
    const {
        ids=[], pageCount=0, slice=[]
    } = getState().pagination.idsByChannel[message.channelId]||{};
    dispatch(updateSlice([...slice, message.id], message.channelId));
};

const checkMoreAfter = (slice, ids) =>{
    const lastId = slice.slice(-1)[0];
    const start = ids.indexOf(lastId);
    if(start<0) return 0;
    return ids.slice(start+1, ids.length-1).length;
};

export const loadMoreAfter = (channelId) => async (dispatch, getState) =>{
    const {
        ids=[], pageCount=0, slice=[]
    } = getState().pagination.idsByChannel[channelId]||{};

    if(checkMoreAfter(slice,ids)){
        const index = 1 + ids.indexOf(slice.slice(-1)[0]);
        return dispatch(updateSlice([...slice, ...ids.slice(index, index+LIMIT_PAGINATION)], channelId));
    }
};

const checkMoreBefore = (slice, ids) =>{
    const end = ids.indexOf(slice[0])-1;
    if (end <= 0) return 0;
    return ids.slice(0, end).length;
};

export const loadMoreBefore = (channelId) => async (dispatch, getState) =>{
    const {
        ids=[], pageCount=0, slice=[]
    } = getState().pagination.idsByChannel[channelId]||{};

    if(checkMoreBefore(slice,ids)){
        const index = ids.indexOf(slice[0]);
        const start = index - LIMIT_PAGINATION < 0 ? 0 : index - LIMIT_PAGINATION;

        return dispatch(updateSlice([...ids.slice(start, index-1),...slice], channelId));
    }else{
        return dispatch(fetchMessages(channelId,true));
    }
};



export const fetchMessages = (channelId, nextPage) => async (dispatch,getState) =>{
    try {
        const {
            ids=[], pageCount=0, slice=[]
        } = getState().pagination.idsByChannel[channelId]||{};

        const offset = ids.length;
        if(nextPage || pageCount===0){
            console.warn('грузим с сервера');

            dispatch(fetchMessagesRequest());
            const res = await API.Message.getByChannel(channelId, LIMIT_PAGINATION, offset);
            if(res.length===0) return;
            const payload = normalize(res, arrayOf(schemas.message));

            dispatch(fetchMessagesSuccess(payload,channelId));

            const {
                ids=[], slice=[]
            } = getState().pagination.idsByChannel[channelId]||{};

            //if channel is opened for the first time.
            if (pageCount===0) dispatch(updateSlice(payload.result, channelId));

            //if nextPage true
            else {
                const index = ids.indexOf(slice[0]);
                dispatch(updateSlice([...ids.slice(0, index-1),...slice], channelId));
            }
            //if nextPage false and pageCount!==0
        } else {
            console.info('загружаем кусок запомненый из загруженых');
            const {
                ids=[], slice=[], firstVisibleId
            } = getState().pagination.idsByChannel[channelId] || {};
            const index = ids.indexOf(firstVisibleId);

            dispatch(updateSlice(ids.slice(index, index+LIMIT_PAGINATION), channelId));
        }

        // return payload;
    } catch (e) {
        dispatch(fetchMessagesFailure(e));
        console.error('error',e);
    }
};
