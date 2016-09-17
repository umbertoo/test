import React, { Component } from 'react';
// import EmojiPicker from 'emojione-picker';
import 'emojione-picker/css/picker.css';
import '../static/scss/message-form.scss';
import DropDown from './DropDown';
import EmojiPicker from './EmojiPicker';
import autosize from 'autosize';
import autoBind from 'react-autobind';

// import wdtEmojiBundle from 'wdt-emoji-bundle';
// import '../static/css/emojione.sprites.css';

class MessageForm extends Component {
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
    onInputResize(e){
        // console.log('onInputResize',e);
        this.props.onChangeHeight(e.target.parentNode.offsetHeight);
    }
    inpuKeyPress(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            if(e.ctrlKey){
                this.messageInput.value+='\n';
                const evt = document.createEvent('Event');
                evt.initEvent('autosize:update', true, false);
                this.messageInput.dispatchEvent(evt);
            }
        }
        if (e.keyCode == 13 && !e.ctrlKey) {
            this.props.onSubmit(this.messageInput.value);
            this.messageInput.value='';
        }
    }
    render(){
        return (
            <div ref={c=>this.form=c}  className="message-form">
                <textarea
                  rows={1}
                  onKeyDown={this.inpuKeyPress}
                  ref={c=>this.messageInput=c}
                  className="message-form__input"
                  name="message"
                  type="text"
                  defaultValue=""/>
                <div className="message-form__add-btn">+</div>
                <div className="message-form__emoji">
                    <DropDown
                      menuOffset={'15px 0'}
                      menuAttachment={'bottom right'}
                      buttonAttachment={'top right'}>
                        <div className="message-form__emoji-btn" />
                        {
                            <EmojiPicker onSelect={this.onSelectEmoji}
                />
                        }
                    </DropDown>
                </div>
            </div>
        );
    }
}

export default MessageForm;
