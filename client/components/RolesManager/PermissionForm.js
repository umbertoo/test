import React, { Component } from 'react';
import PermissionItem from './PermissionItem';
import autoBind from 'react-autobind';
import './scss/xpermission-item.scss';

class PermissionForm extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      name:null,
      actionId:null,
      attributeId:null,
      resourceId:null,
    };
  }
  onChange({ actionId, attributeId, resourceId, name }){
    console.log('onChange PermissionForm',actionId, attributeId, resourceId, name);
    this.setState({ actionId, attributeId, resourceId, name });
    // this.props.onPermissionChange
  }
  onSave(){
    this.props.onSave(this.state);
    this.setState({
      name:null,
      actionId:null,
      attributeId:null,
      resourceId:null
    });
  }
  render(){
    const { actions, resources, attributes } = this.props;
    return (<div className="xpermission-form">
      <PermissionItem
        isDeletable={false}

        onChange={this.onChange}

        onCreateAction={this.props.onCreateAction}
        onCreateResource={this.props.onCreateResource}
        onCreateAttribute={this.props.onCreateAttribute}

        onDeleteAction={this.props.onDeleteAction}
        onDeleteResource={this.props.onDeleteResource}
        onDeleteAttribute={this.props.onDeleteAttribute}
        permission={this.state}
        actions={actions}
        resources={resources}
        attributes={attributes}
    />
      <input className="xpermission-form__save-btn" type="button"
        value="save"
        onClick={this.onSave}/>
      <input className="xpermission-form__cancel-btn" type="button"
        value="cancel"
        onClick={this.props.onCancel}/>

    </div>);
  }
}

export default PermissionForm;
