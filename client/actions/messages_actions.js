import type from './common/types';
import API from "./common/API/API";
import { normalize, arrayOf } from "normalizr";
import * as schemas from "./common/schemas";
import { socket } from './common/socketEvents';
import {getChannelData} from '../selectors/selectors';

import union from 'lodash/union';

export const LIMIT_PAGINATION = 45;
export const BOTTOM_POSITION = -1;
export const TOP_INDENT = 60;

import {
  unsetChannelHasNewMessages,
  setScrollIsBottom,
  setScrollPosition
} from './channels_actions';

import {addConfirmation} from './ui_actions';

export const updateMessageAckRequest = () =>({
    type:type.UPDATE_MESSAGE_ACK_REQUEST,
    isFetching:true,
    error:null
});
export const updateMessageAckSuccess = (response) =>({
    type:type.UPDATE_MESSAGE_ACK_SUCCESS,
    isFetching:false,
    error:null,
    response
});
export const updateMessageAckFailure = (error) =>({
    type:type.UPDATE_MESSAGE_ACK_FAILURE,
    isFetching:false,
    error
});

export const updateMessageAck = (messageId) => async dispatch =>{
    try {
      dispatch(updateMessageAckRequest());
      const response = await API.Message.updateAck(messageId);
      console.log(response,'updateMessageAck');
      dispatch(updateMessageAckSuccess(response));

    } catch (e) {
      console.error(e);
      dispatch(updateMessageAckFailure(e));

    }
};
//_________________________________
export const fetchMessagesAckRequest = () =>({
    type:type.FETCH_MESSAGES_ACK_REQUEST,
    isFetching:true,
    error:null
});
export const fetchMessagesAckSuccess = (response,serverId) =>({
    type:type.FETCH_MESSAGES_ACK_SUCCESS,
    isFetching:false,
    error:null,
    serverId,
    response
});
export const fetchMessagesAckFailure = (error) =>({
    type:type.FETCH_MESSAGES_ACK_FAILURE,
    isFetching:false,
    error
});



export const fetchMessagesAck = (serverId) => async dispatch =>{
    try {
      dispatch(fetchMessagesAckRequest());
      const response = await API.Message.fetchAckByServer(serverId);
      console.log(response,'getLastVisible');
      dispatch(fetchMessagesAckSuccess(response, serverId));

    } catch (e) {
      console.error(e);
      dispatch(fetchMessagesAckFailure(e));

    }
};
//_____________________________________________________________________________


export const createMessageRequest = () =>({
  type:type.CREATE_MESSAGE_REQUEST,
  isCreating:true
});

export const createMessageSuccess = (response, channelId) =>({
  type:type.CREATE_MESSAGE_SUCCESS,
  isCreating:false,
  response,
  channelId
});

export const createMessageFailure = (error) =>({
  type:type.CREATE_MESSAGE_FAILURE,
  isCreating:false,
  error
});

//------------------------------


export const createMessage = (message) => async (dispatch, getState) =>{
  try {
    dispatch(createMessageRequest());
    const msg = await API.Message.create(message);
    const response = normalize(msg, schemas.message);

    const { channelId } = msg;

    // dispatch(createMessageSuccess(response, channelId));

  } catch (e) {
    dispatch(createMessageFailure(e));
  }
};
//_____________________________________________________________________________

export const fetchMessagesRequest = () =>({
  type:type.FETCH_MESSAGES_REQUEST,
  isFetching:true,
  error:null
});

export const fetchMessagesSuccess = (response, channelId, moreBefore) =>({
  type:type.FETCH_MESSAGES_SUCCESS,
  isFetching:false,
  moreBefore,
  channelId,
  response,
  error:null
});

export const fetchMessagesFailure = (error) =>({
  type:type.FETCH_MESSAGES_FAILURE,
  isFetching:false,
  error
});


export const fetchMessages = (channelId) => async (dispatch,getState) =>{
  try {
    if(!channelId) return;
    const { ids=[] } = getChannelData(getState(),{channelId})||{};

    const offset = ids.length;
    console.warn('грузим с сервера');
    dispatch(fetchMessagesRequest());

    const { messages, moreBefore } = await API.Message.getByChannel(channelId, LIMIT_PAGINATION, offset);
    const response = normalize(messages, arrayOf(schemas.message));

    dispatch(fetchMessagesSuccess(response, channelId, moreBefore));
  } catch (e) {
    dispatch(fetchMessagesFailure(e));
    console.error('error',e);
  }
};

export const receiveMessage = ({response, channelId, openedChannelId, isOwnMessage}) =>({
  type:type.RECEIVE_MESSAGE,
  channelId,
  response,
  openedChannelId,
  isOwnMessage
});

export const loadCacheBefore = (channelId ) =>({
  type:type.LOAD_CACHE_BEFORE,
  channelId
});

export const loadCacheAfter = (channelId,position) =>({
  type:type.LOAD_CACHE_AFTER,
  channelId,
  position
});

export const loadMoreAfter = (channelId,position) => dispatch =>{
  dispatch(loadCacheAfter(channelId,position));
};

export const loadMoreBefore = (channelId) => (dispatch, getState) =>{
  const { moreCacheBefore } = getChannelData(getState(),{channelId})||{};

  if(moreCacheBefore){
    dispatch(loadCacheBefore(channelId));
  }else{
    dispatch(fetchMessages(channelId));
  }
};





//_____________________________________________________________________________
export const editMessageRequest = () =>({
  type:type.EDIT_MESSAGE_REQUEST,
  isFetching:true
});
export const editMessageSuccess = (message) =>({
  type:type.EDIT_MESSAGE_SUCCESS,
  isFetching:false,
  message
});
export const editMessageFailure = (error) =>({
  type:type.EDIT_MESSAGE_FAILURE,
  isFetching:false,
  error
});

export const editMessage = (id, text) => async dispatch =>{
  try {
    dispatch(editMessageRequest());
    const message = await API.Message.edit(id, text);
    dispatch(editMessageSuccess(message));
    return message;
  } catch (e) {
    dispatch(editMessageFailure(e));
  }
};
export const editMessageWithConfirm = addConfirmation(editMessage, "ARE YOU SHURE?");


export const updateMessage = (message) =>({
  type:type.UPDATE_MESSAGE,
  message
});
//_____________________________________________________________________________
export const setEditableMessage = (id) =>({
  type:type.SET_EDITABLE_MESSAGE,
  id
});

export const unsetEditableMessage = () =>({
  type:type.UNSET_EDITABLE_MESSAGE,
  id:null
});

//_____________________________________________________________________________





export const deleteMessageRequest = () =>({
  type:type.DELETE_MESSAGE_REQUEST,
  isFetching:true,

});

export const deleteMessageSuccess = (message) =>({
  type:type.DELETE_MESSAGE_SUCCESS,
  isFetching:false,
  message,
  channelId:message.channelId
});

export const deleteMessageFailure = (error) =>({
  type:type.DELETE_MESSAGE_FAILURE,
  isFetching:false,
  error
});
// export const shouldConfirm = () => async dispatch =>{
//     ty
// };

export const deleteMessage = (id) => async dispatch =>{

  try {
    dispatch(deleteMessageRequest());
    const message = await API.Message.delete(id);
    dispatch(deleteMessageSuccess(message));
  } catch (e) {
    dispatch(deleteMessageFailure(e));
  }
};

export const deleteMessageWithConfirm = addConfirmation(deleteMessage, "ARE YOU SHURE?");
