import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

export const selectChannel = (id) =>({
    type:type.SELECT_CHANNEL,
    id
});

//------------------------------------------------------------------------
export const fetchChannelsRequest = () =>({
    type:type.FETCH_CHANNELS_REQUEST,
    isFetching:true
});
export const fetchChannelsSuccess = (payload) =>({
    type:type.FETCH_CHANNELS_SUCCESS,
    isFetching:false,
    payload
});
export const fetchChannelsFailure = (error) =>({
    type:type.FETCH_CHANNELS_FAILURE,
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
            type:type.SAVE_LAST_VISIBLE_MESSAGE,
            lastVisibleMessage:{date:message.createdAt, id:message.id},
            channelId
        });
    }catch(e){
        console.error(e);
    }
};
export const saveScrollPosition = ({channelId, scrollPosition, firstVisibleId}) =>({
    type:type.SAVE_SCROLL_POSITION,
    scrollPosition,
    firstVisibleId,
    channelId
});

export const setChannelHasNewMessages = (channelId) =>({
    type:type.SET_CHANNEL_HAS_NEW_MESSAGES,
    channelId
});

export const unsetChannelHasNewMessages = (channelId) =>(dispatch, getState)=>{
    const { channelsWithNewMessages } = getState().entities.channels;
    if (channelsWithNewMessages.indexOf(channelId)>-1){
        dispatch({
            type:type.UNSET_CHANNEL_HAS_NEW_MESSAGES,
            channelId
        });
    }
};

export const sendTypingRequest = () =>({
    type:type.SEND_TYPING_REQUEST,
    isFetching:true
});
export const sendTypingSuccess = (payload) =>({
    type:type.SEND_TYPING_SUCCESS,
    isFetching:false,
    payload
});
export const sendTypingFailure = (error) =>({
    type:type.SEND_TYPING_FAILURE,
    isFetching:false,
    error
});

export const sendTyping = (channelId) => async dispatch =>{
  console.log('sendTyping');
    try {
      dispatch(sendTypingRequest());
      const res = await API.Channel.sendTyping(channelId);
      dispatch(sendTypingSuccess());
    } catch (e) {
      dispatch(sendTypingFailure(e));
    }
};

export const stopTyping = (userId, channelId) =>({
  type:type.STOP_TYPING, userId, channelId
});

export const startTyping = (userId, channelId) => dispatch =>{
  dispatch({type:type.START_TYPING, userId, channelId});
console.log('after startTyping');
  setTimeout(()=>{
    console.log('timeout!');
    dispatch(stopTyping(userId, channelId))},7000);
  console.log('startTyping', userId, channelId);
};
