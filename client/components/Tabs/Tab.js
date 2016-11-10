import React, { PropTypes } from 'react';

const Tab = ({
  label, value, children, style
}) => {
  return (
    <div style={style}>{children}</div>
  );
};
Tab.propTypes  = {
  label:PropTypes.string.isRequired
};
export default Tab;
