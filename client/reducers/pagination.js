import type from '../actions/common/types';
//
import assign from 'lodash/assign';
import pull from 'lodash/pull';

import set from 'lodash/set';
import merge from 'lodash/merge';
import union from 'lodash/union';
import without from 'lodash/without';
// import { idsByLabel } from './idsBylabel';

import {idsByChannel} from './idsByChannel';
import {idsByServer} from './idsByServer';


const initialState = {
  idsByChannel: {},
  idsByServer: {}
};


const getReducer= (reducer, id, state, action)=>{
  if(!id) return state;
  return {
    ...state,
    [id]:reducer(state[id], action)
  };
};

export const pagination = (state = initialState, action) => {
  return {
    // idsByServer: getReducer(idsByServer, action.serverId,  state.idsByServer, action),
    idsByChannel: getReducer(idsByChannel, action.channelId, state.idsByChannel, action),

  };
};
