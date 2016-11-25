import Sequelize from 'sequelize';
import db from './db';
// import Message from './message';
// import Server from './server';
// import User  from './user';
import maxBy from 'lodash/maxBy';

export const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING
  },
  order:{
    type:Sequelize.INTEGER,
    // allowNull:false
  },
  isGeneral:{
    type:Sequelize.BOOLEAN,
  }

});

// Channel.beforeValidate((channel, options)=> {
//   return Channel.findAll({where:{serverId:channel.serverId}}).then(channels=> {
//     if(channels.length){
//       const maxOrder = maxBy(channels,c=>c.order).order;
//       channel.order = maxOrder+1;
//     }else{
//       channel.order = 1;
//     }
//   });
// });
console.log('Channel'.cyan);
console.log(db.models);
// Channel.hasMany(db.models.message, {as: 'Messages',foreignKey: {name:'channelId', allowNull:false}});
// Channel.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});

// for(let i=3; i<23; i++){
//   User.create({
//       name: 'user'+i,
//       password: '123',
//       email:'test'+i+'@test.test'
//   });}
// Server.findById(1).then(server=>server.setMembers([1,2,3,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]))
