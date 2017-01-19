import { Schema, arrayOf, valuesOf } from 'normalizr';

export const user = new Schema('users');
export const server = new Schema('servers');
export const message = new Schema('messages');
export const channel = new Schema('channels');

export const action = new Schema('actions');
export const resource = new Schema('resources');
export const permission = new Schema('permissions');
export const attribute = new Schema('attributes');
export const role = new Schema('roles');


channel.define({
  messages:arrayOf(message)
});

role.define({
  permissions:arrayOf(permission),
  inherits:arrayOf(role)
});

permission.define({
  resource,
  action,
  attribute
});

message.define({
  user,
  channel
});

server.define({
  channels:arrayOf(channel),
  roles:arrayOf(role)
});
