import type from '../actions/common/types';
import {getChannelData} from '../selectors/selectors';
import {
  setScrollPosition
} from '../actions/channels_actions';

export default ({getState, dispatch}) => next => action =>{
// console.log('!!!!!!!!!!');
//   if(action.type == type.CHANGE_PARAMS){
//     const state = getState();
//     const prevChannelId = state.ui.params.channelId;
//     const {params:{channelId}} = action;
//
//     if(channelId!==prevChannelId){
//       console.warn('TYT!!!');
//       const {scrollPosition} = getChannelData(state, {channelId})||{};
//
//       action.channelId=channelId;
//
//       if(scrollPosition==-1){
//           action.position=-1;
//       }else{
//         action.position=60;
//       }
//     }
//   }

  next(action);


};
