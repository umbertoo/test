import types from '../actions/common/types';

const initialState = {
    selectedChannel:0
};

export const ui = (state = initialState, action) => {
    switch (action.type) {

        case types.SWITCH_CHANNEL:
        return {selectedChannel: action.id};

        default: return state;
    }
};
