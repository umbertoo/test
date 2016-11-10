import Sequelize from 'sequelize';
import db from './db';

export const Attribute = db.define('attribute', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
console.log('Attribute'.cyan);
