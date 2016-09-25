import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import { socket } from './common/socketEvents';

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
        const res =  await API.Message.create(message);
        dispatch(createMessageSuccess(message));

    } catch (e) {
        dispatch(createMessageFailure(e));
    }
};
// export const createMessage = (message) => dispatch =>{
//     dispatch(createMessageRequest());
//     return new Promise((res,rej) =>{
//         socket.emit('message', message, (err,message) =>{
//             if(err) {
//                 rej(err);
//                 return dispatch(createMessageFailure(err));
//             }
//             // dispatch(createMessageSuccess(message));
//             res(message);
//         });
//     });
// };


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
        console.log('есть еще ВНИЗУ уже подгруженые', checkMoreAfter(slice,ids));
        const index = 1 + ids.indexOf(slice.slice(-1)[0]);
        return dispatch(updateSlice([...slice, ...ids.slice(index, index+30)], channelId));
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
        console.warn('есть еще ВВЕРХУ уже подгруженые',checkMoreBefore(slice,ids));
        const index = ids.indexOf(slice[0]);
        const start = index - 30 < 0 ? 0 : index - 30;

        return dispatch(updateSlice([...ids.slice(start, index-1),...slice], channelId));
    }else{
        return dispatch(fetchMessages(channelId,true));
    }
};



export const fetchMessages = (channelId, nextPage, direction) => async (dispatch,getState) =>{

    console.log('fetchMessages');
    //if pageCount = 0 , then channel is opened for the first time.
    //thus I could save a first slice by saving all messages from a first fetch.
    const LIMIT_PAGINATION = 30;

    try {

        // const user = await API.User.get();
        // console.log('user', user);
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

            dispatch(updateSlice(ids.slice(index, index+30), channelId));
        }

        // return payload;
    } catch (e) {
        dispatch(fetchMessagesFailure(e));
        console.error('error',e);
    }
};

export const loadMessages = (payload) =>({
    type:type.LOAD_MESSAGES,
    payload
});



// export function logout(router) {
//   return async (dispatch) => {
//     try {
//       const {data: {success, message}} = await axios.get('/logout');
//
//       (success)
//         ? dispatch({ type: LOGOUT_SUCCESS })
//         : dispatch({ type: LOGOUT_FAILURE, message });
//
//      } catch (e) {
//          dispatch({ type: LOGOUT_FAILURE, e.data.message });
//      }
//    };
// }
