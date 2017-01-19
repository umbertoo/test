import React, { Component } from 'react';
import '../static/scss/servers-list.scss';
import ServerItem from './ServerItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';
import map from 'lodash/map';
const SortableServerItem = SortableElement(ServerItem);

const ServersList =({
  servers, onSelectServer, selectedItem, children
})=>{
  return (
    <Scrollbars
      className="servers-list">
      {map(servers,(server, i)=>
        <SortableServerItem
          index={i}
          isSelected={selectedItem==server.id}
          onClick={onSelectServer}
          key={server.id}
          hideName={!!server.icon}
          server={server}/>
      )}
      {children}
    </Scrollbars>
    );
  };

  export default SortableContainer(ServersList);
