import type from '../actions/common/types';
import merge from 'lodash/merge';

const initialState = {
  items: {}
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case type.UPDATE_USERS:
    // case type.UPDATE_USERS_ONLINE:
    case type.FETCH_MESSAGES_SUCCESS:
    return {...state,
      items:merge({},state.items, action.response.entities.users)
    };
    case type.FETCH_CURRENT_USER_SUCCESS:
    case type.EDIT_USER_SUCCESS:
    return {...state,
      items:merge({},state.items, action.payload.entities.users)
    };

    case type.UPLOAD_USER_AVATAR_SUCCESS:
    return {...state,
      items: {...state.items,
        [action.userId]:{
          ...state.items[action.userId],
          avatar: action.avatar
        }
      }
    };
    default: return state;
  }
};
