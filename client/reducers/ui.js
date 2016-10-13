import type from '../actions/common/types';

const initialState = {
  selectedChannel:0,
  editableMessage:null,
  selectedServer:null
};

export const ui = (state = initialState, action) => {
  switch (action.type) {

    case type.SELECT_CHANNEL:
    return { ...state, selectedChannel: action.id };
    case type.SELECT_SERVER:
    return { ...state, selectedServer: action.id };

    case type.SET_EDITABLE_MESSAGE:
    case type.UNSET_EDITABLE_MESSAGE:
    return { ...state, editableMessage: action.id };


    default: return state;
  }
};
