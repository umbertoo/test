import React, { PropTypes } from 'react';

const ColorItem = ({
  color, selected, onSelect
}) => {
  const onClick = () =>{
    onSelect(color);
  };
  const selectedClass = selected ? '-selected':'';
  return (
    <div
      onClick={onClick}
      style={{backgroundColor:'#'+color}}
      className={"color-picker__item "+selectedClass}/>
    );
  };
  ColorItem.propTypes = {
    selected:PropTypes.bool,
    color:PropTypes.string.isRequired,
    onSelect:PropTypes.func.isRequired
  };
  export default ColorItem;
