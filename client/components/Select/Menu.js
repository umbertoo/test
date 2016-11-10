import React, {PropTypes} from 'react';
import OptionsList from './OptionsList';
import CreateButton from './CreateButton';

const Menu = ({
  selectedValue, onSelect,
  onDelete, options, deletableOptions, width, children
}) => {
    return (
      <div className="xselect__menu"
        style={{width: width+'px'}}>
        {children}
        <OptionsList
          deletableOptions={deletableOptions}
          selectedValue={selectedValue}
          onSelect={onSelect}
          onDelete={onDelete}
          options={options}/>
      </div>
    );
};

export default Menu;
