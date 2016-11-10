import { rbac } from './index';
import { Router } from 'express';

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

const router = Router();

//create server
router.post('/servers', async(req, res, next)=>{
  try {
    const {description, name} = req.body;
    const server = await db.transaction(async t=>{
      const ts = {transaction:t};
      // create server
      const server = await Server.create({name, description}, ts);
      // create role in server, and set it to user.
      const user = await User.findById(req.user.id);
      const serverRole = await ServerRole.create({serverId:server.id, roleId:1},ts);
      await user.addServerRole(serverRole.id, ts);
      // add user to members of the server.
      await server.addMember(req.user.id, ts);

      return server;
    });
    res.json(server);
  } catch (e) {
    next(e);
  }
});

// get servers
router.get('/servers', async(req, res, next) => {
  try {
    const {offset, limit} = req.query;

    const user = await User.findById(req.user.id);
    res.json(await user.getServers({
      offset: parseInt(offset) || null,
      limit: parseInt(limit) || null,
      include: [
        {model:Channel},
        {model: User, as:'Members', attributes:[]},
        {model:ServerRole,
          include:[{model:Role,
            include:[ Permission ]}]
          }
        ],
        order:[
          [{ model: User, as:'Members'}, ServerMembers, 'order' ],
          [Channel,'order']
        ],

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
            {where:{serverId:s.serverId, userId}}
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
