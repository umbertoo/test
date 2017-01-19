import { combineReducers } from 'redux';
import type from '../actions/common/types';

import { auth } from './auth';
import entities from './entities';
import {usersOnline} from './usersOnline';
import {ui} from './ui';
import {confirmDialog} from './confirmDialog';

import keyBy from 'lodash/keyBy';
import forEach from 'lodash/forEach';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import {channelData} from './channelData';
import {serverDataItem} from './serverData';



const serverData = (state={}, action) =>{
  const { serverId } = action;
  if(!serverId) return state;
  return {
    ...state,
    [serverId]:serverDataItem(state[serverId], action)
  };
};

export default combineReducers({
  auth,
  entities,
  channelData,
  serverData,
  usersOnline,
  ui,
  confirmDialog
});










// const getReducer = (reducer, id, state={}, action)=>{
//   if(!id) return state;
//   return {
//     ...state,
//     [id]:reducer(state[id], action)
//   };
// };

// const channelData = (state={}, action) =>{
//   return getReducer(channelDataItem, action.channelId, state, action);
// };
// const channelData = (state={}, action) =>{
//   const { channelIds } = action;
//   if(!channelIds) return state;
//
//   const items = {};
//   forEach(channelIds, id=> items[id] = channelDataItem(state[id], action) );
//   return {
//     ...state,
//     ...items
//   };
// };
