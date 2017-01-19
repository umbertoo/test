import type from '../actions/common/types';
//
import assign from 'lodash/assign';
import pull from 'lodash/pull';

import set from 'lodash/set';
import merge from 'lodash/merge';
import union from 'lodash/union';
import without from 'lodash/without';
import reduce from 'lodash/reduce';
import unionIds from '../utils/unionIds';
// import { idsByLabel } from './idsBylabel';
import { LIMIT_PAGINATION, BOTTOM_POSITION } from '../actions';

const getLast = (array) => array.slice(-1)[0];

const checkCacheBefore = (slice, ids) =>{
  const end = ids.indexOf(slice[0]);
  if (end <= 0) return 0;
  return ids.slice(0, end).length;
};

const checkCacheAfter = (slice, ids) =>{
  const lastId = getLast(slice);
  const start = ids.indexOf(lastId)+1;
  if (start<0) return 0;
  return ids.slice(start).length;
};

const getMinimumSliceOfIds = (ids, startId) =>{
  const start = ids.indexOf(startId);
  return ids.slice(start, start+LIMIT_PAGINATION);
};

const addMinimumSliceOfIdsBefore = (ids, slice) =>{
  //get index of first Id for end point
  const end = ids.indexOf(slice[0]);
  const start = end - LIMIT_PAGINATION < 0 ? 0 : end - LIMIT_PAGINATION;
  return [...ids.slice(start, end),...slice];
};

const addMinimumSliceOfIdsAfter = (ids, slice) =>{
  const start = 1 + ids.indexOf(getLast(slice));
  return [...slice, ...ids.slice(start, start+LIMIT_PAGINATION)];
};

// const isBottom = (position) => position == BOTTOM_POSITION;
const isBottom = (state) => state.bottomScrollPosition == state.scrollPosition;

const isLastSlice = (ids, slice) => {
  return getLast(slice) && getLast(ids) == getLast(slice);
};

export const typingUsers = (state=[], action) =>{

  switch (action.type) {
    case type.START_TYPING:
    return unionIds(state, action.userId);

    case type.STOP_TYPING:
    return without(state, action.userId);

    default:
    return state;
  }
};
const initState = {
  typingUsers:[],
  scrollPosition:BOTTOM_POSITION,
  bottomScrollPosition:null,
  isBottomAndIsLastSlice:false,
  ids:[],
  slice:[],
  moreBefore:false,
  moreAfter:false,
  moreCacheBefore:0,
  moreCacheAfter:0,

  newMessages: [],
  lastMessage: null,
  hasNewMessages: false,
  savedLastMessage: null

};

export const channelDataItem = (state = initState, action, channelId) => {

  switch (action.type) {


    case type.OPEN_CHANNEL:
    return {...state,
      // scrollPosition: isBottom(state.scrollPosition) ? state.scrollPosition : 60,
      // scrollPosition:state.lastMessage == getLast(state.ids) ? 60 : state.scrollPosition,
      hasNewMessages: isBottom(state) ? false: state.hasNewMessages
    };

    case type.LEAVE_CHANNEL:{
      const { ids, slice, scrollPosition } = state;
      const isBottomAndIsLastSlice = isBottom(state) && isLastSlice(ids, slice);
      const newSlice = getMinimumSliceOfIds(ids, action.firstVisibleId);

      // const lastMessage = isBottomAndIsLastSlice ? getLast(slice) :state.lastMessage;
      return {...state,
        slice: newSlice,
        moreCacheBefore: checkCacheBefore(newSlice, state.ids),
        moreCacheAfter: checkCacheAfter(newSlice, state.ids),
        //  hasNewMessages: lastMessage != getLast(newSlice),
        lastMessage: state.savedLastMessage ? state.savedLastMessage: state.lastMessage,

        savedLastMessage:null
      };
    }

    case type.WINDOW_BLUR:
    return {...state,
      // lastMessage: getLast(state.ids)
    };

    case type.SET_SCROLL_POSITION:{
      const { ids, slice, newMessages } = state;
      const isBottomAndIsLastSlice = action.bottomPosition == action.position && isLastSlice(ids, slice);

      return {...state,
        scrollPosition: action.position,
        bottomScrollPosition: action.bottomPosition,
        // newMessages: isBottomAndIsLastSlice ? [] : newMessages,
        hasNewMessages: isBottomAndIsLastSlice ? false : state.hasNewMessages,
        savedLastMessage: isBottomAndIsLastSlice ? getLast(slice) : state.savedLastMessage,
        isBottomAndIsLastSlice : isBottomAndIsLastSlice

        // lastMessage: isBottomAndIsLastSlice ? getLast(state.ids) : state.lastMessage
      };
    }


    case type.RECEIVE_MESSAGE:{

      const { ids, slice, newMessages, scrollPosition } = state;

      const { result:messageId, entities:{messages} } = action.response;
      if(action.isOwnMessage){
        return {...state,
          ids: unionIds(state.ids, action.response.result),
          slice: unionIds(state.ids.slice(-LIMIT_PAGINATION), action.response.result),
          // scrollPosition:state.bottomScrollPosition,
          hasNewMessages:false,
          moreCacheAfter:0,
          // newMessages:[],
          lastMessage:action.response.result
        };

      }else{
        const isOpened = action.openedChannelId == action.channelId;
        const scrollIsBottom = isBottom(state);

        if (ids.length){
          const lastMessage = isOpened && scrollIsBottom ? messageId : state.lastMessage;
          const newSlice = isLastSlice(ids, slice) ? unionIds(slice, messageId) : slice;
          return {...state,
            typingUsers: without(state.typingUsers, messages[messageId].userId),

            ids: unionIds(ids, messageId),
            slice:newSlice,

            // newMessages: isBottom(scrollPosition) ? [] : [...newMessages, messageId],
            lastMessage: isOpened && scrollIsBottom ? messageId : state.lastMessage,
            hasNewMessages: lastMessage != getLast(newSlice)
          };
        } else{
          return {...state,
            hasNewMessages: !isOpened
          };
        }

      }


    }

    //_________________________________________________________________________

    case type.LOAD_CACHE_BEFORE:{
      const newSlice =  addMinimumSliceOfIdsBefore(state.ids, state.slice);
      return {...state,
        slice: newSlice,
        moreCacheBefore: checkCacheBefore(newSlice,state.ids),
      };
    }

    case type.LOAD_CACHE_AFTER:{

      const newSlice =  addMinimumSliceOfIdsAfter(state.ids, state.slice);
      return {...state,
        // scrollPosition:action.position,
        slice: newSlice,
        moreCacheAfter: checkCacheAfter(newSlice,state.ids),
      };
    }

    //__________________________________________________________________________

    case type.START_TYPING:
    case type.STOP_TYPING:
    return {...state, typingUsers: typingUsers(state.typingUsers, action)};




    case type.DELETE_MESSAGE_SUCCESS:
    return {...state,
      ids: without(state.ids, action.message.id),
      slice: without(state.slice, action.message.id),
    };

    case type.FETCH_MESSAGES_SUCCESS:
    return {...state,
      ids: union(action.response.result,state.ids ),
      slice: union(action.response.result,state.slice ),
      moreBefore: action.moreBefore,
    };
    default:
    return state;
  }
};



export const channelData = (state={}, action) =>{
  if(action.channelId)
  return {...state, [action.channelId]:channelDataItem(state[action.channelId], action)};

  switch (action.type) {
    case type.FETCH_SERVERS_SUCCESS:
    return reduce(action.payload.entities.channels,
      (list, channel, channelId) => {
        list[channelId] = channelDataItem(state[channelId], action);
        return list;
      },{...state}
    );

    case type.FETCH_MESSAGES_ACK_SUCCESS:
    return reduce(action.response,
      (list, {messageId, hasNewMessages}, channelId) => {
        list[channelId] = {...list[channelId], lastMessage: messageId, hasNewMessages};
        return list;
      },{...state}
    );

    default:
    return  state;
  }
};
// export const channelData = (state={}, action) =>{
//
//   if(action.type == type.FETCH_SERVERS_SUCCESS){
//     return reduce(action.payload.entities.channels,
//       (list, channel, channelId) => {
//         list[channelId] = channelDataItem(state[channelId], action);
//         return list;
//       },{...state}
//     );
//   }
//   if(action.type == type.FETCH_MESSAGES_ACK_SUCCESS){
//     return reduce(action.response,
//       (list, messageId, channelId) => {
//         list[channelId] = {...list[channelId], lastMessage: messageId};
//         return list;
//       },{...state}
//     );
//
//   } else if(action.channelId){
//     return {...state,
//       [action.channelId]:channelDataItem(state[action.channelId], action)
//     };
//
//   }else  return  state;
// };
