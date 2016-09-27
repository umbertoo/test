
// import * as actions from '../index';
import {
    updateUsers, updateUsersOnline,
    loadMessages, receiveMessage , setChannelHasNewMessages,
    addMessageToSlice, updateMessage, deleteMessageSuccess
} from '../index';
import io from 'socket.io-client';
import { normalize, arrayOf } from "normalizr";
import * as schemas from "../common/schemas";

export const socket = io.connect('http://localhost:3000/',{
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
        //need id of active channel
        if(getState().ui.selectedChannel !== message.channelId){
            dispatch(setChannelHasNewMessages(message.channelId));
        }
    });
    socket.on('editmessage',(message)=>{
      const {
          items={}
      } = getState().entities.messages;
      if(items[message.id]){
        dispatch(updateMessage(message));
      }
      console.log('editmessage',message);
    });
    socket.on('deletemessage',(message)=>{
      const {
          items={}
      } = getState().entities.messages;
      if(items[message.id]){
        dispatch(deleteMessageSuccess(message));
      }
      console.log('deletemessage',message);
    });
    socket.on('updateUsers', users => {
        let payload = normalize(users, arrayOf(schemas.user));
        dispatch(updateUsers(payload));
    });

    socket.on('updateUsersOnline',usersOnline=>{
        let payload = normalize(usersOnline, arrayOf(schemas.user));
        dispatch(updateUsersOnline(payload));
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
