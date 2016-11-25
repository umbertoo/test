import React, { PropTypes } from 'react';
import RoleItem from './RoleItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Scrollbars } from 'react-custom-scrollbars';
import '../static/scss/roles-list.scss';

const SortableRoleItem = SortableElement(RoleItem);

const RolesList = ({
  roles, onClickRole, selectedItem, children
}) => {
  return (
    <div className="roles-list">
      { children }
      <Scrollbars className="roles-list__scroll" >
        {roles.map((role,i)=>
          <SortableRoleItem
            selected={selectedItem==role.id}
            index={i}
            onClick={onClickRole}
            key={role.id}
            role={role}
        />
        )}
      </Scrollbars>
    </div>
  );
};
RolesList.propTypes = {

};
export default SortableContainer(RolesList);
