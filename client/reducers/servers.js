import type from '../actions/common/types';
import merge from 'lodash/merge';
import union from 'lodash/union';
const initialState = {
    items: {},
    ids:[]
};

export const servers = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_SERVERS_REQUEST:
        case type.FETCH_SERVERS_FAILURE:
        return {...state,
            isFetching:action.isFetching,
            error:action.error
        };

        case type.FETCH_SERVERS_SUCCESS:
        return {...state,
            items:merge({},state.items, action.payload.entities.servers),
            ids:union(state.ids, action.payload.result),
            isFetching:action.isFetching,
            error:action.error
        };


        default: return state;
    }
};
