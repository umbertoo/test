import React, { Component, PropTypes } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

class AddServerForm extends Component {
  state = {
    link:''
  }
  onInputChange=({target:{value, name}})=>{

    this.setState({ [name]:value });
  }
  render(){
    const { cancelBtn } = this.props;
    const { link } = this.state;
    return (
      <div>
        <h1>Добавить новый сервер</h1>
        <Input name="link"
          onChange={this.onInputChange}
          value={link}
          label="инвайт"
      />
        { cancelBtn }
        <Button>Войти</Button>

      </div>
    );
  }
}
AddServerForm.propTypes = {

};
export default AddServerForm;
