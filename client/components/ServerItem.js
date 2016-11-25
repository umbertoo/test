import React, { Component, PropTypes } from 'react';
import '../static/scss/server-item.scss';

const ServerItem = ({
  server:{name,id, icon}, isSelected, onClick, hideName
}) => {
  return (
    <div
      onClick={onClick.bind(this, id)}
      className={"server-item "+(isSelected?'-active':'')} >
      <div className="server-item__icon"
        style={{backgroundImage:'url("/icons/'+icon+'")'}} >
        {!hideName &&  <span className="server-item__name">{name}</span>}
      </div>

    </div>
    );
  };
  ServerItem.propTypes = {
    hideName:PropTypes.bool,
    isSelected:PropTypes.bool,
    onClick:PropTypes.func,
    server:PropTypes.object
  };
  ServerItem.defaultProps = {
    hideName:false,
    isSelected:false
  };
  export default ServerItem;
