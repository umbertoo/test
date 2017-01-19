import IO from 'socket.io';
import socketioJwt from 'socketio-jwt';

import uniq from 'lodash/uniq';
import config from '../config/main';
import {Message, Server} from '../models/';
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

            io.sockets.emit('updateUsersOnline',Object.keys(usersOnline));

            io.emit('userConnect',socket.user.id);

            socket.on('disconnect', () => {
                delete usersOnline[socket.user.id];
                socket.broadcast.emit('updateUsersOnline',Object.keys(usersOnline));
                socket.broadcast.emit('userDisconnect',socket.user.id);

                // socket.broadcast.emit('message',socket.user.name+' was disconnect');
            });
            socket.on('connectServer', async (serverId,cb) => {
            //   const server = await Server.findById(serverId);
            //   const channels = await server.getChannels();
            //
            //   const channelsIds = channels.map(c=>c.id);
            //   const messages = await Propmise.all(Message.findAll({
            //     where:{channelId:{in:channelsIds}}
            //   })
            // );
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
