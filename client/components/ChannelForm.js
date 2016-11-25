import React, { Component, PropTypes } from 'react';
import Input from '../components/Input';

class ChannelForm extends Component {
  state = { ...this.props.channel }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channel !== this.props.channel) {
      this.setState({...nextProps.channel});
    }
  }
  onChange=(e)=>{
    const { name, description, id } = this.state;
    this.props.onChange({ name, description, id });
  }
  onInputChange=(e)=>{
    const {name, value} = e.target;
    this.setState({ [name]:value });
  }
  render(){
    const { name, description, id, isGeneral } = this.state;
    const { onDeleteChannel } = this.props;
    return (
      <div className="channel-form">
        <h1>{name}</h1>
        <Input
          onBlur={this.onChange}
          onChange={this.onInputChange}
          label={'название канала'}
          name="name"
          value={name} />
        <Input
          onBlur={this.onChange}
          onChange={this.onInputChange}
          label={'описание канала'}
          name="description"
          value={description} />
        {!isGeneral && <input onClick={onDeleteChannel} type="button" value="Удалить"/>}
        <input  type="submit" value="Готово"/>
      </div>
      );
    }
  }
  ChannelForm.propTypes = {

  };
  export default ChannelForm;
