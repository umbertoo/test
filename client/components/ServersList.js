import React, { Component } from 'react';
import map from 'lodash/map';
import '../static/scss/servers-list.scss';
import ServerItem from './ServerItem';
class ServersList extends Component {
  render(){
    const { order, servers, onSelectServer, selectedItem} = this.props;
    return (
      <div className="servers-list">
        {order.map(id=>
          <ServerItem isSelected={selectedItem==id} onClick={onSelectServer} key={id} server={servers[id]}/>
        )}
      </div>);
    }
  }

  export default ServersList;
