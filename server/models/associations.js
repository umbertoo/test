import db from './db';

import {
  Server,
  Channel,
  User,
  Message,
  Permission,
  Resource,
  Action,
  Role,
  UserServerRoles,
  ServerMembers,
  ServerRole,
  Attribute,
  ViewedMessages
} from './index';



///Message
Channel.hasMany(Message, {foreignKey: {name:'channelId', allowNull:false}});
Message.belongsTo(Channel,{foreignKey: {name:'channelId', allowNull:false}});

Server.hasMany(Message, {as: 'Messages',foreignKey: {name:'serverId', allowNull:false}});
Message.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});

User.hasMany(Message, {as: 'Messages',foreignKey: {name:'userId', allowNull:false}});
Message.belongsTo(User, {foreignKey: {name:'userId', allowNull:false}});

User.belongsToMany(Message, {as:'ViewedMessages', through: ViewedMessages});
Message.hasMany(ViewedMessages, {foreignKey: {name:'messageId', allowNull:false}});
ViewedMessages.belongsTo(Message, {foreignKey: {name:'messageId', allowNull:false}});
// Message.belongsToMany(User, {as:'ViewedMessages', through: ViewedMessages});


//Channel
Server.hasMany(Channel, {foreignKey: {name:'serverId', allowNull:false}});
Channel.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});

// Server.belongsTo(Channel , {as:'GeneralChannel',foreignKey: {name:'generalChannelId'}});


//User
User.belongsToMany(Server, {through: ServerMembers});
Server.belongsToMany(User, {as:'Members',through: ServerMembers});

Server.belongsToMany(User, {as:'ServerOwners', through: 'server_owners', foreignKey:'serverId'});
User.belongsToMany(Server, {as:'OwnServers', through: 'server_owners', foreignKey:'ownerId'});

User.belongsToMany(Role, {through:'user_roles'});
Role.belongsToMany(User, {through:'user_roles'});

/// ROLES
Server.belongsToMany(Role, {through:'server_roles'});
Role.belongsToMany(Server, {through:'server_roles'});

Role.belongsToMany(Role,{as:'inherits',through:'inherited_roles', foreignKey:'roleId', otherKey:'inheritedRoleId'});

/// Permission
Role.belongsToMany(Permission, {through: 'role_permissions'});
Permission.belongsToMany(Role, {through: 'role_permissions'});

Resource.hasMany(Permission, { foreignKey: {name:'resourceId'} } );
Permission.belongsTo(Resource, { foreignKey: {name:'resourceId'} } );


Attribute.hasMany(Permission, { foreignKey: {name:'attributeId'} } );
Permission.belongsTo(Attribute, { foreignKey: {name:'attributeId'} } );

Action.hasMany(Permission, { foreignKey: {name:'actionId'} } );
Permission.belongsTo(Action, { foreignKey: {name:'actionId'} } );




// Server.findById(1).then(serv=>{
//
//   // serv.setServerOwners([1]);
//   // serv.setMembers([1,2,3]).catch(e=>console.log(e));
// });
// Resource.create({name:'server'});
// Resource.create({name:'message'});
// Action.create({name:'edit'});
// Action.create({name:'create'});
// Action.create({name:'delete'});

// Permission.create({name:""})
console.log('##'.green);
db.sync(
  // {force:true}
).then(()=>{
//
//   console.log('sss'.cyan);
  // Promise.all([
  //   Server.create({
  //     name: 'server1',
  //     description: 'first server'
  //   }),
  //   Server.create({
  //     name: 'server2',
  //     description: 'second server'
  //   }),
  //   Server.create({
  //     name: 'server3',
  //     description: 'third server'
  //   })
  // ])
  // .then(servers=>{
  //
  //   Channel.create({
  //     name: 'channel1',
  //     description: 'first channel',
  //     serverId:1
  //   });
  //   Channel.create({
  //     name: 'channel2',
  //     description: 'second channel',
  //     serverId:1
  //   });
  //   Channel.create({
  //     name: 'channel3',
  //     description: 'third channel',
  //     serverId:1
  //   });
  // Promise.all([
  //     User.create({
  //       name: 'utro',
  //       password: '123',
  //       email:'v.kokovin@gmail.com'
  //     }),
  //     User.create({
  //       name: 'admin',
  //       password: '123',
  //       email:'test@test.test'
  //     }),
  //     User.create({
  //       name: 'superchel',
  //       password: '123',
  //       email:'test2@test.test'
  //     })
  //   ]).then(()=>{
  //     // servers[0].setMembers([1,2,3]);
  //     // Server.findById(1).then(serv=>{
  //     //
  //     //   serv.setServerOwners([1]);
  //     //   serv.setMembers([1,2,3]);
  //     // });
  //
  //
  //
  //   }
  // )
// });

}
);
