import IO from 'socket.io';
import socketioJwt from 'socketio-jwt';

import uniq from 'lodash/uniq';
import config from '../config/main';
//models
import Channel from '../models/channel';
import Message from '../models/message';
import User from '../models/user';

let exclude = ['password','resetPasswordExpires','resetPasswordToken'];

// export default function (server) {
 // let io;
export default function createSocketServer(server){

    if(server) {
        const io = IO(server);

        const usersOnline={};

        io.use(socketioJwt.authorize({
            secret: config.secret,
            handshake: true
        }));

        io.on('connection', socket => {
            const {user} = socket.decoded_token;
            socket.user = {...user};
            delete socket.user.password;

            usersOnline[socket.user.id] = socket.user;

            io.sockets.emit('updateUsersOnline',usersOnline);

            // socket.on('message', (message,cb) => {
            //     console.log('message');
            //     Message.create({
            //         ...message,
            //         userId:socket.user.id
            //     }).then(message => {
            //         //send message to other sockets
            //         // socket.broadcast.emit('message',message);
            //         io.sockets.emit('message',message);
            //         //send message to this socket
            //         cb(null,message);
            //     }).catch(err=> cb(err));
            //
            // });

            socket.on('disconnect', () => {
                delete usersOnline[socket.user.id];
                socket.broadcast.emit('updateUsersOnline',usersOnline);
                // socket.broadcast.emit('message',socket.user.name+' was disconnect');
            });
            socket.on('switchServer', (serverId) => {
                let oldServer = socket.server;
                socket.server = serverId;
                socket.leave(oldServer);
                socket.join(socket.server);

                //
            });
        });
        return io;
    }else {
        console.error('socket-sever error: server has not been passed');
    }
}
// }
