import { rbac } from './index';
import { Router } from 'express';

import Server, { ServerMembers } from '../models/server';
import Role, { UserRolesPerServer } from '../models/role';
import User from '../models/user';
import Channel from '../models/channel';

const router = Router();


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

// get servers
router.get('/servers', (req,res,next) => {
  const {offset, limit} = req.query;
  User.findById(req.user.id)
  .then(user => user.getServers({
    offset: parseInt(offset) || null,
    limit: parseInt(limit) || null,
    order: [['createdAt', 'DESC']],
    include: [{model:Channel}]
  }))
  .then(servers=> res.json(servers) )
  .catch(err => {
    res.status(500).json(err);
    next(err);
  });

});
//get one server
router.get('/servers/:id', (req, res, next)=>{
  console.log('server TYT'.magenta);

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
