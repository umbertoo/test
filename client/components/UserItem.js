import React, { Component, PropTypes } from 'react';
import '../static/scss/user-item.scss';
import Avatar from './Avatar';

const UserItem = ({
  avatar, name, isOnline
}) => {
  return(
    <div className="user-item">
      <div className="user-item__avatar">
        <Avatar src={avatar}/>
      </div>
      <div className="user-item__name">{name}</div>
      <div className="user-item__indicator">{isOnline}</div>
    </div>
  );
};
UserItem.propTypes = {
  name:PropTypes.string,
  avatar:PropTypes.string,
  isOnline:PropTypes.bool
};
export default UserItem;
