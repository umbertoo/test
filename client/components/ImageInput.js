import React, { PropTypes } from 'react';
import '../static/scss/image-input.scss';

const ImageInput = ({
  imagePath, isEmpty, style, children
}) => {
  const emptyClass = isEmpty? '-empty' : '';
  return (
    <div className={"image-input "+ emptyClass}
      style={style}>
      <div className="image-input__filter"/>
      {isEmpty
        ? children
          : <div className="image-input__noimage">NO ICON</div>
      }
    </div>
  );
};
ImageInput.propTypes = {
  isEmpty:PropTypes.bool,
  imagePath:PropTypes.string,
  style:PropTypes.object
};
export default ImageInput;
