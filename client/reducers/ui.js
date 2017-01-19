import type from '../actions/common/types';
import set from 'lodash/set';
import merge from 'lodash/merge';
import union from 'lodash/union';
import without from 'lodash/without';

const initialState = {
  editableMessage:null,
  // selectedChannel:null,
  // selectedServer:null,
  selectedRole:null,
  modals:{
    serverSettings:false,
    channelSettings:false,
    channelCreate:false,
    userSettings:false,
  },
  channelsWithNewMessages:[],
};

export const ui = (state = initialState, action) => {
  switch (action.type) {



    case type.SELECT_SERVER:
    return { ...state, selectedServer: action.id };
    case type.SELECT_ROLE:
    return { ...state, selectedRole: action.id };

    case type.SET_EDITABLE_MESSAGE:
    case type.UNSET_EDITABLE_MESSAGE:
    return { ...state, editableMessage: action.id };

    case type.TOGGLE_MODAL:
    return {...state,
      modals:{
        ...state.modals,
        [action.modalName]:!state.modals[action.modalName]
      }
    };

    // case type.RECEIVE_MESSAGE:
    // if(action.openedChannelId==action.channelId) return state;
    // return {...state,
    //   channelsWithNewMessages: union(state.channelsWithNewMessages,[action.channelId])
    // };
    //
    //
    // case type.OPEN_CHANNEL:{
    //   const {channelsWithNewMessages:ids}=state;
    //   if(!ids.some(id=>id==action.channelId)) return state;
    //   return {...state,
    //     channelsWithNewMessages:without(state.channelsWithNewMessages, parseInt(action.channelId))
    //   };
    // }
    default: return state;
  }
};
