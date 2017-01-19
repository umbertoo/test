
// import * as actions from '../index';
import {
  updateUsers, updateUsersOnline,
  loadMessages, createMessageSuccess , setChannelHasNewMessages,
  addMessageToSlice, updateMessage, deleteMessageSuccess,
  startTyping, stopTyping,
  createChannelSuccess,
  editChannelSuccess,
  editUserSuccess,
  deleteChannelSuccess,
  fetchChannels,
  setScrollPosition,
  receiveMessage,
  updateMessageAck,

  BOTTOM_POSITION
} from '../index';
import io from 'socket.io-client';
import { normalize, arrayOf } from "normalizr";
import * as schemas from "../common/schemas";
import {getChannelData} from '../../selectors/selectors';

import debounce from 'lodash/debounce';
export const socket = io.connect('http://localhost:8090/',{
  'query': 'token=' + localStorage.getItem('token'),  'force new connection':false
});

const socketEvents =  ({dispatch, getState}, getProps) => {


  const updateMessageAckWithDebounce = debounce(
    (messageId)=>dispatch(updateMessageAck(messageId)),
    700,
    {leading:false}
  );

  socket.on('message', message=>{
    const response = normalize(message, schemas.message);
    const openedChannelId = getProps().params.channelId;
    const {user} = getState().auth;

    const isOwnMessage = message.userId == user;
 
    console.log('--message--');
    dispatch(receiveMessage({
      response, channelId:message.channelId, openedChannelId, isOwnMessage
    }));

    if(message.channelId == openedChannelId && !isOwnMessage){
      updateMessageAckWithDebounce(message.id);
    }
  });

  socket.on('startTyping',({user,channelId})=>{
    const {user:currentUserId} = getState().auth;
    if(currentUserId !== user.id){
      const { typingUsers } = getChannelData(getState(), {channelId});
      if(!typingUsers.some(id=>id==user.id)){
        dispatch(startTyping(user.id,channelId));
      }
    }

  });

  socket.on('editMessage',(message)=>{
    const { items } = getState().entities.messages;
    if(items[message.id]){
      dispatch(updateMessage(message));
    }
  });

  socket.on('deleteMessage',(message)=>{
    const { items } = getState().entities.messages;
    if(items[message.id]){
      dispatch(deleteMessageSuccess(message));
    }
  });
  ///Channel
  socket.on('createChannel', channel=>{
    const payload = normalize(channel, schemas.channel);
    dispatch(createChannelSuccess(payload, channel.serverId));
  });
  socket.on('editChannel', channel=>{
    const payload = normalize(channel, schemas.channel);
    dispatch(editChannelSuccess(payload, channel.serverId));
  });
  socket.on('deleteChannel', channel=>{
    dispatch(deleteChannelSuccess(channel.id, channel.serverId));
  });

  socket.on('editChannelsOrder', (channels,serverId)=>{
    const payload = normalize(channels, arrayOf(schemas.channel));
    console.log('socket editChannelsOrder',payload);
    dispatch(fetchChannels(serverId));

  });

  //User


  socket.on('userConnect', id => {

    console.warn('userConnect',id);

  });
  socket.on('userDisconnect', id => {

    console.warn('userDisconnect',id);

  });
  socket.on('editUser', user => {

    const payload = normalize(user, schemas.user);
    console.log('socket editUser',payload);

    dispatch(editUserSuccess(payload,user.id));
  });

  socket.on('updateUsersOnline',usersOnline=>{
    dispatch(updateUsersOnline(usersOnline));
    // this.setState({ usersOnline, users:merge({},usersOnline,this.state.users) });
  });

  socket.on("unauthorized", error=> {
    if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
      // redirect user to login page perhaps?
      // console.log("User's token has expired");
    }
  });

};

export default socketEvents;
