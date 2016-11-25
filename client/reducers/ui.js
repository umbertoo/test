import type from '../actions/common/types';

const initialState = {
  editableMessage:null,
  selectedChannel:null,
  selectedServer:null,
  selectedRole:null,
  modals:{
    serverSettings:false,
    channelSettings:false,
    channelCreate:false,
    userSettings:false,
  }
};

export const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PARAMS':
    return {...state, params:action.params};
    
    case type.SELECT_CHANNEL:
    return { ...state, selectedChannel: action.id };
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

    default: return state;
  }
};
