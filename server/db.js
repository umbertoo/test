  import Sequelize from 'sequelize';

const db = new Sequelize('chat_base', 'root', 'gfhfgtn');
// const db = new Sequelize('chat_base', 'root', 'gfhfgtn');
db.sync(
    //  {force: true}
).then( ()=> {

});

export default db;
