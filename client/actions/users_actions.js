import types from './common/types';

// "plugins": ["transform-async-to-generator"]

export const updateUsers = (payload) =>({
    type:types.UPDATE_USERS,
    payload
});

export const updateUsersOnline = (payload) =>({
    type:types.UPDATE_USERS_ONLINE,
    payload
});
