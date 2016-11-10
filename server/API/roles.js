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
    const { serverId } = req.params;
    const roles = await Role.findAll({
      include:[
        {model:ServerRole, where:{serverId}, attributes:[] },
        {model:Permission, include:[Action, Resource, Attribute]},
        {model:Role, as:'inherits', attributes:[ 'name','id' ] }
      ]
    });
    res.json(roles);
  } catch (e) {
    next(e);
  }
});

// router.post('/servers/:serverId/roles', async(req,res,next)=>{
//   try {
//     const {
//        params:{ serverId },
//        body:{ name},
//        user:{ id:userId, socket, roles}
//      } = req;
//     const role = await Role.create({name})
//     const role = await ServerRole.create({serverId,})
// // ServerRole
// await Server.addServerRole
//     res.json(role);
//   } catch (e) {
//     next(e);
//   }
// });

export default router;
