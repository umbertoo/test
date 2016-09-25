import types from '../actions/common/types';

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user:{}
};

export const auth = (state = initialState, action) => {

    switch (action.type) {

        case types.FETCH_CURRENT_USER_REQUEST:
        case types.FETCH_CURRENT_USER_FAILURE:
        return {...state,
            isFetching:action.isFetching,
            error:action.error
        };
    
        case types.FETCH_CURRENT_USER_SUCCESS:
        return {...state,
            user:action.user,
            isFetching:action.isFetching,
            error:action.error
        };

        // login-----------------------
        case types.LOGIN_REQUEST:
        return { ...state,
            isFetching: true,
            isAuthenticated: false,
            errors: action.errors
        };
        case types.LOGIN_SUCCESS:
        return { ...state,
            isFetching: false,
            isAuthenticated: true,
            errors: ''
        };

        case types.LOGIN_FAILURE:
        return { ...state,
            isFetching: false,
            isAuthenticated: false,
            errors: action.message
        };

        // logout------------------------
        case types.LOGOUT_SUCCESS:
        return { ...state,
            isFetching: false,
            isAuthenticated: false
        };

        // signup------------------------
        case types.SIGNUP_REQUEST:
        return { ...state,
            isFetching: true,
            isAuthenticated: false,
            user: action.creds,
            errors: ''
        };

        case types.SIGNUP_SUCCESS:
        return { ...state,
            isFetching: false,
            isAuthenticated: true,
            errors: ''
        };

        case types.SIGNUP_FAILURE:
        return { ...state,
            isFetching: false,
            isAuthenticated: false,
            errors: action.message
        };

        default:
        return state;
    }
};
