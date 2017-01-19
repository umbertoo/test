import React, { Component, PropTypes } from 'react';
import Input from '../components/Input';
import Upload from 'rc-upload';
import ImageInput from '../components/ImageInput';
import {imageHeaders} from '../actions/common/API/API';
import Avatar from '../components/Avatar';

class ServerForm extends Component {
  state = { ...this.props.server }

  componentWillReceiveProps(nextProps) {
    if (nextProps.server !== this.props.server) {
      this.setState({...nextProps.server});
    }
  }
  onChange=(e)=>{
    const { name, description, icon, id } = this.state;
    this.props.onChange({ name, description, icon, id });
  }
  onInputChange=(e)=>{
    const {name, value} = e.target;
    this.setState({ [name]:value });
  }
  render(){
    const { name, description, icon, id } = this.state;
    return (
      <div className="server-form">
        <h1>{name}</h1>
        
        <Input
          onBlur={this.onChange}
          onChange={this.onInputChange}
          name="name"
          value={name}
          label={'название сервера'}/>
        <Input
          onBlur={this.onChange}
          onChange={this.onInputChange}
          name="description"
          value={description}
          label={'описание сервера'}/>
        <div className="server-icon">
          <Upload
            action={"/api/servers/"+id+"/icon"}
            name="avatar"
            onStart={this.props.onStartUploadIcon}
            onSuccess={this.props.onSuccessUploadIcon}
            onError={this.props.onErrorUploadIcon}
            headers={imageHeaders}>
            <ImageInput isEmpty={!!icon}>
              <Avatar src={icon} />
            </ImageInput>
          </Upload>
        </div>
        <input onClick={()=>{}}
          type="button"
          value="Удалить"/>
        <input type="button" value="Готово"/>
      </div>
          );
        }
      }
      ServerForm.propTypes = {

      };
      export default ServerForm;
