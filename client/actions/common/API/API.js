import { checkStatus } from "../check_status_response";
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'JWT '+localStorage.getItem('token')
};
console.log(localStorage.getItem('token'));
// const Message = {};
const Channel = {};
const Message = {};
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
fetch('/user',{
    method: 'GET',
    headers,
}).then(checkStatus).then(res=> res.json());

Message.create = message =>
fetch('/api/messages',{
    method: 'POST',
    headers,
    body: JSON.stringify(message)
}).then(checkStatus).then(res=> res.json());

Message.getByChannel = (channelId, limit, offset)=>
fetch(`/api/channels/${channelId}/messages?limit=${limit}&offset=${offset}`,
  {method: 'GET', headers}
).then(checkStatus).then(res=> res.json());

Channel.getByServer = server =>
fetch('/api/servers/'+server+'/channels')
.then(checkStatus).then(res=> res.json());

Message.getCount = (channelId, id, date)=>
fetch(`/api/channels/${channelId}/messages/count?id=${id}&date=${date}`
).then(checkStatus).then(res=> res.json());

//
// Note.create = body =>
// fetch('/api/notes/', {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(body)
// }).then(checkStatus).then(res=> res.json());
//
// Note.create = body =>
// fetch('/api/notes/', {
//     method: 'POST',
//     headers,
//     body: JSON.stringify(body)
// }).then(checkStatus).then(res=> res.json());
//
// Note.update = (id, body) =>
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
const API = {Channel,Message,auth , User};
export default API;
