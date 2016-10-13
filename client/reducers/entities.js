import { combineReducers } from 'redux';
import { messages } from './messages';
import { users } from './users';
import { channels } from './channels';
import { servers } from './servers';

export default combineReducers({
    messages,
    users,
    channels,
    servers
});
