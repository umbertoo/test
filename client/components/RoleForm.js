import React, { Component } from 'react';
import Checkbox from './Checkbox';
import { Scrollbars } from 'react-custom-scrollbars';
import ColorPicker from './ColorPicker';
import '../static/scss/roles-form.scss';
import '../static/scss/permission-item.scss';
import Input from '../components/Input';
import union from 'lodash/union';
import without from 'lodash/without';

const getCheckingArray = (array,value, isChecked)=>{
  return isChecked ? union(array,[value]) : without(array,value);
};


class RoleForm extends Component {
  state={...this.props.role}

  componentWillReceiveProps(nextProps) {
    if (nextProps.role !== this.props.role) {
      this.setState({...nextProps.role});
    }
  }
  onChangePermission = ({checked, value}) =>{
    const { permissions } = this.state;
    this.setState({
      permissions: getCheckingArray(permissions, value, checked)
    }, this.onChange);
  }
  onChange =()=>{
    const {permissions, name, color, id} = this.state;
    this.props.onChange({permissions, name, color, id});
  }
  onChangeColor = (color) =>{
    this.setState({ color }, this.onChange);
  }
  onNameChange = (e) =>{
    this.setState({ name:e.target.value });
  }
  render(){
    const {
      permissions:allPermissions, style, role
    } = this.props;
    const {
      permissions, name, color
    } = this.state;
    return (
      <div className="roles-form"
        style={style}>
        <Scrollbars>
          <div className="roles-form__inner">
            <Input
              onBlur={this.onChange}
              onChange={this.onNameChange}
              name="name"
              label={'название роли'}
              value={name}
            />
            <br/>
            <br/>
            <ColorPicker
              selectedColor={color}
              onChange={this.onChangeColor}/>
            {allPermissions.map(p=>
              <div className="permission-item" key={p.id}>
                <div className="permission-item__checkbox">
                  <Checkbox
                    size={20}
                    value={p.id}
                    checked={permissions.some(id=>p.id==id)}
                    onChange={this.onChangePermission}>
                    {p.name}
                  </Checkbox>
                </div>
              </div>
            )}
            <br/>
            <input onClick={this.props.onClickDeleteRole.bind(null,role.id)}
              type="button" value="Удалить роль" />
          </div>
        </Scrollbars>

      </div>);
        }
      }

      export default RoleForm;
