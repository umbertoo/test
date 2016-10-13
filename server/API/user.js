import { rbac } from './index';
import { Router } from 'express';
const router = Router();

import Server, { ServerMembers } from '../models/server';
import User from '../models/user';

//get current user
router.get('/user',(req,res)=>{
  User.findOne({where:{id:req.user.id}})
  .then(user=>{
    res.json(user);
  });
});


// get users by server
router.get('/servers/:id/members', (req,res,next)=>{
  const {offset, limit} = req.query;
  const {id} = req.params;

  Server.findById(id)
  .then(server => server.getUsers({
    offset: parseInt(offset) || null,
    limit: parseInt(limit) || null,
    order: [['name']]
  }))
  .then(members => res.json(members))
  .catch(err => {
    res.status(500).json(err);
    next(err);
  });
});
export default router;
