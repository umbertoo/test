import { rbac } from './index';
import { Router } from 'express';
const router = Router();

import Message from '../models/message';
import Channel from '../models/channel';
import User from '../models/user';

// create message
router.post('/messages', (req, res, next)=>{
  Message.create({
    text: req.body.text,
    userId: req.user.id,
    channelId:req.body.channelId,
    serverId:req.body.serverId,
  })
  .then(message => {
    req.user.socket.broadcast.emit('message',message);
    res.json(message);
  })
  .catch(err => {
    // console.log(err)
    res.status(500).json(err);
    next(err);
  } );
});


//delete message
router.delete('/messages/:id', (req, res)=> {
  Message.findById(req.params.id)
  .then(message=>
    rbac.can('user', 'message:delete',{message, user:req.user})
    .then(()=>message.destroy())
  )
  .then(message=>{
    res.json(message);
    io.sockets.emit('deleteMessage',message);
  })
  .catch(err => {
    // console.log(err)
    if(!err){
      return res.status(401).json({error:'access denied'});
    }
    res.status(500).json(err);
    next(err);
  });
});


// edit message
router.put('/messages/:id', (req, res, next)=>{
  Message.findById(req.params.id)
  .then(message=>
    rbac.can('user', 'message:edit',{message, user:req.user})
    .then(()=>message.update({text: req.body.text}))
  )
  .then(message=>{
    res.json(message);
    io.sockets.emit('editMessage',message);
  })
  .catch(err => {
    // console.log(err)
    if(!err){
      return res.status(401).json({error:'access denied'});
    }
    res.status(500).json(err);
    next(err);
  });
});

//get count messages since date
router.get('/channels/:id/messages/count/', (req, res, next)=>{
  const {date, id:messageId} = req.query;
  const {id} = req.params;
  Message.findAndCountAll({where:{
    channelId:id,
    createdAt:{gt:new Date(date||0)},
    id:{gt:messageId||0}
  }})
  .then(result=> res.json({count:result.count}))
  .catch(err=>{
    res.status(500).json(err);
    next(err);
  });

});

// get messages by channel
router.get('/channels/:id/messages', (req,res,next)=>{
  const {offset, limit} = req.query;
  const {id} = req.params;
  Message.findAndCountAll({
    where:{channelId:id},
    offset: parseInt(offset) || null,
    limit: parseInt(limit) || null,
    order: [['createdAt', 'DESC']],
    include:
    [{model:Channel},{ model:User }]
  })
  .then(result => res.json(result.rows.reverse()))
  .catch(err => {
    res.status(500).json(err);
    next(err);
  });
});
export default router;
