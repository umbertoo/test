import type from '../actions/common/types';

const initialState = {
    ids:{}
};

export const usersOnline = (state = initialState, action) => {
    switch (action.type) {

        case type.UPDATE_USERS_ONLINE:
        return {ids: action.usersIds};

        default: return state;
    }
};
