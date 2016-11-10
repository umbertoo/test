import React, { PropTypes } from 'react';
import '../static/scss/user-block.scss';

const UserBlock = ({
  user
}) => {
  return (
    <div className="user-block">
      <span>user.name {user.name}</span> <br/>
      <span>user.id {user.id}</span> <br/>
      <img src={user.avatar}/>
    </div>
  );
};
UserBlock.propTypes = {
  user:PropTypes.object
};
export default UserBlock;
