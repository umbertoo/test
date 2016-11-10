import React, { Component } from 'react';
import autoBind from 'react-autobind';

class CreateChannelForm extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={

    };
  }
  render(){
    return (
      <form action="" ref={this.props.formRef}>
        <div>
          <input type="text" name="name"/>
          <input type="text" name="description"/>

        </div>
      </form>
    );
  }
}

export default CreateChannelForm;
