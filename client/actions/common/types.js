const types = {

    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',

    SIGNUP_REQUEST: 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAILURE: 'SIGNUP_FAILURE',

    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE',

    UPDATE_USERS:'UPDATE_USERS',
    UPDATE_USERS_ONLINE:'UPDATE_USERS_ONLINE',
    LOAD_MESSAGES:'LOAD_MESSAGES',


    FETCH_MESSAGES_REQUEST: 'FETCH_MESSAGES_REQUEST',
    FETCH_MESSAGES_SUCCESS: 'FETCH_MESSAGES_SUCCESS',
    FETCH_MESSAGES_FAILURE: 'FETCH_MESSAGES_FAILURE',

    FETCH_CHANNELS_REQUEST: 'FETCH_CHANNELS_REQUEST',
    FETCH_CHANNELS_SUCCESS: 'FETCH_CHANNELS_SUCCESS',
    FETCH_CHANNELS_FAILURE: 'FETCH_CHANNELS_FAILURE',


    CREATE_MESSAGE_REQUEST: 'CREATE_MESSAGE_REQUEST',
    CREATE_MESSAGE_SUCCESS: 'CREATE_MESSAGE_SUCCESS',
    CREATE_MESSAGE_FAILURE: 'CREATE_MESSAGE_FAILURE',
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',

    SAVE_SCROLL_POSITION:'SAVE_SCROLL_POSITION',
    SAVE_LAST_VISIBLE_MESSAGE: 'SAVE_LAST_VISIBLE_MESSAGE',
    SET_CHANNEL_HAS_NEW_MESSAGES: 'SET_CHANNEL_HAS_NEW_MESSAGES',
    UNSET_CHANNEL_HAS_NEW_MESSAGES: 'UNSET_CHANNEL_HAS_NEW_MESSAGES',
    SELECT_CHANNEL: 'SELECT_CHANNEL'
};

export default types;
