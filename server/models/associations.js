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
  Attribute
} from './index';


console.log('OOOOOOO'.green);
Channel.hasMany(Message, {as: 'Messages',foreignKey: {name:'channelId', allowNull:false}});
Message.belongsTo(Channel,{foreignKey: {name:'channelId', allowNull:false}});

Server.hasMany(Message, {as: 'Messages',foreignKey: {name:'serverId', allowNull:false}});
Message.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});

Server.hasMany(Channel, {foreignKey: {name:'serverId', allowNull:false}});
Channel.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});

// Server.hasMany(UserServerRoles,{foreignKey:'serverId'});
// UserServerRoles.belongsTo(Server,{foreignKey:'serverId'});
//
// Role.hasMany(UserServerRoles,{foreignKey:'roleId'});
// UserServerRoles.belongsTo(Role,{foreignKey:'roleId'});
//
// User.hasMany(UserServerRoles,{foreignKey:'userId'});
// UserServerRoles.belongsTo(User,{foreignKey:'userId'});
//
User.hasMany(Message, {as: 'Messages',foreignKey: {name:'userId', allowNull:false}});
Message.belongsTo(User, {foreignKey: {name:'userId', allowNull:false}});

Role.belongsToMany(Permission, {through: 'role_permissions'});
Permission.belongsToMany(Role, {through: 'role_permissions'});

User.belongsToMany(Server, {through: ServerMembers});
Server.belongsToMany(User, {as:'Members',through: ServerMembers});

Server.belongsToMany(User, {as:'ServerOwners', through: 'server_owners', foreignKey:'serverId'});
User.belongsToMany(Server, {as:'OwnServers', through: 'server_owners', foreignKey:'ownerId'});


Server.hasMany(ServerRole, { foreignKey: {name:'serverId'} } );
ServerRole.belongsTo(Server, { foreignKey: {name:'serverId'} } );

// Role.belongsTo(Role,{as:'Inherits',foreignKey:'inherits'})
Role.belongsToMany(Role,{as:'inherits',through:'inherited_roles', foreignKey:'roleId', otherKey:'inheritedRoleId'});


Role.hasMany(ServerRole, { foreignKey: {name:'roleId'} } );
ServerRole.belongsTo(Role, { foreignKey: {name:'roleId'} } );

User.belongsToMany(ServerRole, {through:UserServerRoles});
ServerRole.belongsToMany(User, {through:UserServerRoles});

ServerRole.hasMany(UserServerRoles,{foreignKey:'serverRoleId'});
UserServerRoles.belongsTo(ServerRole,{foreignKey:'serverRoleId'});



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
