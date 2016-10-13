  import Sequelize from 'sequelize';
import db from '../db';
import User from './user';
import Server from './server';
import Permission from './permission';

const Role = db.define('role', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
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
Permission.belongsToMany(Role, {through: 'role_permissions'});
Role.belongsToMany(Permission, {through: 'role_permissions'});

// User.belongsToMany(Role, {through: UserRolesPerServer,constraints: false});
// Role.belongsToMany(User, {through: UserRolesPerServer,constraints: false});

export default Role;
