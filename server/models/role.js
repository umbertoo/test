import Sequelize from 'sequelize';
import db from '../db';
import User from './user';
import Server from './server';
const Role = db.define('role', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
export const UserRolesPerServer = db.define('user_roles_per_server', {
  serverId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique:'idsComposition'
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique:'idsComposition'
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false
    // unique:'idsComposition'
  }
});
// User.belongsToMany(Role, {through: UserRolesPerServer,constraints: false});
// Role.belongsToMany(User, {through: UserRolesPerServer,constraints: false});

export default Role;
