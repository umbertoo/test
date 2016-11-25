import React, { Component, PropTypes } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

class CreateServerForm extends Component {
  state = {
    name:''
  }
  onInputChange=({target:{value, name}})=>{
    console.log('sss',value, name);
    this.setState({ [name]:value });
  }
  onSubmit=()=>{
    this.props.onSubmit(this.state);
  }
  render(){
    const { name } = this.state;
    const { cancelBtn } = this.props;
    return (
      <div>
        <h1>Создать свой сервер</h1>
        Создав сервер, вы получите доступ к бесплатным
        голосовым и текстовым чатам для общения с друзьями.
        <Input name="name"
          onChange={this.onInputChange}
          value={name}
          label="название сервера"
        />
        { cancelBtn }
        <Button onClick={this.onSubmit}>Создать</Button>
      </div>
    );
  }
}
CreateServerForm.propTypes = {

};
export default CreateServerForm;
