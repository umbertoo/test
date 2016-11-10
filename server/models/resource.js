import Sequelize from 'sequelize';
import db from './db';

export const Resource = db.define('resource', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

console.log('Resource'.cyan);
