
// import * as actions from '../index';
import {
  updateUsers, updateUsersOnline,
  loadMessages, receiveMessage , setChannelHasNewMessages,
  addMessageToSlice, updateMessage, deleteMessageSuccess,
  startTyping, stopTyping,
  createChannelSuccess,
  editChannelSuccess,
  editUserSuccess,
  deleteChannelSuccess,
  fetchChannels
} from '../index';
import io from 'socket.io-client';
import { normalize, arrayOf } from "normalizr";
import * as schemas from "../common/schemas";

export const socket = io.connect('http://localhost:8090/',{
  'query': 'token=' + localStorage.getItem('token')
});


const socketEvents =  ({dispatch, getState}) => {
  socket.on('message', message=>{
    //message from other users
    dispatch(receiveMessage(message));
    const {
      ids=[], pageCount=0, slice=[]
    } = getState().pagination.idsByChannel[message.channelId]||{};
    //if message belongs to current slice of ids.
    if(ids.slice(-2)[0] === slice.slice(-1)[0]){
      dispatch(addMessageToSlice(message));
    }
    //clear typing user
    const {userId, channelId} = message;
    dispatch(stopTyping(userId, channelId));

    //need id of active channel
    if(getState().ui.params.channelId != message.channelId){
      dispatch(setChannelHasNewMessages(message.channelId));
    }
  });

  socket.on('startTyping',({user,channelId})=>{
    dispatch(startTyping(user.id,channelId));
  });

  socket.on('editMessage',(message)=>{
    const {
      items
    } = getState().entities.messages;
    if(items[message.id]){
      dispatch(updateMessage(message));
    }
  });

  socket.on('deleteMessage',(message)=>{
    const {
      items
    } = getState().entities.messages;
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

    // const payload = normalize(channel, schemas.channel);
    // dispatch(deleteChannelSuccess(payload));
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
