import React, { Component } from 'react';

import update from 'react/lib/update';
import map from 'lodash/map';
import PermissionItem from './PermissionItem';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import  './scss/xpermissions-list.scss';

const SortablePermissionItem = SortableElement(PermissionItem);

class PermissionsList extends Component {
  render(){
    const { actions, resources, attributes, permissions, order=[] } = this.props;
    return (
      <div className="xpermissions-list">
        <h2>permissions:</h2>
        {order.map((e,i)=>
          <SortablePermissionItem
            index={i}
            onChange={this.props.onPermissionChange}
            onCreateAction={this.props.onCreateAction}
            onCreateResource={this.props.onCreateResource}
            onCreateAttribute={this.props.onCreateAttribute}
            onDeleteAction={this.props.onDeleteAction}
            onDeleteResource={this.props.onDeleteResource}
            onDeleteAttribute={this.props.onDeleteAttribute}
            onDeletePermission={this.props.onDeletePermission}
            key={e}
            actions={actions}
            resources={resources}
            attributes={attributes}
            permission={permissions[e]}/>
          )
        }
      </div>
  );
}
}

export default SortableContainer(PermissionsList);
