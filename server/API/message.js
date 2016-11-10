import { rbac } from './index';
import { Router } from 'express';
const router = Router();


import { Message, Channel, User } from '../models/';

// create message
router.post('/messages', async(req, res, next)=>{
  try {
    const {
      body:{text, channelId, serverId},
      user:{roles, id:userId, socket}
    } = req;

    if(await rbac.can(roles[serverId], 'message:create')) {
      const message = await Message.create({
        text, userId, channelId, serverId
      });
      socket.to(serverId).emit('message', message);
      res.json(message);
    }
  } catch (e) {
    !e ? next(401) : next(e);
  }
});

//delete message
router.delete('/messages/:id', async(req, res, next)=> {
  try {
    const {
      params:{ id },
      user:{roles, id:userId, socket}
    } = req;
    const message = await Message.findById(id);
    if(!message) return next(404);

    if(await rbac.can(roles[message.serverId], 'message:delete', {message, userId})) {
      message.destroy();
      res.json(message);
      socket.to(message.serverId).emit('deleteMessage',message);
    }

  } catch (e) {
    !e ? next(401) : next(e);
  }
});

// edit message
router.put('/messages/:id', async(req, res, next)=>{
  try {
    const {
      params:{ id },
      body:{text},
      user:{roles, id:userId, socket}
    } = req;
    const message = await Message.findById(id);
    if(!message) return next(404);

    if(await rbac.can(roles[message.serverId], 'message:edit', {message, userId})) {
      message.update({text});
      res.json(message);
      socket.to(message.serverId).emit('editMessage',message);
    }

  } catch (e) {
    !e ? next(401) : next(e);
  }

});

//get count messages since date
router.get('/channels/:id/messages/count/', async(req, res, next)=>{
  try {
    const {date, id:messageId} = req.query;
    const {id} = req.params;
    const {count, rows} = await Message.findAndCountAll({where:{
      channelId:id,
      createdAt:{gt:new Date(date||0)},
      id:{gt:messageId||0}
    }});
    res.json({count});

  } catch (e) {
    next(e);
  }
});

// get messages by channel
router.get('/channels/:id/messages', async(req, res, next)=>{
  try {
    const {
      params:{ id },
      query:{ offset, limit },
    } = req;

    const {count, rows} = await Message.findAndCountAll({
      where:{channelId:id},
      offset: parseInt(offset) || null,
      limit: parseInt(limit) || null,
      order: [['createdAt', 'DESC']],
      include:
      [{model:Channel},{ model:User }]
    });
    res.json(rows.reverse());
  } catch (e) {
    next(e);
  }
});

export default router;
