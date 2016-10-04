import Sequelize from 'sequelize';
import db from '../db';
import Message from './message';
import Channel from './channel';
import User  from './user';
import Role,{UserRolesPerServer} from './role';

const Server = db.define('server', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING
  }
});

User.belongsToMany(Server, {through: 'server_members'});
Server.belongsToMany(User, {as:'Members',through: 'server_members'});

Server.belongsToMany(User, {as:'ServerOwners', through: 'server_owners', foreignKey:'serverId'});
User.belongsToMany(Server, {as:'OwnServers', through: 'server_owners', foreignKey:'ownerId'});


Server.hasMany(Message, {as: 'Messages',foreignKey: {name:'serverId', allowNull:false}});
Message.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});


Server.hasMany(UserRolesPerServer,{as: 'UserRoles', foreignKey:'serverId'});

Role.hasMany(UserRolesPerServer,{as: 'UserRoles', foreignKey:'roleId'});
UserRolesPerServer.belongsTo(Role,{foreignKey:'roleId'});

User.hasMany(UserRolesPerServer,{as: 'UserRoles', foreignKey:'userId'});


export default Server;
