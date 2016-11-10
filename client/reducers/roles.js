import type from '../actions/common/types';
import merge from 'lodash/merge';
import without from 'lodash/without';
import union from 'lodash/union';
const initialState = {
  items: {},
  ids:[],
  isFetching: true
};

export const roles = (state = initialState, action) => {

  switch (action.type) {
    case type.FETCH_ROLES_REQUEST:
    case type.FETCH_ROLES_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.FETCH_ROLES_SUCCESS:
    return {...state,
      items:merge({}, state.items, action.payload.entities.roles),
      ids: union(action.payload.result, state.ids),
      isFetching:false
    };

    default: return state;
  }
};
