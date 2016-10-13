import React, { Component } from 'react';
import '../static/scss/server-item.scss';

class ServerItem extends Component {
  render(){
    const {server:{name,id}, isSelected,onClick}= this.props;
    return (
      <div
        onClick={onClick.bind(this, id)}
        className={"server-item "+(isSelected?'-active':'')}>
        {name}
      </div>
    );
  }
}

export default ServerItem;
