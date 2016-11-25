import type from '../actions/common/types';
import merge from 'lodash/merge';
import union from 'lodash/union';
import without from 'lodash/without';
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  items: {},
  ids:[]
};



export const servers = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_ROLES_SUCCESS:
    return {...state,
      items:{...state.items,
        [action.serverId]: {
          ...state.items[action.serverId],
          roles:action.payload.result
        }
      }
    };
    case type.CREATE_CHANNEL_SUCCESS:
    return {...state,
      items:{...state.items,
        [action.serverId]: {
          ...state.items[action.serverId],
          channels:union(state.items[action.serverId].channels, [action.payload.result])
        }
      }
    };
    case type.FETCH_CHANNELS_SUCCESS:
    return {...state,
      items:{...state.items,
        [action.serverId]: {
          ...state.items[action.serverId],
          channels:action.payload.result
        }
      }
    };
    case type.FETCH_SERVERS_REQUEST:
    case type.FETCH_SERVERS_FAILURE:
    case type.CREATE_SERVER_REQUEST:
    case type.CREATE_SERVER_FAILURE:
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
    case type.CREATE_SERVER_SUCCESS:
    return {...state,
      items:merge({},state.items, action.payload.entities.servers),
      ids:union(state.ids, [action.payload.result]),
      isFetching:action.isFetching,
      error:action.error
    };

    case type.UPLOAD_SERVER_ICON_REQUEST:
    case type.UPLOAD_SERVER_ICON_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };

    case type.UPLOAD_SERVER_ICON_SUCCESS:
    return {...state,
      items: {...state.items,
        [action.serverId]:{
          ...state.items[action.serverId],
          icon: action.icon
        }
      }
    };

    case type.EDIT_CHANNELS_ORDER_SUCCESS:
    console.warn('EDIT_CHANNELS_ORDER_SUCCESS!!!!!!!');
    const {channels} = state.items[action.serverId];
    return {...state,
      items: {...state.items,
        [action.serverId]:{
          ...state.items[action.serverId],
          channels: arrayMove(channels, action.oldIndex, action.newIndex)
        }
      }
    };
    case type.EDIT_ROLES_ORDER_SUCCESS:{
      const {roles} = state.items[action.serverId];
      return {...state,
        items: {...state.items,
          [action.serverId]:{
            ...state.items[action.serverId],
            roles: arrayMove(roles, action.oldIndex, action.newIndex)
          }
        }
      };
    }
    case type.DELETE_CHANNEL_SUCCESS:
    return {...state,
      items: {...state.items,
        [action.serverId]:{
          ...state.items[action.serverId],
          channels: without(state.items[action.serverId].channels, action.channelId)
        }
      }
    };

    case type.CREATE_ROLE_SUCCESS:
    return {...state,
      items: {...state.items,
        [action.serverId]:{
          ...state.items[action.serverId],
          roles: [...state.items[action.serverId].roles, action.payload.result]
        }
      }
    };
    case type.DELETE_ROLE_SUCCESS:
    return {...state,
      items: {...state.items,
        [action.serverId]:{
          ...state.items[action.serverId],
          roles: without(state.items[action.serverId].roles, action.payload.result)
        }
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
      ids: arrayMove(state.ids, action.oldIndex, action.newIndex),
      isFetching:false
    };
    //------------------------------------------------------------------------------

    default: return state;
  }
};
