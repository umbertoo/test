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
    autosize(this.textarea);
    this.textarea.addEventListener('autosize:resized',
    this.onInputResize);
  }
  componentWillUnmount(){
    this.textarea.removeEventListener('autosize:resized',
    this.onInputResize);
  }
  onInputResize(e){
    // console.log('onInputResize',e);
    this.props.onChangeHeight && this.props.onChangeHeight(e.target.parentNode.offsetHeight);
  }
  setValue(value){
    this.textarea.value = value;
    const event = document.createEvent('Event');
    event.initEvent('autosize:update', true, false);
    this.textarea.dispatchEvent(event);
  }
  getValue(){
    return this.textarea.value;
  }

  inpuKeyDown(e){
    this.props.onTyping();

    //on Ctrl+Enter
    if (e.keyCode == 13 && e.ctrlKey) {
      console.log('e.keyCode == 13 && e.ctrlKey');
      e.preventDefault();
      this.textarea.value+='\n';
      const event = document.createEvent('Event');
      event.initEvent('autosize:update', true, false);
      this.textarea.dispatchEvent(event);
    }
    //on Enter
    if (e.keyCode == 13 && !e.ctrlKey) {
      e.preventDefault();
      console.log("e.keyCode == 13 && !e.ctrlKey");
      this.props.onEnterKey(this.textarea.value.trim());
      this.textarea.value='';
    }
  }
  onSelectEmoji(shortname){
    const el = this.textarea;
    const{selectionStart,selectionEnd,value}=this.textarea;

    const before = value.substring(0, selectionStart);
    const after  = value.substring(selectionEnd, value.length);
    el.value = (before +" "+ shortname+" "+after);
    el.selectionStart = el.selectionEnd = selectionStart + shortname.length+2;

    // this.textarea.value += ` ${shortname} `;
    this.textarea.focus();
  }
  render(){
    return (
      <div className="message-textarea">
        <textarea
          rows={1}
          onKeyDown={this.inpuKeyDown}
          ref={c=>this.textarea=c}
          className="message-textarea__input"
          name="message"
          type="text"
          defaultValue=""/>
        <div className="message-textarea__emoji">
          <DropDown
            closeOnClickMenu={false}
            // menuOffset={'15px 0'}
            >
            <div className="message-textarea__emoji-btn" />
            <EmojiPicker onSelect={this.onSelectEmoji} />
          </DropDown>
        </div>
      </div>);
    }
  }
  MessageTextArea.defaultProps={
    onTyping:()=>{}
  };
  export default MessageTextArea;
