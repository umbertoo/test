import React, { Component, PropTypes } from 'react';
import Input from '../components/Input';
import Upload from 'rc-upload';
import ImageInput from '../components/ImageInput';
import Avatar from '../components/Avatar';
import {imageHeaders} from '../actions/common/API/API';

class UserForm extends Component {
  state={
    ...this.props.user
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({...nextProps.user});
    }
  }
  onChange=(e)=>{
    const {name,  email, avatar, id } = this.state;
    this.props.onChange({name,  email, avatar, id });
  }
  onNameChange=(e)=>{
    this.setState({ name:e.target.value });
  }
  render(){
    const { name,  email, avatar, id } = this.state;
    return (
      <div className="user-form">
        <Input
          onChange={this.onNameChange}

          onBlur={this.onChange}
          name="name"
          value={name}
          label={'имя пользователя'}/>
        <Input
          disabled
          name="email"
          type="email"
          value={email}
          label={'email'}/>
        <div className="user-avatar">
          <Upload
            action={"/api/user/avatar"}
            name="avatar"
            onStart={this.props.onStartUploadAvatar}
            onSuccess={this.props.onSuccessUploadAvatar}
            onError={this.props.onErrorUploadAvatar}
            headers={imageHeaders}>
            <ImageInput isEmpty={!!avatar}>
              <Avatar src={avatar} />
            </ImageInput>

          </Upload>
        </div>
        <input type="button" value="Готово"/>
      </div>
        );
      }
    }
    UserForm.propTypes = {

    };
    export default UserForm;
