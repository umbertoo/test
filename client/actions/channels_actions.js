import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { getChangedItemsFromOrder } from "../utils/getChangedItemsFromOrder";

export const selectChannel = (id) =>({
  type:type.SELECT_CHANNEL,
  id
});
//------------------------------------------------------------------------
export const fetchChannelsRequest = () =>({
  type:type.FETCH_CHANNELS_REQUEST,
  isFetching:true,
  error:null
});
export const fetchChannelsFailure = (error) =>({
  type:type.FETCH_CHANNELS_FAILURE,
  isFetching:false,
  error
});
export const fetchChannelsSuccess = (payload,serverId) =>({
  type:type.FETCH_CHANNELS_SUCCESS,
  serverId,
  isFetching:false,
  payload
});



export const fetchChannels = serverId => async dispatch =>{
  try {
    dispatch(fetchChannelsRequest());

    const res = await API.Channel.getByServer(serverId);
    const payload = normalize(res,arrayOf(schemas.channel));

    dispatch(fetchChannelsSuccess(payload, serverId));
  } catch (e) {
    dispatch(fetchChannelsFailure(e));
    console.error('error',e);
  }
};

//------------------------------------------------------------------------

export const createChannelRequest = () =>({
  type:type.CREATE_CHANNEL_REQUEST,
  isFetching:true,
  error:null
});
export const createChannelFailure = (error) =>({
  type:type.CREATE_CHANNEL_FAILURE,
  isFetching:false,
  error
});
export const createChannelSuccess = (payload, serverId) =>({
  type:type.CREATE_CHANNEL_SUCCESS,
  isFetching:false,
  serverId,
  payload
});

export const createChannel = ({serverId, name, description}) => async dispatch =>{
  try {
    dispatch(createChannelRequest());
    const channel = await API.Channel.create({serverId, name, description});
    const result = normalize(channel, schemas.channel);
    console.log('createChannel', result);
    dispatch(createChannelSuccess(result, serverId));

  } catch (e) {
    console.error(e);
    dispatch(createChannelFailure('create channel error'));
  }
};

//------------------------------------------------------------------------

export const deleteChannelRequest = () =>({
  type:type.DELETE_CHANNEL_REQUEST,
  isFetching:true,
  error:null
});
export const deleteChannelFailure = (error) =>({
  type:type.DELETE_CHANNEL_FAILURE,
  isFetching:false,
  error
});
export const deleteChannelSuccess = (channelId, serverId) =>({
  type:type.DELETE_CHANNEL_SUCCESS,
  isFetching:false,
  serverId,
  channelId
});

export const deleteChannel = (channelId) => async dispatch =>{
  try {
    dispatch(deleteChannelRequest());
    const channel = await API.Channel.delete(channelId);
    console.log(channel.serverId,'deleteChannel serverId');
    console.log('deleteChannel',channelId);
    dispatch(deleteChannelSuccess(channelId, channel.serverId));

  } catch (e) {
    console.error(e);
    dispatch(deleteChannelFailure('delete channel error'));
  }
};
//------------------------------------------------------------------------

export const editChannelRequest = () =>({
  type:type.EDIT_CHANNEL_REQUEST,
  isFetching:true,
  error:null
});
export const editChannelFailure = (error) =>({
  type:type.EDIT_CHANNEL_FAILURE,
  isFetching:false,
  error
});
export const editChannelSuccess = (payload) =>({
  type:type.EDIT_CHANNEL_SUCCESS,
  isFetching:false,
  payload
});

export const editChannel = ({id, name, description}) => async dispatch =>{
  try {
    dispatch(editChannelRequest());
    const channel = await API.Channel.edit({id, name, description});
    const result = normalize(channel, schemas.channel);
    console.log('editChannel', result);
    dispatch(editChannelSuccess(result));

  } catch (e) {
    console.error(e);
    dispatch(editChannelFailure('edit channel error'));
  }
};

//------------------------------------------------------------------------

export const editChannelsOrderRequest = () =>({
  type:type.EDIT_CHANNELS_ORDER_REQUEST,
  isFetching:true,
  error:null
});
export const editChannelsOrderFailure = (error) =>({
  type:type.EDIT_CHANNELS_ORDER_FAILURE,
  isFetching:false,
  error
});
export const editChannelsOrderSuccess = (oldIndex, newIndex,serverId) =>({
  type:type.EDIT_CHANNELS_ORDER_SUCCESS,
  isFetching:false,
  serverId,
  oldIndex, newIndex
});




export const editChannelsOrder = (oldIndex, newIndex, serverId) =>
async (dispatch, getState) =>{
  try {
    dispatch(editChannelsOrderRequest());
    dispatch(editChannelsOrderSuccess(oldIndex, newIndex, serverId));

    const {channels:order} = getState().entities.servers.items[serverId]||{};
    const orderData = getChangedItemsFromOrder(oldIndex, newIndex, order);

    const channels = await API.Channel.editOrder(orderData);
    const result = normalize(channels, arrayOf(schemas.channel));

  } catch (e) {
    console.error(e);
    dispatch(editChannelsOrderFailure('create channel error'));
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

  if (channelsWithNewMessages.indexOf(channelId) > -1){
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
  setTimeout(()=>{
    dispatch(stopTyping(userId, channelId));
  },7000);
  };
