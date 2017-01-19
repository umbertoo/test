import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import autoBind from 'react-autobind';
import Tabs from '../components/Tabs';
import SortableRolesList from '../components/RolesList';
import Tab from '../components/Tabs/Tab';
import RoleForm from '../components/RoleForm';

class ServerRolesContainer extends Component {
  componentDidMount(){
    this.props.fetchPermissions();
  }
  onClickRole = (role) => {
    this.props.selectRole(role.id);
  }
  onSortEnd = ({oldIndex, newIndex})=> {
    const {serverId} = this.props;
    this.props.editRolesOrder(oldIndex, newIndex, serverId);
  }
  onClickAddRole = () =>{
    const {serverId} = this.props;
    this.props.createRole('new role', serverId);
  }
  onClickDeleteRole = (roleId) =>{
    const {serverId} = this.props;
    this.props.deleteRoleWithConfirm(roleId,serverId);

  }
  onRoleFormChange=(role)=>{
    console.log('onRoleFormChange',role);
    const {serverId} = this.props;
    this.props.editRole(role, serverId);
  }
  render(){
    const tabPaneStyle={
      backgroundColor:'#fff',
      height:'400px'
    };
    const {
      roles, selectedRole, permissions, rolePermissions
    } = this.props;
    const disableSorting = false;
    return (
      <div style={{height:'100%'}} className="roles-block">
        <SortableRolesList
          shouldCancelStart={()=>disableSorting?true:undefined}
          distance={4}
          onSortEnd={this.onSortEnd}
          lockAxis="y"
          roles={roles}
          selectedItem={selectedRole.id}
          onClickRole={this.onClickRole} >
          <div className="roles-block__header">
            <div className="roles-block__title">
              roles-block
            </div>
            <div onClick={this.onClickAddRole}
              className="roles-block__add-btn">
              +
            </div>
          </div>
        </SortableRolesList>
        {selectedRole &&
          <RoleForm
            onClickDeleteRole={this.onClickDeleteRole}
            onChange={this.onRoleFormChange}
            role={selectedRole}
            style = {{height:'100%' }}
            permissions={permissions}/>
        }
      </div>
      );
    }
  }

  const mapStateToProps = (state, props) =>{
    const {
      roles:order=[]
    } = state.entities.servers.items[props.serverId] || {};
    const { items } = state.entities.roles;
    const roles = order.map(id => items[id]);

    const {
      ids=[]
    } = state.entities.permissions || {};
    const permissions = ids.map(id => state.entities.permissions.items[id]);

    const {selectedRole} = state.ui;

    const selectedRoleId = selectedRole || order[0];
    return {
      roles,
      permissions,
      selectedRole: items[selectedRoleId]
    };
  };

  export default connect(mapStateToProps, Actions)(ServerRolesContainer);
