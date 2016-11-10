import type from '../actions/common/types';
//
import assign from 'lodash/assign';
import pull from 'lodash/pull';

import set from 'lodash/set';
import merge from 'lodash/merge';
import union from 'lodash/union';
import without from 'lodash/without';
// import { idsByLabel } from './idsBylabel';

const initState = {
  ids:[]
};

export const idsByServer = (state = initState, action) => {
  switch (action.type) {
    case type.FETCH_CHANNELS_SUCCESS:
    return {...state,
      ids: union(action.payload.result, state.ids)
    };
    case type.EDIT_CHANNELS_ORDER_SUCCESS:
    return {...state,
      ids: action.payload
    };
    case type.CREATE_CHANNEL_SUCCESS:
    return {...state,
      ids: [action.payload.result, ...state.ids]
    };
    case type.DELETE_CHANNEL_SUCCESS:
    return {...state,
      ids: without(state.ids, action.channelId)
    };
    default:
    return state;
  }
};
