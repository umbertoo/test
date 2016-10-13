import type from '../actions/common/types';

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user:{}
};

export const auth = (state = initialState, action) => {

    switch (action.type) {

        case type.FETCH_CURRENT_USER_REQUEST:
        case type.FETCH_CURRENT_USER_FAILURE:
        return {...state,
            isFetching:action.isFetching,
            error:action.error
        };

        case type.FETCH_CURRENT_USER_SUCCESS:
        return {...state,
            user:action.user,
            isFetching:action.isFetching,
            error:action.error
        };

        // login-----------------------
        case type.LOGIN_REQUEST:
        return { ...state,
            isFetching: true,
            isAuthenticated: false,
            errors: action.errors
        };
        case type.LOGIN_SUCCESS:
        return { ...state,
            isFetching: false,
            isAuthenticated: true,
            errors: ''
        };

        case type.LOGIN_FAILURE:
        return { ...state,
            isFetching: false,
            isAuthenticated: false,
            errors: action.message
        };

        // logout------------------------
        case type.LOGOUT_SUCCESS:
        return { ...state,
            isFetching: false,
            isAuthenticated: false
        };

        // signup------------------------
        case type.SIGNUP_REQUEST:
        return { ...state,
            isFetching: true,
            isAuthenticated: false,
            user: action.creds,
            errors: ''
        };

        case type.SIGNUP_SUCCESS:
        return { ...state,
            isFetching: false,
            isAuthenticated: true,
            errors: ''
        };

        case type.SIGNUP_FAILURE:
        return { ...state,
            isFetching: false,
            isAuthenticated: false,
            errors: action.message
        };

        default:
        return state;
    }
};
