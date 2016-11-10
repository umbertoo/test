import { combineReducers } from 'redux';
import { messages } from './messages';
import { users } from './users';
import { channels } from './channels';
import { servers } from './servers';
import { roles } from './roles';

export default combineReducers({
    messages,
    users,
    channels,
    servers,
    roles
});
