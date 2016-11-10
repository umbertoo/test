import Sequelize from 'sequelize';
// import assosiations from './models/associations';

console.log('db'.yellow);

const db = new Sequelize('chat_base', 'postgres', 'gfhfgtn',{
  dialect: 'postgres',
});

// const db = new Sequelize('chat_base', 'root', 'gfhfgtn');
// db.sync(
//     //  {force: true}
// ).then( ()=> {
//   console.log("tyt".cyan);
// // console.log(db.models);
// });




export default db;
