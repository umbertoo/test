import { rbac } from './index';
import { Router } from 'express';
const router = Router();

  //send typing
router.post('/channels/:id/typing',(req,res)=>{
  const {id, name} = req.user;
  const user = {id,name};
  req.user.socket.broadcast.emit('startTyping',{user, channelId: req.params.id});
  res.json({ok:'ok'});
});
export default router;
