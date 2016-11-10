import { rbac } from './index';
import { Router } from 'express';
import db from '../models/db';
import Sequelize from 'sequelize';
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

// get all attributes
router.get('/attributes',async(req, res, next)=>{
  try {
    res.json(await Attribute.findAll());
  } catch (e) {
    next(e);
  }
});
//create attribute
router.post('/attributes',async(req, res, next)=>{
  try {
    const {name} = req.body;
    res.json(await Attribute.create({name}));
      rbac.update();
  } catch (e) {
    next(e);
  }
});
//delete attribute
router.delete('/attributes/:id',async(req, res, next)=>{
  try {
    const {id} = req.params;
    const attribute = await Attribute.findById(id);
    if(!attribute) return next(404);

    await attribute.destroy();
    res.json(attribute);
      rbac.update();
  } catch (e) {
    next(e);
  }
});

export default router;
