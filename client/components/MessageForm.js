import React, { Component } from 'react';
import '../static/scss/message-form.scss';
import autoBind from 'react-autobind';
import MessageTextArea from './MessageTextArea';

class MessageForm extends Component {
    constructor(props){
        super(props);
        autoBind(this);
    }

    render(){
        return (
            <div ref={c=>this.form=c}  className="message-form">
                <div className="message-form__add-btn">+</div>
                <MessageTextArea
                  onEnterKey={this.props.onSubmit}
                  onChangeHeight={this.props.onChangeHeight}/>
            </div>
        );
    }
}

export default MessageForm;
