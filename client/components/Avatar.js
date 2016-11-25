import React, { PropTypes } from 'react';
import '../static/scss/avatar.scss';
import merge from 'lodash/merge';
const ICONS_PATH = '/icons/';

const Avatar = ({
  src, style
}) => {
  const defStyle = {
    backgroundImage:'url("'+ICONS_PATH+src+'")'
  };
  const newStyle = merge({},defStyle, style);
  return (
    <div className="avatar"
      style={newStyle}/>
    );
  };

  Avatar.defaultProps = {
    style:{}
  };
  Avatar.propTypes = {
    style:PropTypes.object,
    src:PropTypes.string
  };
  export default Avatar;
