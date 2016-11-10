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


// get all resources
router.get('/resources', async(req, res, next)=>{
  try {
    res.json(await Resource.findAll());
  } catch (e) {
    next(e);
  }
});
//create resource
router.post('/resources', async(req, res, next)=>{
  try {
    const {name} = req.body;
    res.json(await Resource.create({name}));
      rbac.update();
  } catch (e) {
    next(e);
  }
});
//delete resource
router.delete('/resources/:id',async(req, res, next)=>{
  try {
    const {id} = req.params;
    const resource = await Resource.findById(id);
    if(!resource) return next(404);

    await resource.destroy();
    res.json(resource);
      rbac.update();
  } catch (e) {
    next(e);
  }
});

export default router;
