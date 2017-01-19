import { Router } from 'express';
import passport from 'passport';
import AccessControl from 'accesscontrol';
import {
  Server,
  Channel,
  User,
  Message,
  Permission,
  Resource,
  Action,
  Role,
  UserServerRoles,
  ServerMembers,
  Attribute
} from '../models/';

import { io } from '../app';
import find from 'lodash/find';
import filter from 'lodash/filter';
import RBAC from '../RBAC/RBAC';
import serverApi from './server';
import messageApi from './message';
import channelApi from './channel';
import uiApi from './ui';
import userApi from './user';
import rolesApi from './roles';
import permissionApi from './permission';
import actionApi from './action';
import attributeApi from './attribute';
import resourceApi from './resource';


const checkJWT = passport.authenticate('jwt', { session: false });
const router = Router();

router.use(checkJWT);

router.get('/test1', (req,res)=>{
  res.json(req.user);
});

router.use((req,res,next)=>{
  // const socket = find(io.sockets.sockets,s => s.user.id==req.user.id);
  // req.user.socket = socket ? socket.broadcast : io;
  // const socket = filter(io.sockets.sockets,s => s.user.id==req.user.id);
  // req.user.socket = socket ? socket.broadcast : io;
  req.user.socket = io;
  next();
});

router.use(
  serverApi, messageApi, channelApi, uiApi,
   userApi, rolesApi, permissionApi, actionApi, attributeApi, resourceApi
 );
const getRolesData = async() =>{
  try {
    const roles = await Role.findAll({
      include:[{
        model:Permission, attributes:[ 'name' ],
        include:[Resource, Action, Attribute]
      },{model:Role, as:'inherits', attributes:[ 'name' ] }]
    });
    const rolesList = {};
    roles.forEach(role=>{
      rolesList[role.name]={
        inherits: role.inherits.map(r=>r.name),
        can: role.permissions.map(p=>{
          const name = p.resource.name+':'+p.action.name;
          return p.attribute
          ? {name, when:p.attribute.name}
          : name;
        })
      };
    });
    return rolesList;
  } catch (e) {
    console.error(e);
  }
};


export const rbac = new RBAC(getRolesData);


export default router;

// module.exports = function() {
//   var strategy = new Strategy(params, function(payload, done) {
//     var user = users[payload.id] || null;
//     if (user) {
//       return done(null, {id: user.id});
//     } else {
//       return done(new Error("User not found"), null);
//     }
//   });
//   passport.use(strategy);
//   return {
//     initialize: function() {
//       return passport.initialize();
//     },
//     authenticate: function() {
//       return passport.authenticate("jwt", cfg.jwtSession);
//     }
//   };
// };



// const ac = new AccessControl();

// ac.grant('user')                    // define new or modify existing role. also takes an array.
// .createOwn('message')             // equivalent to .createOwn('video', ['*'])
// .deleteOwn('message')
// .readAny('message');
// ac.grant('admin')                   // switch to another role without breaking the chain
// .extend('user')                 // inherit role capabilities. also takes an array
// .updateAny('message', ['text'])  // explicitly defined attributes
// .deleteAny('message');
// ac.grant('user')                    // define new or modify existing role. also takes an array.
// .readOwn('message');
// ac.grant('admin')                   // switch to another role without breaking the chain
// .readAny('message');  // explicitly defined attributes
//
//
// let permission = ac.can('user').readOwn('message');
// console.log(permission.granted);    // —> true
// console.log('<'.cyan);
//
// console.log(permission.attributes); // —> ['*'] (all attributes)
// console.log('<'.cyan);
//
// permission = ac.can('admin').readAny('message');
// console.log(permission.granted);    // —> true
// console.log('<'.cyan);
//
// console.log(permission.attributes); // —> ['title']
// console.log('<'.cyan);

// router.get('/messages/:id', (req, res, next)=> {
//   Message.findById(req.params.id).then(msg => {
//
//     const possession = req.user.id == msg.userId ? 'Own' : 'Any';
//     console.log(possession);
//     const permission = ac.can('user')['read'+possession]('message');
//
//     if (permission.granted) {
//       res.json(msg);
//     } else {
//       res.status(403).end();
//     }
//
//
//   });
// });
// router.get('/messages/:id', (req, res, next)=> {
//   Message.findById(req.params.id).then(msg=>{
//
//     const permission = req.user.id == msg.userId
//     ? ac.can('user').readOwn('message')
//     : ac.can('user').readAny('message');
//
//     if (permission.granted) {
//         res.json(msg);
//     } else {
//       res.status(403).end();
//     }
//
//
//   });
// });
