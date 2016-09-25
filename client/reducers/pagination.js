import type from '../actions/common/types';
//
import assign from 'lodash/assign';
import omit from 'lodash/omit';

import set from 'lodash/set';
import merge from 'lodash/merge';
import union from 'lodash/union';
import without from 'lodash/without';
// import { idsByLabel } from './idsBylabel';

const initialState = {
    idsByChannel: {}

};
export const pagination = (state = initialState, action) => {
    if(action.channelId)
    return {
        idsByChannel: {
            ...state.idsByChannel,
            [action.channelId]:idsByChannel(state.idsByChannel[action.channelId], action)
        }
    };
    else return state;

};
const initState = {
    ids:[],
    slice:[],
    pageCount:0,
    scrollPosition:null,
    newMessages:false
};

const idsByChannel = (state = initState, action) => {
    switch (action.type) {
        case type.FETCH_MESSAGES_SUCCESS:
        return {...state,
            ids: union(action.payload.result,state.ids ),
            pageCount:state.pageCount+1
        };
        //------------------------------------------------------------------
        case 'RECEIVE_MESSAGE':
        return {...state,
            ids: [...state.ids, action.message.id],
        };
        //------------------------------------------------------------------
        case type.SAVE_SCROLL_POSITION:
        return {...state,
            scrollPosition: action.scrollPosition,
            firstVisibleId:action.firstVisibleId
        };
        //------------------------------------------------------------------
        case type.SAVE_LAST_VISIBLE_MESSAGE:
        return {...state, lastVisibleMessage: action.lastVisibleMessage};
        //------------------------------------------------------------------


        case 'UPDATE_SLICE':
        console.log('UPDATE_SLICE',action.ids);
        return {...state, slice: action.ids};
        //------------------------------------------------------------------


        // case type.FETCH_NOTES_SUCCESS:
        // return {...state,
        //     ids: union(state.ids, action.payload.result),
        //     pageCount:state.pageCount+1,
        //     nextPageUrl:action.nextPageUrl,
        //     isFetching:action.isFetching
        // };
        // case type.DELETE_NOTE:
        // return {...state, ids: without(state.ids, action.note.id) };
        //
        // case type.UPDATE_PAGINATION :
        // if(action.deleted){
        //     return {...state, ids: without(state.ids, action.noteId) };
        // }else if(action.added){
        //     return {...state, ids: [action.noteId,...state.ids] };
        // }
        default:
        return state;
    }
};
