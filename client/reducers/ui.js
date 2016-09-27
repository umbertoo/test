import types from '../actions/common/types';

const initialState = {
    selectedChannel:0,
    editableMessage:null
};

export const ui = (state = initialState, action) => {
    switch (action.type) {

        case types.SELECT_CHANNEL:
        return { ...state, selectedChannel: action.id };

        case types.SET_EDITABLE_MESSAGE:
        case types.UNSET_EDITABLE_MESSAGE:
        return { ...state, editableMessage: action.id };


        default: return state;
    }
};
