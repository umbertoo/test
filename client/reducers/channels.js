import type from '../actions/common/types';
import merge from 'lodash/merge';
import without from 'lodash/without';
import union from 'lodash/union';
import unionIds from '../utils/unionIds.js';
const initialState = {
  items: {},
  ids:[],
  isFetching: true,
};

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
      items: {
        ...state.items, [action.channelId]:{
          ...state.items[action.channelId],
          deleted:true
        }
      },
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
    case type.EDIT_CHANNELS_ORDER_REQUEST:
    case type.EDIT_CHANNELS_ORDER_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.EDIT_CHANNELS_ORDER_SUCCESS:
    return {...state,
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
    case type.FETCH_SERVERS_SUCCESS:
    case type.CREATE_SERVER_SUCCESS:
    return {...state,
      items: merge({}, state.items, action.payload.entities.channels),
      ids: unionIds(action.payload.result, state.ids),
      isFetching:false
    };

    //------------------------------------------------------------------------------


    default: return state;
  }
};
