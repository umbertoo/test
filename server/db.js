import Sequelize from 'sequelize';
// import Channel from './models/channel';
// import User from './models/user';
// import Server from './models/server';
const db = new Sequelize('chat_base', 'root', 'gfhfgtn');
// const db = new Sequelize('chat_base', 'root', 'gfhfgtn');
// db.sync(
//      {force: true}
// ).then( ()=> {
//
// });

export default db;
