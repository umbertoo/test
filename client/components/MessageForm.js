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
                <MessageTextArea
                  onTyping={this.props.onTypingMessage}
                  onEnterKey={this.props.onSubmit}
                  onChangeHeight={this.props.onChangeHeight}/>
                <div className="message-form__add-btn">+</div>
            </div>
        );
    }
}

export default MessageForm;
