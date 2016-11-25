import React, { Component } from 'react';
import moment from 'moment';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import Message from './Message';
import TimeDivider from './TimeDivider';
import { Scrollbars } from 'react-custom-scrollbars';
import '../static/scss/message-list.scss';

import { socket } from '../actions/common/socketEvents';
import shallowEqual from 'shallowequal';
import EmojiPicker from './EmojiPicker';


class MessageList extends Component {
  isScrollOnBottom=()=>{
    const view = this.scrollView;
    return view.getScrollTop()+view.getClientHeight()==view.getScrollHeight();
  }
  onScrollStop=()=>{
    this.props.onScrollStop();
    const view = this.scrollView;
    if(view.getScrollTop()==0){
      this.props.onScrollTop(view.getScrollHeight());
      console.log('грузим еще');
    }
    //if scrollOnBottom
    if(this.isScrollOnBottom()){
      console.log('вниз пришли');
      this.props.onScrollBottom();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props,nextProps);
  }
  renderMessages=()=>{
    let prevDate;
    let userId;
    const yesterday = moment().add(-1,'days');
    let prevDay;
    let day;
    let prevDayisYesterday;
    const list=[];
    const { messages, messagesIds }= this.props;
    // console.log('this.props.messages',this.props.messages.length);
    // this.props.messagesIds.
    messagesIds.forEach(id=>{
      const msg = messages[id];
      day = msg.createdAt;

      const curDate = moment(msg.createdAt);
      const timeDiff = curDate.diff(prevDate, 'm');

      let dateDiff;
      if(prevDate){
        dateDiff = curDate.date()!==prevDate.date();
      }
      if(prevDate && dateDiff && (+moment().date()-prevDate.date())!==1 ){
        list.push(<TimeDivider key={msg.createdAt+"1"} content={prevDate.format("D MMMM YYYY")}/>);
      }
      const minimaized = userId ===  msg.userId && timeDiff < 2;
      prevDate = curDate;
      userId = msg.userId;
      prevDayisYesterday = moment(prevDay).isSame(yesterday,'days');

      if(prevDayisYesterday && !moment(msg.createdAt).isSame(yesterday,'days')){
        list.push(<TimeDivider key={msg.createdAt} content ={"вчера"}/>);
      }
      list.push (
        <Message
          isEdited={msg.createdAt!==msg.updatedAt}
          isEditable={this.props.editableMessageId==msg.id}
          canBeEditable={this.props.currentUser==msg.userId}

          minimaized={minimaized}

          onEdit={this.props.onMessageEdit}
          onSaveEdit={this.props.onSaveMessageEdit}
          onCancelEdit={this.props.onCancelMessageEdit}

          onDelete={this.props.onMessageDelete}

          onMount={this.props.onMountMessage}
          onUnmount={this.props.onUnmountMessage}
          id={msg.id}
          user={this.props.users[msg.userId]}
          text={msg.text}
          key={msg.id}
          createdAt={msg.createdAt}/>
      );
      prevDay = day;
    }
  );


  return list;
}
render(){
  const { messagesIsFetching }= this.props;
  return(
    <Scrollbars
      className="message-list"
      onScrollStop={this.onScrollStop}
      renderThumbVertical={props => <div {...props} className="message-list__thumb-vertical"/>}
      ref={c=>this.scrollView=c}>
      {this.props.children}
      {this.props.users && this.renderMessages()}
      <div className="message-list__footer"/>
    </Scrollbars>

  );
}
}

 export default MessageList;
