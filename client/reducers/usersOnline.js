import types from '../actions/common/types';

const initialState = {
    ids:{}
};

export const usersOnline = (state = initialState, action) => {
    switch (action.type) {

        case types.UPDATE_USERS_ONLINE:
        return {ids: action.payload.result};

        default: return state;
    }
};
