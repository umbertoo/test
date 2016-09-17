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


export const fetchMessages = (channelId, nextPage) => async (dispatch,getState) =>{

    try {
        const {
            ids=[], pageCount=0
        } = getState().pagination.idsByChannel[channelId]||{};

        const limit = 30;
        const offset = ids.length;
        if(nextPage || pageCount===0){

            dispatch(fetchMessagesRequest());
            let res = await API.Message.getByChannel(channelId,limit,offset);
            let payload = normalize(res,arrayOf(schemas.message));

            dispatch(fetchMessagesSuccess(payload,channelId));
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
