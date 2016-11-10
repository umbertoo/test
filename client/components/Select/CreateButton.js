import React, { PropTypes } from 'react';

const CreateButton = ({text, onClick}) => {
    return (
      <div className="xselect__create-btn"
        onClick={onClick}>
        Создать "{text}"
      </div>
    );
};

CreateButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

export default CreateButton;
