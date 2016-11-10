import React, { Component } from 'react';
import map from 'lodash/map';
import '../static/scss/servers-list.scss';
import ServerItem from './ServerItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';

const SortableServerItem = SortableElement(ServerItem);

class ServersList extends Component {
  render(){
    const {
      order, servers, onSelectServer, selectedItem
    } = this.props;
    return (
      <Scrollbars
        className="servers-list"
        ref={c=>this.scrollView=c} >
        {order.map((id, i)=>
          <SortableServerItem
            index={i}
            isSelected={selectedItem==id}
            onClick={onSelectServer}
            key={id}
            server={servers[id]}/>
        )}
      </Scrollbars>
    );
    }
  }

  export default SortableContainer(ServersList);
