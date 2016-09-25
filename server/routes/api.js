import {Router} from 'express';
import passport from 'passport';
import Message from '../models/message';
import Server from '../models/server';
import User from '../models/user';
import Channel from '../models/channel';
import {io} from '../app';

const exclude = ['password','resetPasswordExpires','resetPasswordToken'];
const router = Router();

const checkJWT = passport.authenticate('jwt', { session: false});

// create message
router.post('/messages',(req,res, next)=>{

    Message.create({
        text: req.body.text,
        userId: req.body.userId,
        channelId:req.body.channelId
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
router.get('/channels/:id/messages/count/', (req,res)=>{
    const {date, id:messageId} = req.query;
    const {id} = req.params;
    Message.findAndCountAll({where:{
        channelId:id,
        createdAt:{gt:new Date(date||0)},
        id:{gt:messageId||0}
    }})
    .then(result=> res.json({count:result.count}))
    .catch(err=>{
        console.error(err);
        res.status(500).json(err);
    });

});


// router.post('/api/notes/', (req, res)=> {
//     Note.create({text: req.body.text, title: req.body.title, colorId:req.body.colorId})
//
//     .then(note=> {
//         if(req.body.labels!== undefined){
//             note.setLabels(req.body.labels).then(()=> res.json(note));
//         }
//
//     },err=>res.status(500).json(err));
// });

router.get('/user',checkJWT,(req,res)=>{
    res.json({ok:'ok!!!'})

});
// get messages by channel

router.get('/channels/:id/messages',checkJWT,(req,res)=>{
    // console.log('io',io);

    const {offset, limit} = req.query;
    const {id} = req.params;

    // Channel.findById(id)
    // .then(channel => channel.getMessages({
    //     offset: parseInt(offset) || null,
    //     limit: parseInt(limit) || null,
    //     order: [['createdAt', 'DESC']],
    //     include:
    //     [{model:Channel,},{model:User, attributes:{ exclude } }]
    // }))
    Message.findAndCountAll({
        where:{channelId:id},
        offset: parseInt(offset) || null,
        limit: parseInt(limit) || null,
        order: [['createdAt', 'DESC']],
        include:
        [{model:Channel},{model:User, attributes:{ exclude } }]
    })
    .then(result => res.json(result.rows.reverse()))
    .catch(err => console.log(err));
});

// get channels by server
router.get('/servers/:id/channels',(req,res)=>{
    const {offset, limit} = req.query;
    const {id} = req.params;

    Server.findById(id)
    .then(server => server.getChannels())
    .then(channels => res.json(channels))
    .catch(err => console.log(err));
});

// get members by server
router.get('/servers/:id/members',(req,res)=>{
    const {offset, limit} = req.query;
    const {id} = req.params;

    Server.findById(id)
    .then(server => server.getUsers({
        offset: parseInt(offset) || null,
        limit: parseInt(limit) || null,
        order: [['name']]
    }))
    .then(members => res.json(members))
    .catch(err => console.log(err));
});

export default router;
