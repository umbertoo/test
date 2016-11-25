import React, { Component, PropTypes } from 'react';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import UserItem from './UserItem';

const UserList = ({
  users, usersOnline
}) => {
  const list = map(usersOnline,id=>users[id]);
  return (
    list.length ?<div className="user-list">
      UserList
      {map(list,user=>
        <UserItem key={user.id}
          avatar={user.avatar}
          name={user.name}
          isOnline />
      )
      }
    </div>:null
  );
};
UserList.propTypes = {

};
export default UserList;
