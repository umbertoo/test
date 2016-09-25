import {Router} from 'express';
import passport from 'passport';
import Message from '../models/message';
import Server from '../models/server';
import User from '../models/user';
import Channel from '../models/channel';
import {io} from '../app';

const exclude = ['password','resetPasswordExpires','resetPasswordToken'];
const router = Router();

const checkJWT = passport.authenticate('jwt', { session: false });
router.use(checkJWT)
// create message
router.post('/messages', (req, res, next)=>{
    Message.create({
        text: req.body.text,
        userId: req.user.id,
        channelId:req.body.channelId,
        serverId:req.body.serverId,
    })
    .then(message => {
        io.sockets.emit('message',message);
        res.json(message);
    })
    .catch(err => {
      // console.log(err)
      res.status(500).json(err);
      next(err)
    } );
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
        next(err)
    });

});

router.get('/user',(req,res)=>{
  User.findOne({where:{id:req.user.id}, attributes:{ exclude }}).then(user=>{
    res.json(user)
  })
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
        [{model:Channel},{ model:User, attributes:{ exclude } }]
    })
    .then(result => res.json(result.rows.reverse()))
    .catch(err => {
      res.status(500).json(err);
      next(err)
    });
});

// get channels by server
router.get('/servers/:id/channels',(req,res,next)=>{
    const {offset, limit} = req.query;
    const {id} = req.params;

    Server.findById(id)
    .then(server => server.getChannels())
    .then(channels => res.json(channels))
    .catch(err => {
      res.status(500).json(err);
      next(err)
    });
});

// get members by server
router.get('/servers/:id/members',(req,res,next)=>{
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
      next(err)
    });
});

export default router;
