import React, { Component, PropTypes } from 'react';
import '../static/scss/xinput.scss';


class Input extends Component {
  render(){
    const {
      value, onChange, onBlur, name, label, placeholder, type, disabled
    } = this.props;
    return (
      <div className="xinput">
        <label htmlFor={name} className="xinput__label">
          {label}
        </label>
        <input type={type}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          id={name}
          placeholder={placeholder}
          name={name}
          className="xinput__input"/>
      </div>
      );
    }
  }
  Input.defaultProps={
    type:'text'
  };
  Input.propTypes={
    type:PropTypes.string,
    onChange:PropTypes.func,
  };
  export default Input;
