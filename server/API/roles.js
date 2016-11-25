import { rbac } from './index';
import { Router } from 'express';
import db from '../models/db';
const router = Router();

import {
  Server,
  User,
  ServerMembers,
  Permission,
  Role,
  Action,
  Resource,
  Attribute,
  UserServerRoles,
  ServerRole,

} from '../models/';

// update rbac
router.post('/rbac/update', (req, res)=>{
  rbac.update();
  res.json({ok:'ok'});
});
// get roles by server
router.get('/servers/:serverId/roles',async(req,res,next)=>{
  try {
    const {
      params: {serverId},
      user: {roles, socket, id:userId }
    } = req;
    const serverRoles = await Role.findAll({
      include:[
        {model:Server, where:{id:serverId}, attributes:[] },
        {model:Permission, through: {attributes: []}
          //  include:[Action, Resource, Attribute]
        },
        {model:Role, as:'inherits', attributes:[ 'name','id' ] }
      ],
          order:[[Permission, 'order']]
    });
    res.json(serverRoles);
  } catch (e) {
    next(e);
  }
});

//create server role
router.post('/servers/:serverId/roles',async(req,res,next)=>{
  try {
    const {
      params: {serverId},
      body:{name},
      user: {roles, socket, id:userId }
    } = req;
    const server = await Server.findById(serverId);
    if(!server) return next(404);

    await rbac.can(roles[serverId], 'role:manage');

    const role = await db.transaction(async t=>{
      const ts = {transaction:t};
      const role = await Role.create({name});
      await role.setPermissions([7], ts);
      await server.addRole(role.id, ts);
      return await Role.findById(role.id, {...ts,include:[Permission]});
    });
    res.json(role);
  } catch (e) {
    !e? next(401) : next(e);

  }
});
//delete server role
router.delete('/servers/:serverId/roles/:roleId',async(req,res,next)=>{
  try {
    const {
      params: {serverId, roleId},
      user: {roles, socket, id:userId }
    } = req;
    const role = await Role.findOne({
      where:{id:roleId},
      include:[
        {model:Server, where:{id:serverId}, attributes:[]}
      ]
    });
    if(!role) return next(404);

    await rbac.can(roles[serverId], 'role:manage');
    await role.destroy();
    res.json(role);

  } catch (e) {
    !e? next(401) : next(e);

  }
});
//edit role
router.put('/servers/:serverId/roles/:roleId', async(req,res,next)=>{
  try {
    const {
      params: {roleId, serverId},
      body: {name, permissions, color},
      user: {roles, socket, id:userId }
    } = req;
    const role = await Role.findOne({
      where:{id:roleId},
      include:[
        {model:Server, where:{id:serverId}, attributes:[]}
      ]
    });
    if(!role) return next(404);
    await rbac.can(roles[serverId], 'role:manage');

    const result = await db.transaction(async t =>{
      await role.setPermissions(permissions, {transaction:t});
      await role.update({name, color},{transaction:t});
      return Role.findById(role.id, {
        include:[{model:Permission, through: {attributes: []} }]
        ,transaction:t});
    });

    res.json(result);
    // console.log('role'.red);
    // console.log(role.permissions);

  } catch (e) {
    !e? next(401) : next(e);
  }

});
// router.put('/roles/:roleId', async(req,res,next)=>{
// try {
//   const {
//     params: {roleId},
//     body: {name, permissions},
//     user: {roles, socket, id:userId }
//   } = req;
//   const role = await Role.findOne({where:{id:roleId}, include:[Server]});
//
//   if(!role) return next(404);
//   res.json(role);
//   // await rbac.can(roles[serverId], 'role:edit');
//   // await role.update({name});
//
//
// } catch (e) {
//   next(e);
// }
//
// });

// //delete server role
// router.delete('/roles/:roleId',async(req,res,next)=>{
//   try {
//     const {
//       params: {roleId},
//       body:{name},
//       user: {roles, socket, id:userId }
//     } = req;
//     const role = await db.transaction(async t=>{
//       const ts={transaction:t};
//       const role = await Role.create({name},ts);
//       const server = await Server.findById(serverId);
//       await server.addRole(role.id, ts);
//       return role;
//     });
//     res.json(role);
//   } catch (e) {
//     next(e);
//   }
// });

export default router;
