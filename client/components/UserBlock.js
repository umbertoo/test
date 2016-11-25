import React, { PropTypes } from 'react';
import Avatar from './Avatar';
import '../static/scss/user-block.scss';

const UserBlock = ({
  name, id, avatar, onClickSettings
}) => {
  return (
    <div className="user-block">
      <div className="user-block__avatar" >
        <Avatar src={avatar}/>
      </div>
      <div className="user-block__name">
        {name} | {id}
      </div>
      <div onClick={onClickSettings}
        className="user-block__settings-btn">
        S
      </div>
    </div>
  );
};
UserBlock.propTypes = {
  name:PropTypes.string,
  id:PropTypes.number,
  avatar:PropTypes.string,
  onClickSettings:PropTypes.func,
};
export default UserBlock;
