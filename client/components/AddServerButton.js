import React, { PropTypes } from 'react';

const AddServerButton = ({
  onClick
}) => {
    return (
      <button
        onClick={onClick}
        className="servers-list__add-btn"
        >+</button>
    );
};
AddServerButton.propTypes = {

};
export default AddServerButton;
