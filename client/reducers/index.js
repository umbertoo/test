import { combineReducers } from 'redux';
import { auth } from './auth';
import { pagination } from './pagination';
import entities from './entities';
import {usersOnline} from './usersOnline';
import {ui} from './ui';


export default combineReducers({
    auth,
    entities,
    pagination,
    usersOnline,
    ui
});
