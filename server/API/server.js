import { rbac } from './index';
import { Router } from 'express';
import fs from 'fs';
import Sequelize from 'sequelize';
// import gm  from 'gm';
// const gma = gm.subClass({imageMagick: true});
import {
  Server,
  User,
  ServerMembers,
  Channel,
  Role,
  ServerRole,
  UserServerRoles,
  Permission,
  Action,
  Resource,
  Attribute,
} from '../models/';

import db from '../models/db';

import {uploadIcon, ICONS_PATH} from '../config/multer';

const router = Router();

const serverIncludes = {include: [
  {model:Channel},
  {model:Role, through: {attributes: []} ,
  include:[ {model:Permission, through: {attributes: []}} ]
},
{model: User, as:'Members', attributes:[]}
],
order:[
  [{ model: User, as:'Members'}, ServerMembers, 'order' ],
  [Channel,'order'],
  [Role, Permission, 'order']
]
};


router.post('/servers/:serverId/icon', uploadIcon.single('avatar'), async(req, res, next)=>{
  try {
    const {
      params:{ serverId },
      user:{ socket, roles, id:userId },
      file:{ filename , path}
    } = req;
    const server = await Server.findById(serverId);
    if(!server) return next(404);
    const {icon:oldIcon} = server;

    await server.update({icon:filename});
    fs.unlink(ICONS_PATH+''+oldIcon, (err)=> {
      if (err) return next(err);
    });
    res.json(server);

  } catch (e) {
    next(e);
  }
});

//create server
router.post('/servers', async(req, res, next)=>{
  try {
    const {
      body:{description, name},
      user:{socket, roles, id:userId}
    } = req;
    const server = await db.transaction( async t=>{
      const ts = {transaction:t};
      const server = await Server.create({name, description}, ts);
      const channel = await Channel.create({
        name:'general', serverId:server.id, isGeneral:true
      },ts);
      // add role to server, and set it to user.
      const user = await User.findById(userId,ts);
      await server.addRole(1, ts);
      await user.addRole(1, ts);
      await server.addMember(userId, ts);

      return await Server.findById(server.id,{
        ...serverIncludes, ...ts
      });
    });
    res.json(server);
  } catch (e) {
    console.error('-------'.red);
    console.error(e);
    next(e);
  }
});

// get servers
router.get('/servers', async(req, res, next) => {
  try {
    const {
      query:{offset, limit},
      user:{socket, roles, id:userId}
    } = req;
    const user = await User.findById(userId);
    res.json(await user.getServers({
      offset: parseInt(offset) || null,
      limit: parseInt(limit) || null,
      ...serverIncludes
    }));
  } catch (e) {
    next(e);
  }
});

//get one server
router.get('/servers/:id', async(req, res, next)=>{
  try {
    const server = await Server.findById(req.params.id);
    if(!server) return next(404);
    res.json(server);
  } catch (e) {
    next(e);
  }
});

//edit server
router.put('/servers/:serverId', async(req, res, next)=>{
  try {
    const {
      body:{name, description},
      params:{serverId},
      user:{socket, roles}
    } = req;

    const server = await Server.findById(serverId);
    if (!server) return next(404);

    if (await rbac.can(roles[serverId], 'server:edit')) {
      await server.update({name,description});
      res.json(server);
      socket.to(serverId).emit('editServer',server);
    }

  } catch (e) {
    !e? next(401):next(e);
  }

});
// delete server
router.delete('/servers/:serverId', async(req, res, next)=>{
  try {
    const {
      params: {serverId},
      user: {roles, socket}
    } = req;

    const server = await Server.findById(serverId);
    if(!server) return next(404);

    if(await rbac.can(roles[serverId], 'server:delete')) {
      await server.destroy();
      res.json(server);
      socket.to(serverId).emit('deleteServer', server);
    }
  } catch (e) {
    !e ? next(401) : next(e);
  }
});
//edit order
router.patch('/servers/order',async(req, res, next)=>{
  try {
    const {
      body: {order},
      user: {roles, socket, id:userId}
    } = req;
    const result = await db.transaction(t=>
      Promise.all(order.map(async s=>{
        const userServer = await ServerMembers.findOne(
          {where:{serverId:s.id, userId}}
        );
        return userServer.update({order:s.order},{transaction: t});
      }))
    );
    res.json(result);
  } catch (e) {
    next(e);
    // !e ? next(401) : next(e);
  }
});
export default router;
