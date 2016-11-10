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
    case type.EDIT_CHANNELS_ORDER_SUCCESS:
    return {...state,
      items: {...state.items,
        [action.serverId]:{...state.items[action.serverId], ids: action.payload }
      }
    };
    case type.DELETE_CHANNEL_SUCCESS:
    return {...state,
      items: {...state.items,
        [action.serverId]:{...state.items[action.serverId], ids: action.payload }
      }

    };
    //------------------------------------------------------------------------------
    case type.EDIT_SERVERS_ORDER_REQUEST:
    case type.EDIT_SERVERS_ORDER_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.EDIT_SERVERS_ORDER_SUCCESS:
    return {...state,
      ids: action.payload,
      isFetching:false
    };
    //------------------------------------------------------------------------------

    default: return state;
  }
};
