import { rbac } from './index';
import { Router } from 'express';
const router = Router();

import {
  Server,
  User,
  ServerMembers
} from '../models/';

//get current user
router.get('/user', async(req, res, next)=>{
  try {
    const user = await User.findOne({where:{id:req.user.id}});
    if(!user) return next(404);
    res.json(user);
  } catch (e) {
    next(e);
  }
});


// get users by server
router.get('/servers/:id/members', async(req, res, next)=>{
  const {offset, limit} = req.query;
  const {id} = req.params;
  try {
    const server = await Server.findById(id);
    if(!server) return next(404);

    res.json(await server.getUsers({
      offset: parseInt(offset) || null,
      limit: parseInt(limit) || null,
      order: [['name']]
    }));
  } catch (e) {
    next(e);
  }
});
export default router;
