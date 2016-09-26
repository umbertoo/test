import React, { Component } from 'react';
import EmojiPicker from './EmojiPicker';
import DropDown from './DropDown';
import autosize from 'autosize';
import autoBind from 'react-autobind';
import '../static/scss/message-textarea.scss';


class MessageTextArea extends Component {
  constructor(props){
      super(props);
      autoBind(this);
  }
  componentDidMount() {
      autosize(this.messageInput);
      this.messageInput.addEventListener('autosize:resized',
      this.onInputResize);
  }
  componentWillUnmount(){
      this.messageInput.removeEventListener('autosize:resized',
      this.onInputResize);
  }
  onInputResize(e){
      // console.log('onInputResize',e);
      this.props.onChangeHeight(e.target.parentNode.offsetHeight);
  }
  inpuKeyDown(e){
    //on Ctrl+Enter
      if (e.keyCode == 13 && e.ctrlKey) {
          e.preventDefault();
          this.messageInput.value+='\n';
          const event = document.createEvent('Event');
          event.initEvent('autosize:update', true, false);
          this.messageInput.dispatchEvent(event);
      }
        //on Enter
      if (e.keyCode == 13 && !e.ctrlKey) {
        this.props.onEnterKey(this.messageInput.value);
        this.messageInput.value='';
      }
  }
  onSelectEmoji(shortname){
      const el = this.messageInput;
      const{selectionStart,selectionEnd,value}=this.messageInput;

      const before = value.substring(0, selectionStart);
      const after  = value.substring(selectionEnd, value.length);
      el.value = (before +" "+ shortname+" "+after);
      el.selectionStart = el.selectionEnd = selectionStart + shortname.length+2;

      // this.messageInput.value += ` ${shortname} `;
      this.messageInput.focus();
  }

    render(){
        return (
            <div className="message-textarea">
                <textarea
                  rows={1}
                  onKeyDown={this.inpuKeyDown}
                  ref={c=>this.messageInput=c}
                  className="message-textarea__input"
                  name="message"
                  type="text"
                  defaultValue=""/>
                <div className="message-textarea__emoji">
                    <DropDown
                      menuOffset={'15px 0'}
                      menuAttachment={'bottom right'}
                      buttonAttachment={'top right'}>
                        <div className="message-textarea__emoji-btn" />
                        <EmojiPicker onSelect={this.onSelectEmoji} />
                    </DropDown>
                </div>
            </div>);
    }
}

export default MessageTextArea;
