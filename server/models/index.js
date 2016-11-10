// import db from './db';
// import assosiations from './associations';
// import * as Models from './index';
console.log('index'.yellow);
import assosiations from './associations';

export * from './channel';
export * from './server';
export * from './user';
export * from './message';
export * from './role';
export * from './permission';
export * from './resource';
export * from './action';
export * from './attribute';




//
// console.log('##'.green);
// db.sync({force:true}).then(()=>{
//
//   console.log('sss'.cyan);
//   Promise.all([
//     Models.Server.create({
//       name: 'server1',
//       description: 'first server'
//     }),
//     Models.Server.create({
//       name: 'server2',
//       description: 'second server'
//     }),
//     Models.Server.create({
//       name: 'server3',
//       description: 'third server'
//     })
//   ])
//   .then(servers=>{
//
//     Models.Channel.create({
//       name: 'channel1',
//       description: 'first channel',
//       serverId:1
//     });
//     Models.Channel.create({
//       name: 'channel2',
//       description: 'second channel',
//       serverId:1
//     });
//     Models.Channel.create({
//       name: 'channel3',
//       description: 'third channel',
//       serverId:1
//     });
//   Models.Promise.all([
//       Models.User.create({
//         name: 'utro',
//         password: '123',
//         email:'v.kokovin@gmail.com'
//       }),
//       Models.User.create({
//         name: 'admin',
//         password: '123',
//         email:'test@test.test'
//       }),
//       Models.User.create({
//         name: 'superchel',
//         password: '123',
//         email:'test2@test.test'
//       })
//     ]).then(()=>{
//       servers[0].setMembers([1,2,3]);
//       servers[0].setServerOwners([1]);
//
//     }
//   )
// });
// })
