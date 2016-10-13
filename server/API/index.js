import { Router } from 'express';
import passport from 'passport';
import Message from '../models/message';
import Server, { ServerMembers } from '../models/server';
import User from '../models/user';
import Permission from '../models/permission';
import Role, { UserRolesPerServer } from '../models/role';
import Channel from '../models/channel';
import { io } from '../app';
import find from 'lodash/find';
import RBAC from '../RBAC/RBAC';

import serverApi from './server';
import messageApi from './message';
import channelApi from './channel';
import uiApi from './ui';
import userApi from './user';


const router = Router();

const checkJWT = passport.authenticate('jwt', { session: false });
router.use(checkJWT);
router.use((req,res,next)=>{
  const socket = find(io.sockets.sockets,s => s.user.id==req.user.id);
  req.user.socket = socket;
  next();
});

const getRolesData = () =>{
  return Role.findAll({include:[{model:Permission,attributes:[ 'name' ] }]})
  .then(roles=>{
    const rolesList = {};
    roles.forEach(role=>{
      rolesList[role.name]={
        can:role.permissions.map(p=>p.name)
      };
    });
    return rolesList;
  }).catch(e=>{
    console.log(e);
  });
};
export const rbac = new RBAC(getRolesData);


const getUserRole = (userId,serverId) =>{
  return  UserRolesPerServer.findAll({
    where:{userId, serverId},
    attributes: ['roleId'],
    include: [{ model:Role, attributes:[ 'name' ] }]}
  )
  .then(roles=>roles[0].role.name);
};

const getUserRole2 = (userId,serverId) =>{
  return User.findById(userId)
  .then(user=>user.getUserRoles({
    attributes: ['roleId'],where:{serverId},
    include:
    [{ model:Role, attributes:[ 'name' ] }]
  }))
  .then(roles=>roles[0].role.name);
};


router.get('/test/:serverId',(req,res)=>{
  ServerMembers.findAll({
    where:{userId:req.user.id},
    attributes:['serverId','order']
    // include:[{model:User}]

  }).then(servers => res.json(servers));

});
router.get('/test',(req,res)=>{
  User.findById(req.user.id)
  .then(user=> user.getServers() )
  .then(servers=> res.json(servers) );

});

router.use(serverApi, messageApi, channelApi, uiApi, userApi);


export default router;
