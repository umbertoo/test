import { Schema, arrayOf, valuesOf } from 'normalizr';

export const user = new Schema('users',{ idAttribute: 'id' });
export const server = new Schema('servers',{ idAttribute: 'id' });
export const message = new Schema('messages',{ idAttribute: 'id' });
export const channel = new Schema('channels',{ idAttribute: 'id' });

export const action = new Schema('actions', { idAttribute: 'id' });
export const resource = new Schema('resources', { idAttribute: 'id' });
export const permission = new Schema('permissions', { idAttribute: 'id' });
export const attribute = new Schema('attributes', { idAttribute: 'id' });
export const role = new Schema('roles', { idAttribute: 'id' });


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
    serverRoles:arrayOf(role)
});
