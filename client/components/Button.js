import React, { Component,PropTypes } from 'react';
import '../static/scss/xbutton.scss';

const Button = ({
  onClick, color, children
}) => {
  return (
    <button
      style={{backgroundColor:color}}
      className="xbutton" onClick={onClick}>
      <div className="xbutton__shaddow"/>
      {children}
    </button>
    );
  };
  Button.propTypes = {
    onClick:PropTypes.func,
    color:PropTypes.string
  };

export default Button;
