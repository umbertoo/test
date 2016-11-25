import React, { PropTypes } from 'react';

const RoleItem = ({
  role, onClick, selected
}) => {
  const handleClick = (e)=>{
    onClick(role);
  };
  const activeClass = selected ? '-active' : '';
  return (
    <div className={"roles-list__item "+ activeClass}
      onClick={handleClick}>
      {role.name}
    </div>
  );
};
RoleItem.propTypes = {

};
export default RoleItem;
