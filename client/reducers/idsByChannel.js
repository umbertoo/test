import type from '../actions/common/types';
//
import assign from 'lodash/assign';
import pull from 'lodash/pull';

import set from 'lodash/set';
import merge from 'lodash/merge';
import union from 'lodash/union';
import without from 'lodash/without';
// import { idsByLabel } from './idsBylabel';

const initState = {
  ids:[],
  slice:[],
  pageCount:0,
  scrollPosition:null,
  newMessages:false,
  typingUsers:[]
};

export const idsByChannel = (state = initState, action) => {
  switch (action.type) {
    case type.START_TYPING:
    return {...state, typingUsers: [...state.typingUsers, action.userId]};

    case type.STOP_TYPING:
    return {...state, typingUsers: without(state.typingUsers, action.userId)};

    case type.DELETE_MESSAGE_SUCCESS:
    return {...state,
      ids: without(state.ids, action.message.id),
      slice: without(state.slice, action.message.id),
    };
    case type.FETCH_MESSAGES_SUCCESS:
    return {...state,
      ids: union(action.payload.result,state.ids ),
      pageCount:state.pageCount+1
    };
    //------------------------------------------------------------------
    case type.RECEIVE_MESSAGE:
    case type.CREATE_MESSAGE_SUCCESS:
    return {...state,
      ids: [...state.ids, action.message.id]
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
