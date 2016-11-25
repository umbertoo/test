import Sequelize from 'sequelize';
import db from './db';

export const Role = db.define('role', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color:{
    type: Sequelize.STRING,
    defaultValue: "99aab5"
  }
});

export const ServerRole = db.define('serverRole', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
},{ tableName : 'server_roles'});

export const UserServerRoles = db.define('userServerRole', {
},{
  tableName:'user_server_roles'
});

// export const UserServerRoles = db.define('userServerRole', {
//   serverId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     unique:'idsComposition'
//   },
//   userId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     unique:'idsComposition'
//   },
//   roleId: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//     // unique:'idsComposition'
//   }
// },{
//   tableName:'user_server_roles'
// });
console.log('role'.cyan);
