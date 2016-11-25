import Sequelize from 'sequelize';
import db from './db';
import maxBy from 'lodash/maxBy';

export const Server = db.define('server', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING
  },
  icon:{
    type: Sequelize.STRING
  }
});
export const ServerMembers = db.define('server_members',{
  order:{
    type: Sequelize.INTEGER,
    // allowNull:false
  }
});
// ServerMembers.beforeValidate((serverMember, options) => {
//   console.log('beforeValidate'.red);
//   if(serverMember.order) return;
//   return ServerMembers.findAll({where:{userId:serverMember.userId}}).then(items => {
//     if(items.length){
//       const maxOrder = maxBy(items, s => s.order).order;
//       serverMember.order = maxOrder+1;
//     }else{
//       serverMember.order = 1;
//     }
//   });
// });
console.log('Server'.cyan);
