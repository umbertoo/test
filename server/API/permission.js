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

// get permissions by role
router.get('/roles/:roleId/permissions',async(req, res, next)=>{
  try {
    const { roleId } = req.params;
    const role = await Role.findOne({
      where:{id:roleId},
      include:[{model:Permission}],

      order:[[Permission, 'order']]
    });
    if (!role) return next(404);

    res.json(role);
  } catch (e) {
    next(e);
  }

});
// get all permissions
router.get('/permissions',async(req, res, next)=>{
  try {
    const permissions = await Permission.findAll({
      order: [['order']],
      include:[Action, Resource, Attribute]
    });
    res.json(permissions);
  } catch (e) {
    next(e);
  }
});
// create permission
router.post('/permissions',async(req, res, next)=>{
  try {
    const { name, actionId, resourceId, attributeId } = req.body;

    const permission = await Permission.create(
      {name, actionId, resourceId, attributeId},
      {include:[Action, Resource, Attribute]}
    );
    res.json(permission);
  } catch (e) {
    next(e);
  }


});
// edit permissions
router.put('/permissions/:id',async(req, res, next)=>{
  try {
    const {id} = req.params;
    const {name, actionId, resourceId, attributeId} = req.body;

    const permission = await Permission.findById(id);
    if(!permission) return next(404);

    await permission.update({name, actionId, resourceId, attributeId});
    res.json(permission);
    rbac.update();

  } catch (e) {
    next(e);
  }
});

router.delete('/permissions/:id',async(req, res, next)=>{
  try {
    const {id} = req.params;
    const permission = await Permission.findById(id);
    if(!permission) return next(404);

    await permission.destroy();
    res.json(permission);
    rbac.update();

  } catch (e) {
    next(e);
  }
});

router.patch('/permissions/order',async(req, res, next)=>{
  try {
    const {order} = req.body;
    const result = await db.transaction(t=>
      Promise.all(order.map(e=>
        Permission.findById(e.id)
        .then(p=>p.update({order:e.order},{transaction: t}))
      ))
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
});



export default router;
