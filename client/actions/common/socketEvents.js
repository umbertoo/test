
// import * as actions from '../index';
import {
    updateUsers, updateUsersOnline,
    loadMessages, createMessageSuccess , setChannelHasNewMessages
} from '../index';
import io from 'socket.io-client';
import { normalize, arrayOf } from "normalizr";
import * as schemas from "../common/schemas";

export const socket = io.connect('http://localhost:8000/',{
    'query': 'token=' + localStorage.getItem('token')
});

const socketEvents =  ({dispatch, getState}) => {
    socket.on('message', message=>{
        //message from other users
        dispatch(createMessageSuccess(message));
        //need id of active channel
        if(getState().ui.selectedChannel !== message.channelId){
            setChannelHasNewMessages(message.channelId);
        }


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
