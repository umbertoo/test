import React, { Component } from 'react';
import moment from 'moment';
import Remarkable  from 'remarkable';
import '../static/scss/message-block.scss';
import {EmojiConvertor} from './EmojiPicker/emoji.min';
import sheet from './EmojiPicker/images/sheet_apple_32.png';
// import sheet from './EmojiPicker/images/sheet_twitter_32.png';
import shallowEqual from 'shallowequal';
import MessageTextArea from './MessageTextArea';
import Avatar from './Avatar';

class Message extends Component {
  componentDidMount(){
    this.props.onMount({id:this.props.id, elem:this.refs.message});
  }
  componentWillMount(){
    this.md = new Remarkable('full', {
      html: true
    });
    this.emoji = new EmojiConvertor();
    this.emoji.use_sheet = true;
    this.emoji.img_sets.apple.sheet = sheet;
  }
  componentWillUnmount(){
    this.props.onUnmount({id:this.props.id, elem:this.refs.message});
  }
  shouldComponentUpdate(nextProps, nextState){
    return this.props.text!==nextProps.text ||
    this.props.minimaized!==nextProps.minimaized ||
    this.props.isEditable!==nextProps.isEditable ||
    !shallowEqual( this.props.user,nextProps.user) ||
    !shallowEqual(this.state,nextState);
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.isEditable) {
      this.textarea.setValue(this.props.text);
    }
  }
  rawMarkup=()=>{
    const markup = this.emoji.replace_colons(this.props.text);
    return { __html: this.md.render(markup) };
  }
  onClickSave=()=>{
    this.props.onSaveEdit(this.props.id, this.textarea.getValue());
  }
  onClickCancel=()=>{
    this.props.onCancelEdit();
  }
  onClickEdit=()=>{
    this.props.onEdit(this.props.id);
  }
  onClickDelete=()=>{
    this.props.onDelete(this.props.id);
  }
  renderBody=()=>{
    const {user , minimaized, isEdited, canBeEditable} = this.props;
    const date = moment(this.props.createdAt).calendar();
    return  (
      <span>
        {!minimaized &&
          <div className="message-block__head">
            <span className="message-block__username">
              {this.props.user.name} | {this.props.id}
            </span>
            <span className="message-block__date">
              {date}
            </span>
          </div>   }
        <span className="message-block__content"
          dangerouslySetInnerHTML={this.rawMarkup()}/>
        {isEdited && <span className="message-block__edited-label">отредактировано</span>}
        {canBeEditable &&
          <div className="message-block__menu">
            <div onClick={this.onClickEdit}
              className="message-block__edit-btn">Редактировать</div>
            <div onClick={this.onClickDelete}
              className="message-block__delete-btn">Удалить</div>
          </div>
        }
      </span>
            );
          }
          renderEditMode=()=>{
            return (
              <div className="message-block__edit-block">
                <MessageTextArea
                  ref={c=>this.textarea=c}
                  onEnterKey={this.onClickSave}
                  onChangeHeight={this.props.onChangeHeight}/>
                <div className="message-block__save-btn"
                  onClick={this.onClickSave}>
                  Cохранить
                </div>
                <div className="message-block__cancel-btn"
                  onClick={this.onClickCancel}>
                  Отменить
                </div>
              </div>
              );
            }
            render(){
              const {user, minimaized, isEditable, canBeEditable} = this.props;
              return (
                <div ref="message" className={"message-block "+ (minimaized?'-minimaized':'')}>
                  {!minimaized  &&  <div className="message-block__avatar">
                    <Avatar src={user.avatar} />
                  </div>}
                  <div className="message-block__body">
                    {!isEditable? this.renderBody(): this.renderEditMode()}
                  </div>
                </div>
              );
            }
          }

          export default Message;
