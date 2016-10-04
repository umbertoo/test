import {Router} from 'express';
import passport from 'passport';
import Message from '../models/message';
import Server from '../models/server';
import User from '../models/user';
import Role,{UserRolesPerServer} from '../models/role';
import Channel from '../models/channel';
import {io} from '../app';
import find from 'lodash/find';
import RBAC from '../RBAC';

const exclude = ['password','resetPasswordExpires','resetPasswordToken'];
const router = Router();

const checkJWT = passport.authenticate('jwt', { session: false });
router.use(checkJWT);
// create message



import roles from '../models/permission';
const rbac = new RBAC(roles);


// const checkPermission=(req,res,next)=>{
//   rbac.can()
//    .then(res=>console.log('manager>>>',res))
//    .catch(e=>console.log('manager>>>',e));
// };

// User.setRole()
// User.findById(1).then(user=>{
//   // user.addRoles([1],{serverId:1});}
//
// }
// )
// UserRolesPerServer.create({userId:1,serverId:1,roleId:1});
// router.post('/test/:id',(req,res)=>{
//
//   User.findById(req.params.id).then(user=>user.setUserRoles()).then(res2=>{
//     res.json(res2);
//
//   })
//
//
// })


const getUserRole = (userId,serverId) =>{
  return  UserRolesPerServer.findAll({
    where:{userId, serverId},
    attributes: ['roleId'],
    include: [{ model:Role, attributes:[ 'name' ] }]}
  )
  .then(roles=>roles[0].role.name);
};
const getUserRole2 = (userId,serverId) =>{
  return User.findById(userId)
  .then(user=>user.getUserRoles({
    attributes: ['roleId'],where:{serverId},
    include:
    [{ model:Role, attributes:[ 'name' ] }]
  }))
  .then(roles=>roles[0].role.name);
};

router.get('/test/:serverId',(req,res)=>{

  getUserRole(req.user.id,req.params.serverId).then(role=>res.json({role}));

 });
router.use((req,res,next)=>{
  const socket = find(io.sockets.sockets,s=>s.user.id==req.user.id);
  req.user.socket = socket;
  next();
});

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
    [{model:Channel},{ model:User, attributes:{ exclude } }]
  })
  .then(result => res.json(result.rows.reverse()))
  .catch(err => {
    res.status(500).json(err);
    next(err);
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
    next(err);
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
    next(err);
  });
});

router.get('/user',(req,res)=>{
  User.findOne({where:{id:req.user.id}, attributes:{ exclude }})
  .then(user=>{
    res.json(user);
  });
});

router.post('/channels/:id/typing',(req,res)=>{
  const {id, name} = req.user;
  const user = {id,name};
  req.user.socket.broadcast.emit('startTyping',{user, channelId: req.params.id});
  res.json({ok:'ok'});
});


///servers_________________________________________________________________


//create server
// 1. all can create server
// 2. create server: name desc
// 3. set user to admin of this server through  UserRolesPerServer.create({userId:1,serverId:1,roleId:1});
// 4. adding user to members of that server
router.post('/servers', (req, res, next)=>{
  Server.create({
    name:req.body.name,
    description:req.body.description
  }).then(server=>{
    UserRolesPerServer.create({userId:req.user.id,serverId:server.id,roleId:1})
    .then(()=>server.addMember(req.user.id)).then(()=>server);
  })
  .then(server=> res.json(server))
  .catch(err=>{
    res.status(500).json(err);
    next(err);
  });
});

//get servers
router.get('/servers', (req,res,next)=>{
  const {offset, limit} = req.query;
  Server.findAndCountAll({
    offset: parseInt(offset) || null,
    limit: parseInt(limit) || null,
    order: [['createdAt', 'DESC']]
  })
  .then(result => res.json(result.rows))
  .catch(err => {
    res.status(500).json(err);
    next(err);
  });
});

//get one server
router.get('/servers/:id', (req, res, next)=>{
  Server.findById(req.params.id)
  .then(server => res.json(server))
  .catch(err => {
    res.status(500).json(err);
    next(err);
  });
});


//update server
//1 get user role for this server id
//2 check role
//3 do update
router.put('/servers/:serverId', (req, res, next)=>{
  const {
    body:{name, description},
    params:{serverId}, user
  } = req;

  getUserRole(user.id,serverId)
  .then(role=>rbac.can(role, 'server:update'))
  .then(()=>Server.findById(serverId))
  .then(server=> server.update({name, description}) )
  .then(server=> {
    res.json(server);
    io.sockets.emit('updateServer',server);
  })
  .catch(err => {
    if(!err){
      return res.status(401).json({error:'access denied'});
    }
    res.status(500).json(err);
    next(err);
  });

});


export default router;
