import { rbac } from './index';
import { Router } from 'express';
import fs from 'fs';

const router = Router();

import {
  Server,
  User,
  ServerMembers
} from '../models/';

import {uploadIcon, ICONS_PATH} from '../config/multer';

router.post('/user/avatar', uploadIcon.single('avatar'), async(req, res, next)=>{
  try {
    const {
      user:{ socket, roles, id:userId },
      file:{ filename , path }
    } = req;
    const user = await User.findById(userId);
    if(!user) return next(404);
    const {avatar:oldAvatar} = user;

    await user.update({avatar:filename});
    fs.unlink(ICONS_PATH+''+oldAvatar, (err)=> {
      if (err) return next(err);
    });
    const servers = await user.getServers();
    servers.map(s=>
      socket.to(s.id).emit('editUser', user)
    );
    res.json(user);

  } catch (e) {
    next(e);
  }
});


//get current user
router.get('/user', async(req, res, next)=>{
  try {
    const user = await User.findById(req.user.id);
    if(!user) return next(404);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
//get current user
router.put('/user', async(req, res, next)=>{
  try {
    const {
      body:{ name, email },
      user:{ socket, roles, id:userId },
    } = req;
    const user = await User.findById(userId);
    if(!user) return next(404);
    await user.update({name, email});
    const servers = await user.getServers();
    servers.map(s=>
      socket.to(s.id).emit('editUser', user)
    );



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
