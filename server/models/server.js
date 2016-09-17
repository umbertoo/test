import Sequelize from 'sequelize';
import db from '../db';
import Message from './message';
import Channel from './channel';
import User  from './user';


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
Server.belongsToMany(User, {through: 'server_members'});



Server.hasMany(Message, {as: 'Messages',foreignKey: 'serverId'});
Message.belongsTo(Server, {foreignKey: 'serverId'});

export default Server;
