import IO from 'socket.io';
import socketioJwt from 'socketio-jwt';

import uniq from 'lodash/uniq';
import config from '../config/main';

export default function createSocketServer(server){

    if(server) {
        const io = IO(server);

        const usersOnline={};

        io.use(socketioJwt.authorize({
            secret: config.secret,
            handshake: true
        }));

        io.on('connection', socket => {
            const {user} =socket.decoded_token;
            socket.user = {...user};
            delete socket.user.password;

            usersOnline[socket.user.id] = socket.user;

            io.sockets.emit('updateUsersOnline',usersOnline);

            socket.on('disconnect', () => {
                delete usersOnline[socket.user.id];
                socket.broadcast.emit('updateUsersOnline',usersOnline);
                // socket.broadcast.emit('message',socket.user.name+' was disconnect');
            });
            socket.on('connectServer', (serverId) => {
                // const oldServer = socket.server;
                socket.servers=[...socket.servers||[], serverId];
                // socket.server = serverId;
                // socket.leave(oldServer);
                socket.join(serverId);
            });
        });
        return io;
    }else {
        console.error('socket-sever error: server has not been passed');
    }
}
