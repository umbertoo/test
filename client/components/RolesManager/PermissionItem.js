import React, { Component } from 'react';
import { Creatable } from 'react-select';

import autoBind from 'react-autobind';
import map from 'lodash/map';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import 'react-select/dist/react-select.css';
import './scss/permission-item.scss';
import Select from '../Select';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


class PermissionItem extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state = {
      actionId: props.permission.actionId,
      resourceId: props.permission.resourceId,
      attributeId: props.permission.attributeId,
      name: props.permission.name,
      id:props.permission.id
    };
    // this.onChange = props.onChange && debounce(props.onChange,400);

    this.onChange = debounce(this.props.onChange,400);
  }
  getOptions(items){
    return map(items, e=> ({ value: e.id, label: e.name }));
  }
  onChangeSelect(type, data){
    this.setState({
      [type+'Id']:data ? data.value : data
    },()=>{
      this.props.onChange(this.state, type);
    });
  }
  onChangeName(e){
    this.setState({
      name:e.target.value
    },()=>{
      this.onChange(this.state, 'name');
    });
  }
  onDeleteClick(){
    this.props.onDeletePermission(this.props.permission.id);
  }
  render(){
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const { actions, resources, attributes, permission, isDeletable } = this.props;
    const { actionId, resourceId, attributeId, name } = this.state;
    const selectStyle = { width:'200px', display:'inline-block' };

    return (
      <div className="permission-item">

        {/* name: */}
        <input className="permission-item__name" onChange={this.onChangeName} value={name}  type="text" />
        <span style={selectStyle}>
          <Select
            value={actionId}
            clearable={false}
            deletableOptions
            onDeleteOption={this.props.onDeleteAction}

            options={this.getOptions(actions)}
            onCreate={this.props.onCreateAction}
            onChange={this.onChangeSelect.bind(this, 'action')}/>
        </span>
        <span style={selectStyle}>
          <Select
            value={resourceId}
            clearable={false}
            deletableOptions
            onDeleteOption={this.props.onDeleteResource}
            options={this.getOptions(resources)}
            onCreate={this.props.onCreateResource}
            onChange={this.onChangeSelect.bind(this, 'resource')}/>

        </span>
        <span style={selectStyle}>
          <Select
            value={attributeId}
            deletableOptions
            options={this.getOptions(attributes)}
            onDeleteOption={this.props.onDeleteAttribute}
            onCreate={this.props.onCreateAttribute}
            onChange={this.onChangeSelect.bind(this, 'attribute')}/>
        </span>
        {/* <span style={selectStyle}>
          <Creatable
          name="form-field-name"
          value={attributeId}
          options={this.getOptions(attributes)}
          onChange={this.onChangeSelect.bind(this, 'attribute')}   />
        </span> */}
        {isDeletable &&
          <input type="button" onClick={this.onDeleteClick} value="delete"/>
        }
        #{permission.id}
      </div>
    );
  }
}
PermissionItem.defaultProps={
  permission:{
    action:null,
    resource:null,
    attribute:null,
    name:""
  },
  isDeletable:true,
  onChange:()=>{}
};

export default PermissionItem;
