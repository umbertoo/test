import types from '../actions/common/types';
import merge from 'lodash/merge';
import without from 'lodash/without';
import union from 'lodash/union';
const initialState = {
    items: {},
    isFetching: true,
    channelsWithNewMessages:[]
};

export const channels = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_CHANNELS_REQUEST:
        return {...state,
            isFetching:action.isFetching
        };

        case types.FETCH_CHANNELS_SUCCESS:
        return {...state,
            items:merge({},state.items,action.payload.entities.channels),
            isFetching:false
        };

        case types.FETCH_CHANNELS_FAILURE:
        return {...state,
            isFetching:action.isFetching
        };

        case types.SET_CHANNEL_HAS_NEW_MESSAGES:
        return {...state,
            channelsWithNewMessages:union(state.channelsWithNewMessages,[action.channelId])};
        case types.UNSET_CHANNEL_HAS_NEW_MESSAGES:
        return {...state,
            channelsWithNewMessages:without(state.channelsWithNewMessages, action.channelId)};

        return state;
        default: return state;
    }
};
