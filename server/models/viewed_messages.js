import Sequelize from 'sequelize';
import db from './db';

export const ViewedMessages = db.define('viewedMessage', {
    messageId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique:'idsComposition'
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique:'idsComposition'
    },

},{
  tableName:'viewed_messages'
});
