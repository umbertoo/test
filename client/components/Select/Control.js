import React, { PropTypes } from 'react';
import Input from 'react-input-autosize';

const Control = ({
  value, clearable, onClickClear, onMouseDown, onInputChange,
  inputValue, refBlock, onClick, showValue, children
}) => {
  return (
    <div className="xselect__control"
      onClick={onClick}
      onMouseDown={onMouseDown}
      ref={refBlock}>
      {children}
      {showValue &&
        <div className="xselect__value"> {value} </div>
      }
      {clearable &&
        <div className="xselect__clear-btn"
          onClick={onClickClear}>
          ×
        </div>
      }
      <div className="xselect__arrow-place">
        <div className="xselect__arrow"/>
      </div>
    </div>
  );
};
Control.propTypes = {

};
export default Control;
