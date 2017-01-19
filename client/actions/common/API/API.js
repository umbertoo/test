import { checkStatus } from "../check_status_response";
export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'JWT '+localStorage.getItem('token')
};
export const imageHeaders = {
    'Accept': 'application/json',
    'Authorization': 'JWT '+localStorage.getItem('token')
};
console.log(localStorage.getItem('token'));
// const Message = {};
const Channel = {};
const Message = {};
const Server = {};
const Role = {};
const Permission = {};
const User = {};
const auth={};

//
auth.login = creds =>
fetch('/login',{
    method: 'POST',
    headers,
    body: JSON.stringify(creds)
}).then(checkStatus).then(res=> res.json());

auth.signup = creds =>
fetch('/signup',{
    method: 'POST',
    headers,
    body: JSON.stringify(creds)
}).then(checkStatus).then(res=> res.json());

User.get = () =>
fetch('/api/user',{headers}).then(checkStatus).then(res=> res.json());

User.edit = (user) =>
fetch('/api/user',{
    method: 'PUT',
    headers,
    body: JSON.stringify(user)
}).then(checkStatus).then(res=> res.json());

Message.create = message =>
fetch('/api/messages',{
    method: 'POST',
    headers,
    body: JSON.stringify(message)
}).then(checkStatus).then(res=> res.json());

Message.updateAck = (messageId) =>
fetch('/api/messages/'+messageId+'/ack',{
    method: 'POST',
    headers
}).then(checkStatus).then(res=> res.json());

Message.fetchAckByServer = (serverId) =>
fetch('/api/servers/'+serverId+'/messages/ack',{
    method: 'GET',
    headers
}).then(checkStatus).then(res=> res.json());

Message.edit = (id, text) =>
fetch(`/api/messages/${id}`,{
    method: 'PUT',
    headers,
    body: JSON.stringify({text})
}).then(checkStatus).then(res=> res.json());

Message.delete = (id) =>
fetch(`/api/messages/${id}`,{
    method: 'DELETE',
    headers
}).then(checkStatus).then(res=> res.json());

Message.getByChannel = (channelId, limit, offset)=>
fetch(`/api/channels/${channelId}/messages?limit=${limit}&offset=${offset}`,
  {headers}
).then(checkStatus).then(res=> res.json());
Message.getCount = (channelId, id, date)=>
fetch(`/api/channels/${channelId}/messages/count?id=${id}&date=${date}`,
  {headers}
).then(checkStatus).then(res=> res.json());

Channel.getByServer = serverId =>
fetch('/api/servers/'+serverId+'/channels', {headers})
.then(checkStatus).then(res=> res.json());

Channel.sendTyping = channelId =>
fetch(`/api/channels/${channelId}/typing`, {method: 'POST',headers})
.then(checkStatus).then(res=> res.json());

Channel.create = channel =>
fetch('/api/channels',{
    method: 'POST',
    headers,
    body: JSON.stringify(channel)
}).then(checkStatus).then(res=> res.json());

Channel.delete = (id) =>
fetch(`/api/channels/${id}`,{
    method: 'DELETE',
    headers
}).then(checkStatus).then(res=> res.json());

Channel.edit = ({id, name, description}) =>
fetch(`/api/channels/${id}`,{
    method: 'PUT',
    headers,
    body: JSON.stringify({name, description})
}).then(checkStatus).then(res=> res.json());

Channel.editOrder = (order) =>
fetch('/api/channels/order',{
    method: 'PATCH',
    headers,
    body: JSON.stringify({order})
}).then(checkStatus).then(res=> res.json());


Server.get = (limit, offset)=>
fetch(`/api/servers?limit=${limit}&offset=${offset}`,
  {headers}
).then(checkStatus).then(res=> res.json());

Server.create = server =>
fetch('/api/servers',{
    method: 'POST',
    headers,
    body: JSON.stringify(server)
}).then(checkStatus).then(res=> res.json());


Server.editOrder = (order) =>
fetch('/api/servers/order',{
    method: 'PATCH',
    headers,
    body: JSON.stringify({order})
}).then(checkStatus).then(res=> res.json());

Server.delete = (id) =>
fetch(`/api/servers/${id}`,{
    method: 'DELETE',
    headers
}).then(checkStatus).then(res=> res.json());

Server.edit = ({id, name, description}) =>
fetch(`/api/servers/${id}`,{
    method: 'PUT',
    headers,
    body: JSON.stringify({name, description})
}).then(checkStatus).then(res=> res.json());

Role.getByServer = serverId =>
fetch('/api/servers/'+serverId+'/roles', {headers})
.then(checkStatus).then(res=> res.json());

Role.create = (name, serverId) =>
fetch('/api/servers/'+serverId+'/roles',{
    method: 'POST',
    headers,
    body: JSON.stringify({name})
}).then(checkStatus).then(res=> res.json());

Role.delete = (roleId, serverId) =>
fetch('/api/servers/'+serverId+'/roles/'+roleId,{
    method: 'DELETE',
    headers
}).then(checkStatus).then(res=> res.json());

Role.edit = (role, serverId) =>
fetch('/api/servers/'+serverId+'/roles/'+role.id,{
    method: 'PUT',
    headers,
    body: JSON.stringify(role)
}).then(checkStatus).then(res=> res.json());

Permission.get = () =>
fetch('/api/permissions', {headers})
.then(checkStatus).then(res=> res.json());

// fetch('/api/notes/' + id, {
//     method: 'PUT',
//     headers,
//     body: JSON.stringify(body)
// }).then(checkStatus).then(res=> res.json());
//
// Note.delete = id =>
// fetch('/api/notes/' + id, {
//     method: 'DELETE'
// }).then(checkStatus).then(res=> res.json());
//
//
//
//
//
const API = {Channel, Message, auth , User, Server, Role, Permission};
export default API;
