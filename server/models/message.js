import Sequelize from 'sequelize';
import db from './db';
// import Channel  from './channel';
// import User  from './user';

export const Message = db.define('message', {
  id: {
   type: Sequelize.INTEGER,
   primaryKey: true,
   autoIncrement: true // Automatically gets converted to SERIAL for postgres
 },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

console.log('Message'.cyan);
// Message.belongsTo(Channel,{foreignKey: {name:'channelId', allowNull:false}});
// Message.belongsTo(User, {foreignKey: {name:'userId', allowNull:false}});
// Message.belongsTo(Server, {foreignKey: {name:'serverId', allowNull:false}});
