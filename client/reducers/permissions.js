import type from '../actions/common/types';
import merge from 'lodash/merge';
import without from 'lodash/without';
import union from 'lodash/union';

const initialState = {
  items: {},
  ids:[],
  isFetching: true
};

export const permissions = (state = initialState, action) => {

  switch (action.type) {
    case type.FETCH_PERMISSIONS_REQUEST:
    case type.FETCH_PERMISSIONS_FAILURE:
    return {...state,
      isFetching:action.isFetching,
      error:action.error
    };
    case type.FETCH_PERMISSIONS_SUCCESS:
    return {...state,
      items:merge({}, state.items, action.payload.entities.permissions),
      ids: union(action.payload.result, state.ids),
      isFetching:false
    };

    default: return state;
  }
};
