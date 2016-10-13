import { rbac } from './index';
import { Router } from 'express';
import Server, { ServerMembers } from '../models/server';
import Channel from '../models/channel';

const router = Router();



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
export default router;
