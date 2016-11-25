import React, { Component } from 'react';
import '../static/scss/servers-list.scss';
import ServerItem from './ServerItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';

const SortableServerItem = SortableElement(ServerItem);

const ServersList =({
  order, servers, onSelectServer, selectedItem, children
})=>{
  return (
    <Scrollbars
      className="servers-list">
      {order.map((id, i)=>
        <SortableServerItem
          index={i}
          isSelected={selectedItem==id}
          onClick={onSelectServer}
          key={id}
          hideName={!!servers[id].icon}
          server={servers[id]}/>
      )}
      {children}
    </Scrollbars>
    );
  };

  export default SortableContainer(ServersList);
