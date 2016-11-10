import type from '../actions/common/types';
import merge from 'lodash/merge';
import without from 'lodash/without';
import union from 'lodash/union';
const initialState = {
  items: {},
  ids:[],
  isFetching: true,
  channelsWithNewMessages:[],
};

// case type.FETCH_CHANNELS_SUCCESS:
// return {...state,
//   ids: union(action.payload.result, state.ids)
// };
// case type.EDIT_CHANNELS_ORDER_SUCCESS:
// return {...state,
//   ids: action.payload
// };
// case type.CREATE_CHANNEL_SUCCESS:
// return {...state,
//   ids: [action.payload.result, ...state.ids]
// };
// case type.DELETE_CHANNEL_SUCCESS:
// return {...state,
//   ids: without(state.ids, action.channelId)
// };

export const channels = (state = initialState, action) => {

  switch (action.type) {
    case type.CREATE_CHANNEL_REQUEST:
    case type.CREATE_CHANNEL_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.CREATE_CHANNEL_SUCCESS:
    return {...state,
      items: merge({}, state.items, action.payload.entities.channels),
      // ids: [action.payload.result, ...state.ids],
      isFetching:false
    };

    case type.DELETE_CHANNEL_REQUEST:
    case type.DELETE_CHANNEL_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.DELETE_CHANNEL_SUCCESS:
    return {...state,
      // ids: without(state.ids, action.channelId),
      isFetching:false
    };
    //------------------------------------------------------------------------------
    case type.EDIT_CHANNEL_REQUEST:
    case type.EDIT_CHANNEL_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.EDIT_CHANNEL_SUCCESS:
    return {...state,
      items: merge({}, state.items, action.payload.entities.channels),
      isFetching:false
    };
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    case type.EDIT_CHANNELS_ORDER_REQUEST:
    case type.EDIT_CHANNELS_ORDER_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.EDIT_CHANNELS_ORDER_SUCCESS:
    return {...state,
      // ids: action.payload,
      isFetching:false
    };
    //------------------------------------------------------------------------------
    case type.FETCH_CHANNELS_REQUEST:
    case type.FETCH_CHANNELS_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.FETCH_CHANNELS_SUCCESS:
    return {...state,
      items: merge({}, state.items, action.payload.entities.channels),
      ids: union(action.payload.result, state.ids),
      isFetching:false
    };
    case type.FETCH_SERVERS_SUCCESS:
    return {...state,
      items:merge({}, state.items, action.payload.entities.channels)
    };

    //------------------------------------------------------------------------------
    case type.SET_CHANNEL_HAS_NEW_MESSAGES:
    return {...state,
      channelsWithNewMessages:union(state.channelsWithNewMessages,[action.channelId])};
      case type.UNSET_CHANNEL_HAS_NEW_MESSAGES:
      return {...state,
        channelsWithNewMessages:without(state.channelsWithNewMessages, action.channelId)};

        default: return state;
      }
    };
