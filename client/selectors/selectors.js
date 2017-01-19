import find from 'lodash/find';
import { createSelector } from 'reselect';

import map from 'lodash/map';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import reduceRight from 'lodash/reduceRight';
import findLast from 'lodash/findLast';
import moment from 'moment';
//utils______________________________________________________________________________________________
const mapItems = (ids, items) => ids.map(id=>items[id]);

//servers____________________________________________________________________________________________
export const getServersItems = (state) => state.entities.servers.items;
export const getServersIds = (state) => state.entities.servers.ids;


export const getServers = createSelector([getServersIds, getServersItems], mapItems);



export const getFirstChannelsIds = createSelector([getServers], servers =>
  reduce(servers, (list,server) => {
    list[server.id] = server.channels[0];
    //  list[server.id] = {firstChannelId:servers.channels[0]};
    return list;
  },{})
);

const getServerId = (state, props) => props.serverId;

// server DATA
export const getChannelData = (state, props) => state.channelData[props.channelId] || {};

// channel DATA
export const getServersDataItems = (state) => state.serverData || {};
export const getChannelDataItems = (state) => state.channelData || {};
//channels____________________________________________________________________________________________

export const getOpenedChannelsIdsByServer = createSelector([getServersDataItems],
  (serversDataItems)=>
  reduce(serversDataItems, (list, item, key)=>{
    list[key]=item.openedChannel;
    return list;
  },{})
);
export const getChannelsWithNewMessages = createSelector([getChannelDataItems],
  (channelDataItems)=>
  reduce(channelDataItems, (list, item, key)=>{
    list[key]=item.hasNewMessages;
    return list;
  },{})
);

export const getChannelsItems = (state, props) => state.entities.channels.items;


export const getChannelDataMap = (state) => state.channelData;



const getChannelsIdsByServer = createSelector(
  getServersItems, getServerId,
  (items,serverId) => items[serverId]? items[serverId].channels : []
);

// export const getOpenedChannelIdByServer = createSelector([getChannelsIdsByServer,getChannelDataMap],
//   (ids, channelDataMap)=>{
//   map(ids, id=>getChannelData[id])
// });

export const getChannels = createSelector([getChannelsIdsByServer, getChannelsItems], mapItems);

//users______________________________________________________________________________________________
const getUsersItems = state => state.entities.users.items;
const getUsersIds = state => state.entities.users.ids;

export const getUsers = createSelector([getUsersIds, getUsersItems], mapItems);


//typingUsers________________________________________________________________________________________

const getTypingUsersIds = (state, props) => getChannelData(state, props).typingUsers || [];

export const getTypingUsers = createSelector([getTypingUsersIds, getUsersItems], mapItems);

//Messages______________________________________________________________________________________________

export const getMessagesItems = (state) => state.entities.messages.items ||{};
export const getMessagesSlice = (state,props) => getChannelData(state,props).slice || [];
export const getMessagesIds = (state,props) => getChannelData(state,props).ids || [];
const getCurrentUserId = (state, props) => props.currentUserId;
export const getMessagesForChannel = createSelector([getMessagesIds,getMessagesItems], mapItems);

export const getLastOwnMessageId = createSelector([getMessagesForChannel, getCurrentUserId],
  (messages, currentUserId)=>{
    const lastMessage = findLast(messages,m=>m.userId==currentUserId);
    return lastMessage ? lastMessage.id : null;
  }
);
export const getLastNotOwnMessageId = createSelector([getMessagesForChannel, getCurrentUserId],
  (messages, currentUserId)=>{
    const lastMessage = findLast(messages,m=>m.userId!==currentUserId);
    return lastMessage ? lastMessage.id : null;
  }
);

const getLastMessageId = (state,props) => getChannelData(state,props).lastMessage;

//////////////////////////// processMessages
export const DIVIDER_TIME = 'DIVIDER_TIME';
export const DIVIDER_NEW_MESSAGES = 'DIVIDER_NEW_MESSAGES';


export const getMessagesWithDividers = createSelector(
  getMessagesItems, getMessagesSlice,
  (items, ids)=>{
    if(!items || !ids) return [];
    let prevDate;
    let prevUserId;
    const now = moment();
    return reduce(ids, (list, id) => {
      const message = items[id];
      const currentDate = moment(message.createdAt);
      //ADD DIVIDER_TIME
      if(prevDate && !currentDate.isSame(prevDate,'days')){
        const nowDiff = now.diff(prevDate, 'days');
        if(nowDiff>1){
          list.push({ type:DIVIDER_TIME, content:prevDate.format("D MMMM YYYY"), key:message.createdAt+"1" });
        }
        if(nowDiff==1){
          list.push({ type:DIVIDER_TIME, content:"вчера", key:message.createdAt });
        }
      }
      //CHECK MINIMAIZED
      const minimaized = prevUserId == message.userId && currentDate.diff(prevDate, 'm') < 2;

      //ADD MESSAGE
      list.push(minimaized ? {...message, minimaized} : message);

      prevUserId = message.userId;
      prevDate = currentDate;
      return list;
    },[] );
  }
);

function dateDiff(startDate, endDate) {
  endDate.setHours(0);
  startDate.setHours(0);
  const x = Math.floor((endDate.getTime() - startDate.getTime()) / (1000*60*60*24));
  return x;
}
function minDiff(startDate, endDate) {
  console.log('minDiff');
  const x = Math.floor((endDate.getTime() - startDate.getTime()) / (1000*60));
  return x;
}
export const getMessages3 = createSelector(
  getMessagesItems, getMessagesSlice,
  (items, ids)=>{
    if(!items || !ids) return [];

    let prevDate;
    let prevUserId;
    // let yesterdayDividerWasPushed=false;
    // const now = new Date();
    // const yesterday = now.setDate(now.getDate() - 1);

    return reduce(ids, (list, id) => {
      const message = items[id];
      const currentDate = new Date(message.createdAt);

      if(prevDate){
        //ADD DIVIDER_TIME
        if(dateDiff(prevDate,currentDate) >= 1){
          // if(currentDate.getDate() - now.getDate()==1){
          //   console.log('ВЧЕРА');
          //     list.push({ type:DIVIDER_TIME, content:"вчера", key:message.createdAt });
          //
          // }else{
          list.push({ type:DIVIDER_TIME, content:moment(prevDate).format("D MMMM YYYY"), key:message.createdAt+"1" });
          // }


        }
        //ADD DIVIDER_TIME FOR YESTERDAY WORD
        // if(!yesterdayDividerWasPushed){
        //   if(prevDate.isSame(yesterday,'days') && !currentDate.isSame(yesterday,'days')){
        //     yesterdayDividerWasPushed = true;
        //     list.push({ type:DIVIDER_TIME, content:"вчера", key:message.createdAt });
        //   }
        // }
      }
      //CHECK MINIMAIZED
      const minimaized = prevUserId == message.userId && minDiff(prevDate,currentDate) < 2;

      // const minimaized = prevUserId == message.userId && currentDate.diff(prevDate, 'm') < 2;

      //ADD MESSAGE
      list.push(minimaized ? {...message, minimaized} : message);

      prevUserId = message.userId;
      // prevDate = currentDate;
      prevDate = currentDate;
      return list;
    },[] );
  });
