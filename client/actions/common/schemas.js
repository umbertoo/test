import { Schema, arrayOf, valuesOf } from 'normalizr';

export const user = new Schema('users',{ idAttribute: 'id' });
export const server = new Schema('servers',{ idAttribute: 'id' });
export const message = new Schema('messages',{ idAttribute: 'id' });
export const channel = new Schema('channels',{ idAttribute: 'id' });

message.define({
    user,
    channel
});
server.define({
    channels:arrayOf(channel)
});
// channel.define({
//     server
// });
