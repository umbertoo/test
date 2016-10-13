import Sequelize from 'sequelize';
import db from '../db';
import Message from './message';
import Channel from './channel';
import User  from './user';
import Role,{UserRolesPerServer} from './role';
import maxBy from 'lodash/maxBy';

const Server = db.define('server', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING
  }
});
export const ServerMembers = db.define('server_members',{
  order:{
    type: Sequelize.INTEGER,
    allowNull:false
  }
});
ServerMembers.beforeValidate((serverMember, options) => {
  if(serverMember.order) return;
  return ServerMembers.findAll({where:{userId:serverMember.userId}}).then(items => {
    if(items.length){
      const maxOrder = maxBy(items, s => s.order).order;
      serverMember.order = maxOrder+1;
    }else{
      serverMember.order = 1;
    }
  });
});

User.belongsToMany(Server, {through: ServerMembers});
Server.belongsToMany(User, {as:'Members',through: ServerMembers});

Server.belongsToMany(User, {as:'ServerOwners', through: 'server_owners', foreignKey:'serverId'});
User.belongsToMany(Server, {as:'OwnServers', through: 'server_owners', foreignKey:'ownerId'});


Server.hasMany(Message, {as: 'Messages',foreignKey: {name:'serverId', allowNull:false}});
Message.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});

Server.hasMany(UserRolesPerServer,{as: 'UserRoles', foreignKey:'serverId'});

Role.hasMany(UserRolesPerServer,{as: 'UserRoles', foreignKey:'roleId'});
UserRolesPerServer.belongsTo(Role,{foreignKey:'roleId'});
User.hasMany(UserRolesPerServer,{as: 'UserRoles', foreignKey:'userId'});
// ServerMembers.create({
//   userId:1, serverId:2
// }).then(()=>console.log('OK!!________________'));
// ServerMembers.findOne({where:{userId:1,serverId:2}})
// .then(item => item.update({order:11}));
// User.findById(1).then(user=>{
//   user.setServers()
// }).then(servers).catch(e=>console.error(e))
export default Server;
