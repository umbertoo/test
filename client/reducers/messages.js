import type from '../actions/common/types';
import merge from 'lodash/merge';

const initialState = {
    items: {},
    isFetching: true,
    isCreating: false,
    error:''
};

export const messages = (state = initialState, action) => {

    switch (action.type) {
        case type.UPDATE_MESSAGE:
        case type.EDIT_MESSAGE_SUCCESS:
        return {...state,
            items:{...state.items, [action.message.id]: action.message}
        };
        //-------------------------------------------

        case type.FETCH_MESSAGES_REQUEST:
        case type.FETCH_MESSAGES_FAILURE:
        return {...state,
            isFetching:action.isFetching,
            error:action.error
        };

        case type.FETCH_MESSAGES_SUCCESS:
        return {...state,
            items:merge({},state.items,action.response.entities.messages),
            isFetching:action.isFetching,
            error:action.error
        };

        //-------------------------------------------
        case type.CREATE_MESSAGE_REQUEST:
        return {...state,
            isCreating:action.isCreating
        };
        case type.CREATE_MESSAGE_SUCCESS:
        return {...state,
            isCreating:action.isCreating,
            // items:merge({},state.items, action.response.entities.messages)
        };
        case type.CREATE_MESSAGE_FAILURE:
        return {...state,
            isCreating:action.isCreating,
            error:action.error
        };

        case type.RECEIVE_MESSAGE:
        console.log('RECEIVE_MESSAGE', action);
        return {...state,
            items:merge({},state.items, action.response.entities.messages)
        };

        default: return state;
    }
};
