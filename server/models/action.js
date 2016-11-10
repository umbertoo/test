import Sequelize from 'sequelize';
import db from './db';

export const Action = db.define('action', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
console.log('Action'.cyan);
