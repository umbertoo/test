import Sequelize from 'sequelize';

console.log('db'.yellow);

const db = new Sequelize('chat_base', 'postgres', 'gfhfgtn',{
  dialect: 'postgres',
});


export default db;
