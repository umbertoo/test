import type from '../actions/common/types';
import merge from 'lodash/merge';

const initialState = {
    items: {}
};

export const users = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USERS':
        case 'UPDATE_USERS_ONLINE':
        return {...state,
            items:merge({},state.items, action.payload.entities.users)
        };

        case type.FETCH_MESSAGES_SUCCESS:
        return {...state,
            items:merge({},state.items, action.payload.entities.users)
        };

        default: return state;
    }
};
