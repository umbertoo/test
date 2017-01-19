import type from '../actions/common/types';
//
import assign from 'lodash/assign';
import pull from 'lodash/pull';

import set from 'lodash/set';
import merge from 'lodash/merge';
import union from 'lodash/union';
import without from 'lodash/without';

const initState = {
  openedChannel:null
};

export const serverDataItem = (state = initState, action) => {

  switch (action.type) {
    case type.OPEN_CHANNEL:{
      return {...state,
        openedChannel:action.channelId
       }
    }

    default:
    return state;
  }
};
