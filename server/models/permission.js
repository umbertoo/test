import Sequelize from 'sequelize';
import db from '../db';

const Permission = db.define('permission', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


export default Permission;

// {
//   name: 'edit',
//   when(params) {
//     return params.user.id === params.post.owner;
//   }
// }
