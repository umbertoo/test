import React, { Component } from 'react';
import moment from 'moment';
import Remarkable  from 'remarkable';
import '../static/scss/message-block.scss';
import {EmojiConvertor} from './EmojiPicker/emoji.min';
import sheet from './EmojiPicker/images/sheet_apple_32.png';
// import sheet from './EmojiPicker/images/sheet_twitter_32.png';
import shallowEqual from 'shallowequal';
import autoBind from 'react-autobind';
import autosize from 'autosize';
import MessageTextArea from './MessageTextArea';


class Message extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.md = new Remarkable('full', {
      html: true
    });
    this.emoji = new EmojiConvertor();
    this.emoji.use_sheet = true;
    this.emoji.img_sets.apple.sheet = sheet;
  }
  componentDidMount(){
    this.props.onMount({id:this.props.id, elem:this.refs.message});
  }
  componentWillUnmount(){
    this.props.onUnmount({id:this.props.id, elem:this.refs.message});
  }
  shouldComponentUpdate(nextProps, nextState){
    return !shallowEqual(this.props.text, nextProps.text) ||
    !shallowEqual(this.props.minimaized, nextProps.minimaized)||
    !shallowEqual(this.props.isEditable, nextProps.isEditable)||
    !shallowEqual(this.state,nextState);
  }
  rawMarkup() {
    const markup = this.emoji.replace_colons(this.props.text);
    return { __html: this.md.render(markup) };
  }

  onClickSave(){
    this.props.onSaveEdit(this.props.id, this.textarea.getValue());
  }
  onClickCancel(){
    console.log('onClickCancel');
    this.props.onCancelEdit();
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.isEditable) {
      this.textarea.setValue(this.props.text);
    }
  }
  onClickEdit(){
    console.log('onClickEdit');
    this.props.onEdit(this.props.id);
  }
  onClickDelete(){
    console.log('onClickDelete');
    this.props.onDelete(this.props.id);
  }
  renderBody(){
    const {user , minimaized, isEdited} = this.props;
    const date = moment(this.props.createdAt).calendar();
    return  (
        <span>
            {!minimaized &&
                <div className="message-block__head">
                    <span className="message-block__username">
                        {this.props.user.name}
                    </span>
                    <span className="message-block__date">
                        {date}
                    </span>
                </div>
            }
            <span className="message-block__content"
              dangerouslySetInnerHTML={this.rawMarkup()}/>
            {isEdited && <span className="message-block__edited-label">отредактировано</span>}
            <div onClick={this.onClickEdit}
              className="message-block__edit-btn">Редактировать</div>
            <div onClick={this.onClickDelete}
              className="message-block__delete-btn">Удалить</div>
        </span>
    );
  }
  renderEditMode(){
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
    const {user, minimaized, isEditable} = this.props;

    return (
        <div ref="message" className={"message-block "+ (minimaized?'-minimaized':'')}>
            {!minimaized  &&  <div className="message-block__avatar">
                {this.props.id}
                avatar
            </div>}
            <div className="message-block__body">
                {!isEditable? this.renderBody(): this.renderEditMode()}
            </div>
        </div>
    );
  }
}

export default Message;
