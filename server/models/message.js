 import Sequelize from 'sequelize';
import db from '../db';

const Message = db.define('message', {
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Message;
