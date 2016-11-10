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

// get all actions
router.get('/actions', async(req, res, next)=>{
  try {
    res.json(await Action.findAll());
  } catch (e) {
    next(e);
  }
});
//create action
router.post('/actions', async(req, res, next)=>{
  try {
    const {name} = req.body;
    res.json(await Action.create({name}));
      rbac.update();
  } catch (e) {
    next(e);
  }
});
//delete action
router.delete('/actions/:id', async(req, res, next)=>{
  try {
    const action = await Action.findById(req.params.id);
    if(!action) return next(404);

    await action.destroy();
    res.json(action);
      rbac.update();
  } catch (e) {
    next(e);
  }
});

export default router;
