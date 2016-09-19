import types from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";



export const switchChannel = (id) =>({
    type:types.SWITCH_CHANNEL,
    id
});

//------------------------------------------------------------------------
export const fetchChannelsRequest = () =>({
    type:types.FETCH_CHANNELS_REQUEST,
    isFetching:true
});
export const fetchChannelsSuccess = (payload) =>({
    type:types.FETCH_CHANNELS_SUCCESS,
    isFetching:false,
    payload
});
export const fetchChannelsFailure = (error) =>({
    type:types.FETCH_CHANNELS_FAILURE,
    isFetching:false,
    error
});


export const fetchChannels = serverId => async dispatch =>{
    try {
        dispatch(fetchChannelsRequest());

        let res = await API.Channel.getByServer(serverId);
        let payload = normalize(res,arrayOf(schemas.channel));

        dispatch(fetchChannelsSuccess(payload));
    } catch (e) {
        dispatch(fetchChannelsFailure(e));
        console.error('error',e);
    }
};

//------------------------------------------------------------------------
export const saveLastVisibleMessage = (channelId) => async (dispatch,getState) =>{

    try{
        const messages = getState().entities.messages.items;
        const ids = getState().pagination.idsByChannel[channelId].ids;
        const last_id = ids[ids.length-1];
        const message = messages[last_id];

        const {count} = await API.Message.getCount(channelId,last_id);
        console.log('count',count);
        const last_messages_by_channel = JSON.parse(localStorage.getItem('last_messages_by_channel'))||{};
        last_messages_by_channel[channelId] = last_id;
        localStorage.setItem('last_messages_by_channel',JSON.stringify(last_messages_by_channel));
        dispatch({
            type:types.SAVE_LAST_VISIBLE_MESSAGE,
            lastVisibleMessage:{date:message.createdAt, id:message.id},
            channelId
        });
    }catch(e){
        console.error(e);
    }
};
export const saveScrollPosition = ({channelId, scrollPosition, firstVisibleId}) =>({
    type:types.SAVE_SCROLL_POSITION,
    scrollPosition,
    firstVisibleId,
    channelId
});

export const setChannelHasNewMessages = (channelId) =>({
    type:types.SET_CHANNEL_HAS_NEW_MESSAGES,
    channelId
});

export const unsetChannelHasNewMessages = (channelId) =>({
    type:types.UNSET_CHANNEL_HAS_NEW_MESSAGES,
    channelId
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
