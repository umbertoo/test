import React, { Component } from 'react';
import RolesList from './RolesList';
import ServersList from './ServersList';
import PermissionsList from './PermissionsList';
import PermissionForm from './PermissionForm';
import RoleForm from './RoleForm';
import autoBind from 'react-autobind';
import { normalize, arrayOf } from "normalizr";
import * as schemas from "../../actions/common/schemas";
import {
  SortableContainer,
   SortableElement,
    arrayMove
  } from 'react-sortable-hoc';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'JWT '+localStorage.getItem('token')
};

class RolesContainer extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      roles:{}, actions:{}, resources:{}, attributes:{}, permissions:{}
    };
  }
  componentDidMount(){
    fetch('/api/permissions',{headers}).then(res=>res.json()).then(permissions=>{
      console.log(permissions);
      const res = normalize(permissions,arrayOf(schemas.permission));
      console.log(res);
      this.setState({...this.state, ...res.entities, permissionsIds:res.result});
    });
    fetch('/api/actions',{headers})
    .then(res=>res.json()).then(actions=>{
      const res = normalize(actions, arrayOf(schemas.action));
      console.log(res);
      this.setState({...this.state, ...res.entities, actionsIds:res.result});
    });
    fetch('/api/resources', {headers})
    .then(res=>res.json()).then(resources=>{
      const res = normalize(resources, arrayOf(schemas.resource));
      console.log(res);
      this.setState({...this.state, ...res.entities, resourcesIds:res.result});

    });
    fetch('/api/attributes', {headers})
    .then(res=>res.json()).then(attributes=>{
      const res = normalize(attributes, arrayOf(schemas.attribute));
      console.log(res);
      this.setState({...this.state, ...res.entities, attributesIds:res.result});
    });
  }
  onPermissionChange(values, type){


    fetch('/api/permissions/'+values.id,
    {method:'PUT', headers, body:JSON.stringify(values)})
    .then(res=>res.json()).then(permission=>{
      const res = normalize(permission, schemas.permission);
      console.log(res);
      // this.setState({...this.state, ...res.entities, permissionsIds:res.result});
    });
  }
  onCreateAction({value}){
    console.log('onCreateAction', value);
    fetch('/api/actions',
    {method:'POST', headers, body:JSON.stringify({name:value})})
    .then(res=>res.json()).then(action=>{
      const res = normalize(action, schemas.action);
      console.log('onCreateAction', res);
      this.setState({
        actions: {...this.state.actions, ...res.entities.actions}
      });
      // this.setState({...this.state, ...res.entities, permissionsIds:res.result});
    });
  }
  onCreateResource({value}){
    console.log('onCreateResource', value);
    fetch('/api/resources',
    {method:'POST', headers, body:JSON.stringify({name:value})})
    .then(res=>res.json()).then(resource=>{
      const res = normalize(resource, schemas.resource);
      console.log('onCreateResource', res);
      this.setState({
        resources: {...this.state.resources, ...res.entities.resources}
      });
      // this.setState({...this.state, ...res.entities, permissionsIds:res.result});
    });
  }
  onCreateAttribute({value}){
    console.log('onCreateAttribute', value);
    fetch('/api/attributes',
    {method:'POST', headers, body:JSON.stringify({name:value})})
    .then(res=>res.json()).then(attribute=>{
      const res = normalize(attribute, schemas.attribute);
      console.log('onCreateAttribute', res);
      this.setState({

        attributes: {...this.state.attributes, ...res.entities.attributes}
      });
      // this.setState({...this.state, ...res.entities, permissionsIds:res.result});
    });
  }
  onDeleteAction(){
    console.log('onDeleteAction');
  }
  onDeleteResource(){
    console.log('onDeleteResource');
  }
  onDeleteAttribute(){
    console.log('onDeleteAttribute');
  }
  onDeletePermission(id){
    console.log('onDeletePermission', id);
    fetch('/api/permissions/'+id,
    {method:'DELETE', headers})
    .then(res=>res.json()).then(result=>{
      this.setState({permissionsIds:this.state.permissionsIds.filter(e=>e!=id)});
      console.log('onDeletePermission', result);
    });
  }
  onSortEnd({oldIndex, newIndex,...rest}) {
    // console.log('onSortEnd',oldIndex, newIndex,rest);
    this.setState({
      permissionsIds: arrayMove(this.state.permissionsIds, oldIndex, newIndex)
    },()=>{
      const piece = oldIndex < newIndex
      ?this.state.permissionsIds.slice(oldIndex, newIndex+1)
      :this.state.permissionsIds.slice(newIndex, oldIndex+1);
      let index = oldIndex < newIndex
      ? oldIndex
      : newIndex;
      const orderData = piece.map(e=>({id:e, order: ++index}));
      fetch('/api/permissions/order',{
        method:'PATCH', headers, body:JSON.stringify({order:orderData})
      })
      .then(res=>res.json()).then(result=>{
        // const res = normalize(resource, schemas.resource);
        console.log('result!!!!!!!!!!', result);
        // this.setState({...this.state, ...res.entities, permissionsIds:res.result});
      });
    });

  }
  onSavePermissionForm(data){
    fetch('/api/permissions',{method:'POST', headers, body:JSON.stringify({...data})})
    .then(res=>res.json()).then(permission=>{
      const res = normalize(permission, schemas.permission);
      console.log(res);
      console.log({ permissions: {...this.state.permissions, ...res.entities.permissions}});
      this.setState({
        permissions: {...this.state.permissions, ...res.entities.permissions},
        permissionsIds: [...this.state.permissionsIds, res.result]
      });
    });
  }
  render(){
    const { roles, actions, resources, attributes, permissions,permissionsIds} = this.state;
    // console.log('permissions',permissions); dssd
    return (
      <div>
        {/* <h1>RolesContainer</h1> */}


        <PermissionsList
          distance={4}
          // pressDelay={50}
          lockAxis="y"
          onSortEnd={this.onSortEnd}
          onCreateAction={this.onCreateAction}
          onCreateResource={this.onCreateResource}
          onCreateAttribute={this.onCreateAttribute}

          onDeleteAction={this.onDeleteAction}
          onDeleteResource={this.onDeleteResource}
          onDeleteAttribute={this.onDeleteAttribute}
          onDeletePermission={this.onDeletePermission}
          onPermissionChange={this.onPermissionChange}
          order={permissionsIds}
          actions={actions}
          resources={resources}
          attributes={attributes}
          permissions={permissions} />
        <PermissionForm
          onPermissionChange={this.onPermissionChange}
          onSave={this.onSavePermissionForm}

          onCreateAction={this.onCreateAction}
          onCreateResource={this.onCreateResource}
          onCreateAttribute={this.onCreateAttribute}

          onDeleteAction={this.onDeleteAction}
          onDeleteResource={this.onDeleteResource}
          onDeleteAttribute={this.onDeleteAttribute}

          actions={actions}
          resources={resources}
          attributes={attributes}
      />
        <RoleForm />
      </div>
    );
  }
}

export default RolesContainer;
