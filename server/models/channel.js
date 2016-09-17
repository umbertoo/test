import Sequelize from 'sequelize';
import db from '../db';
import Message from './message';
import Server from './server';
import User  from './user';

const Channel = db.define('channel', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING
    }
});


Channel.hasMany(Message, {as: 'Messages',foreignKey: 'channelId'});
Message.belongsTo(Channel,{foreignKey: 'channelId'});

Server.hasMany(Channel, {as: 'Channels',foreignKey: 'serverId'});
Channel.belongsTo(Server, {foreignKey: 'serverId'});
// Message will have channelId
// Channel will get accessors getMessages and setMessages;
User.hasMany(Message, {as: 'Messages',foreignKey: 'userId'});
Message.belongsTo(User, {foreignKey: 'userId'});
// Message will have userId
// User will get accessors getMessages and setMessages;
Channel.sync(
    // {force: true}
).then( ()=> {  
    // console.log('я тут');
    //   Server.create({
    //     name: 'server1',
    //     description: 'first server'
    //
    // }).then(server=>{
    //     server.setUsers([1,2,3]);
    //
    //     Channel.create({
    //       name: 'channel3',
    //       description: 'third channel',
    //       serverId:1
    //   });
    //     Channel.create({
    //       name: 'channel2',
    //       description: 'third channel',
    //       serverId:1
    //   });
    //     Channel.create({
    //       name: 'channel1',
    //       description: 'third channel',
    //       serverId:1
    //   });
    //   User.create({
    //       name: 'utro',
    //       password: '123',
    //       email:'v.kokovin@gmail.com'
    //   });
    //   User.create({
    //       name: 'admin',
    //       password: '123',
    //       email:'test@test.test'
    //   });
    //   User.create({
    //       name: 'superchel',
    //       password: '123',
    //       email:'test2@test.test'
    //   });
    // });

});

export default Channel;
