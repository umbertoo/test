import { rbac } from './index';
import { Router } from 'express';
import { Server, Channel, ServerMembers, Message } from '../models/';
import db from '../models/db';
import isEmpty from 'lodash/isEmpty';

const router = Router();

// get channels by server
router.get('/servers/:id/channels', async(req, res, next)=>{
  try {
    const {offset, limit} = req.query;
    const {id} = req.params;
    const server = await Server.findById(id);
    if(!server) return next(404);

    const channels = await server.getChannels({
      order: [['order']], include:[{model:Message, limit:1, order:[['createdAt','DESC']]}]
    });

    res.json(channels);
  } catch (e) {
    next(e);
  }
});

// create channel by server
router.post('/channels', async(req, res, next)=>{
  try {
    const {
      body: {name, description, serverId},
      user: {roles, socket}
    } = req;

    if(await rbac.can(roles[serverId], 'channel:create')) {
      const channel = await Channel.create(
        {serverId, name, description}, {include:[Server]}
      );
      res.json(channel);
      socket.to(serverId).emit('createChannel',channel);
    }
  } catch (e) {
    !e ? next(401) : next(e);
  }
});
// edit channel
router.put('/channels/:channelId', async(req, res, next)=>{
  try {
    const {
      params: {channelId},
      body: {name, description},
      user: {roles, socket}
    } = req;

    const channel = await Channel.findById(channelId);
    if(!channel) return next(404);

    if(await rbac.can(roles[channel.serverId], 'channel:edit')) {
      await channel.update({name, description});
      res.json(channel);
      socket.to(channel.serverId).emit('editChannel', channel);
    }
  } catch (e) {
    !e ? next(401) : next(e);
  }
});

// delete channel
router.delete('/channels/:channelId', async(req, res, next)=>{
  try {
    const {
      params: {channelId},
      user: {roles, socket}
    } = req;
    const channel = await Channel.findById(channelId);
    if(!channel) return next(404);
    const count = Channel.count({ where: {serverId:channel.serverId} });
    if(count==1) return next(403);

    if(await rbac.can(roles[channel.serverId], 'channel:delete')) {
      await channel.destroy();
      res.json(channel);
      socket.to(channel.serverId).emit('deleteChannel', channel);
    }
  } catch (e) {
    !e ? next(401) : next(e);
  }
});

//edit order
router.patch('/channels/order',async(req, res, next)=>{
  try {
    const {
      body: {order},
      user: {roles, socket}
    } = req;
    const { serverId } = await Channel.findById(order[0].id);
    await rbac.can(roles[serverId], 'channel:edit');

    const channelsIds = order.map(e=>e.id);
    const channels = await Channel.findAll({
      where:{id:{$in:channelsIds}, serverId }
    });
    const result = await db.transaction(t=>
      Promise.all(channels.map(channel=>{
        const newOrder = order.find(e=>e.id==channel.id).order;
        return channel.update({order:newOrder},{transaction: t});
      }))
    );

    res.json(result);
    socket.to(serverId).emit('editChannelsOrder', result, serverId);

  } catch (e) {
    !e ? next(401) : next(e);
  }
});



export default router;
