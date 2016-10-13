import Sequelize from 'sequelize';
import db from '../db';
import Message from './message';
import Server from './server';
import User  from './user';
import maxBy from 'lodash/maxBy';

const Channel = db.define('channel', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{    
        type: Sequelize.STRING
    },
    order:{
      type:Sequelize.INTEGER,
      allowNull:false
    }
});

Channel.beforeValidate((channel, options)=> {
  return Channel.findAll({where:{serverId:channel.serverId}}).then(channels=> {
    if(channels.length){
      const maxOrder = maxBy(channels,c=>c.order).order;
      channel.order = maxOrder+1;
    }else{
      channel.order = 1;
    }
  });
});

Channel.hasMany(Message, {as: 'Messages',foreignKey: {name:'channelId', allowNull:false}});
Message.belongsTo(Channel,{foreignKey: {name:'channelId', allowNull:false}});

Server.hasMany(Channel, {foreignKey: {name:'serverId', allowNull:false}});
Channel.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});
// Message will have channelId
// Channel will get accessors getMessages and setMessages;
User.hasMany(Message, {as: 'Messages',foreignKey: {name:'userId', allowNull:false}});
Message.belongsTo(User, {foreignKey: {name:'userId', allowNull:false}});
// Message will have userId
// User will get accessors getMessages and setMessages;


// for(let i=3; i<23; i++){
//   User.create({
//       name: 'user'+i,
//       password: '123',
//       email:'test'+i+'@test.test'
//   });}
// Server.findById(1).then(server=>server.setMembers([1,2,3,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]))

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
    //       name: 'channel1',
    //       description: 'first channel',
    //       serverId:1
    //   });
    //     Channel.create({
    //       name: 'channel2',
    //       description: 'second channel',
    //       serverId:1
    //   });
    //     Channel.create({
    //       name: 'channel3',
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
    //   }).then(user=> user.setOwnServers([1]));
    //   User.create({
    //       name: 'superchel',
    //       password: '123',
    //       email:'test2@test.test'
    //   });
    // });

});

export default Channel;
