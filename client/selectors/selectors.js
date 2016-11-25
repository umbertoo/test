import find from 'lodash/find';
import { createSelector } from 'reselect';



export const channelsItemsSelector = (state,props) => state.entities.channels.items;

export const serversItemsSelector = (state,props) => state.entities.servers.items;

const getServerId = (state, props) => props.params.serverId;



export const channelsIdsSelector = createSelector(
  serversItemsSelector, getServerId,
  (items,serverId) => items[serverId].channels
);

export const getChannels = createSelector(
  channelsIdsSelector,channelsItemsSelector,
  (ids, items)=>ids.map(id=>items[id])
);
// export const getChannelsByServer = (state,props)=>{
//   return state.entities.servers.items[props.params.serverId]
// }



// export const getChannelsByServer = (servers, serverId) => {
//   return servers[serverId].channels || [];
// };


// export const getGeneralChannelId=(channels)=>{
//   const channel = find(channels,c=>c.isGeneral);
//   return channel ? channel.id : null;
// };

export const getGeneralChannelId = createSelector(
  getChannels,
  (channels)=>{
    const channel = find(channels,c=>c.isGeneral);
    return channel ? channel.id : null;
  }
);

// (state, serverId)=>{
//   const servers = getServers(state);
//   console.log('------servers', servers);
//   const channels = getChannelsByServer(servers, serverId);
//   const channel = ;
//   return channel ? channel.id : null;
// };




// const subtotalSelector = createSelector(
//   shopItemsSelector,
//   items =>
// )
