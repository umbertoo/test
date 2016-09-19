import types from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import { socket } from './common/socketEvents';






export const createMessageRequest = () =>({
    type:types.CREATE_MESSAGE_REQUEST,
    isCreating:true
});
export const createMessageSuccess = (message) =>({
    type:types.CREATE_MESSAGE_SUCCESS,
    isCreating:false,
    message,
    channelId:message.channelId
});
export const createMessageFailure = (error) =>({
    type:types.CREATE_MESSAGE_FAILURE,
    isCreating:false,
    error
});

export const createMessage = (message) => dispatch =>{
    dispatch(createMessageRequest());
    return new Promise((res,rej) =>{
        socket.emit('message',message, (err,message) =>{
            if(err) {
                rej(err);
                return dispatch(createMessageFailure(err));
            }
            dispatch(createMessageSuccess(message));
            res(message);
        });
    });
};


export const fetchMessagesRequest = () =>({
    type:types.FETCH_MESSAGES_REQUEST,
    isFetching:true,
    error:null
});
export const fetchMessagesSuccess = (payload,channelId) =>({
    type:types.FETCH_MESSAGES_SUCCESS,
    isFetching:false,
    channelId,
    payload,
    error:null
});
export const fetchMessagesFailure = (error) =>({
    type:types.FETCH_MESSAGES_FAILURE,
    isFetching:false,
    error
});

export const updateSlice = (ids, channelId) =>({
    type:'UPDATE_SLICE',
    ids,
    channelId
});

export const fetchMessages = (channelId, nextPage, existBefore, existAfter) => async (dispatch,getState) =>{
    console.log('fetchMessages');
    //if pageCount = 0 , then channel is opened for the first time.
    //thus I could save a first slice by saving all messages from a first fetch.
    try {
        const {
            ids=[], pageCount=0, slice=[]
        } = getState().pagination.idsByChannel[channelId]||{};

        if(existBefore){
            console.warn('есть еще вверху уже подгруженые');
            const index = ids.indexOf(slice[0]);
            const start = index - 30 < 0 ? 0 : index - 30;
            return dispatch(updateSlice([...ids.slice(start, index-1),...slice], channelId));
        }
        if(existAfter){
            console.log('есть еще ВНИЗУ уже подгруженые');
            const index = 1 + ids.indexOf(slice.slice(-1)[0]);
            return dispatch(updateSlice([...slice, ...ids.slice(index, index+30)], channelId));
        }

        const limit = 30;
        const offset = ids.length;
        if(nextPage || pageCount===0){
            console.warn('грузим с сервера');

            dispatch(fetchMessagesRequest());
            const res = await API.Message.getByChannel(channelId, limit, offset);
            const payload = normalize(res, arrayOf(schemas.message));

            dispatch(fetchMessagesSuccess(payload,channelId));
            //if channel is opened for the first time.

            const {
                ids=[], slice=[]
            } = getState().pagination.idsByChannel[channelId]||{};

            if (pageCount===0) dispatch(updateSlice(payload.result, channelId));
            //if channel is opened for the first time.
            else {
                const index = ids.indexOf(slice[0]);
                dispatch(updateSlice([...ids.slice(0, index-1),...slice], channelId));
            }

        }else{
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
    type:types.LOAD_MESSAGES,
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
