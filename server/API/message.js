import { rbac } from './index';
import { Router } from 'express';
import db from '../models/db';

const router = Router();


import { Message, Channel, User, ViewedMessages } from '../models/';

const messageACK = ({channelId, id}, userId)=>
db.transaction(async t => {
  const ts = { transaction:t};
  const viewedMessage = await ViewedMessages.findOne({
    where:{userId},
    include:[{model:Message ,attributes:[],where:{channelId}}]
  },ts);
  if(viewedMessage) {
    await ViewedMessages.update({messageId:id},{where:{userId,messageId:viewedMessage.messageId},...ts});
  }else{
    await ViewedMessages.create({userId, messageId:id},ts);
  }
  return viewedMessage;
});


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

      res.json(message);
      socket.to(serverId).emit('message', message);
      await messageACK(message, userId);
    }
  } catch (e) {
    !e ? next(401) : next(e);
  }
});


router.post('/messages/:messageId/ack', async(req, res, next)=>{
  try {
    const {
      params:{ messageId },
      user:{roles, id:userId, socket}
    } = req;
    const message = await Message.findById(messageId);
    if(!message) return next(404);

    await messageACK(message, userId);
    const { channelId } = message;

    res.json({channelId, messageId});

  } catch (e) {
    next(e);
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
    const messages = rows.reverse();
    const moreBefore = !(messages.length < parseInt(limit));
    res.json({moreBefore, messages});
  } catch (e) {
    next(e);
  }
});
// get ack messages
router.get('/servers/:serverId/messages/ack', async(req, res, next)=>{
  try {
    const {
      params:{ serverId },
      user:{roles, id:userId, socket}
    } = req;
    const viewedMessages = await ViewedMessages.findAll({
      where:{userId},
      attributes:[],
      include:[{model:Message,where:{serverId}}]
    });
    const channels = await Channel.findAll({
      where:{serverId}, attributes:['id'], include:[{model:Message, limit:1, order:[['createdAt','DESC']]}]
    });
    console.log(JSON.stringify(channels,null,3));
    const lastMessages = channels.reduce((list, {id, messages})=>{
      list[id] = messages.length? messages[0].id: null;
      return list;
    }, {});
    const result = viewedMessages.reduce((list,item)=>{
      const {channelId, id} = item.message;
      list[channelId]={messageId:id, hasNewMessages: lastMessages[channelId]!=id};
      return list;
    },{});
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default router;
