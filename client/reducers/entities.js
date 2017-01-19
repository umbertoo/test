import { combineReducers } from 'redux';
import { messages } from './messages';
import { users } from './users';
import { channels } from './channels';
import { servers } from './servers';
import { roles } from './roles';
import { permissions } from './permissions';

// // Updates an entity cache in response to any action with response.entities.
// const entities = (state = { users: {}, repos: {} }, action) => {
//   if (action.response && action.response.entities) {
//     return merge({}, state, action.response.entities)
//   }
//
//   return state
// }



export default combineReducers({
    messages,
    users,
    channels,
    servers,
    roles,
    permissions
});
