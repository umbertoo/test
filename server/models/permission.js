import Sequelize from 'sequelize';
import db from './db';
// import Role from './role';
// import Action from './action';
// import Resource from './resource';

export const Permission = db.define('permission', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resourceId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      unique:'idsComposition'
    },
    actionId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      unique:'idsComposition'
    },
    attributeId:{
      type: Sequelize.INTEGER,
      unique:'idsComposition'
    },
    order:{
      type: Sequelize.INTEGER
    }
});
console.log('Permission'.cyan);
// Permission.belongsToMany(Role, {through: 'role_permissions'});
//
// Resource.belongsToMany(Action, {through:Permission,foreignKey: {name:'resourceId', allowNull:false}});
// Action.belongsToMany(Resource, {through:Permission,foreignKey: {name:'actionId', allowNull:false}});
