import React, { Component } from 'react';
import moment from 'moment';
import memoize from 'lodash/memoize';
import Message from './Message';
import MessagesDivider from './MessagesDivider';
import '../static/scss/message-list.scss';
import forEach from 'lodash/forEach';
import shallowEqual from 'shallowequal';

import ChatScrollContainer from '../containers/ChatScrollContainer';
import { DIVIDER_TIME } from '../selectors/selectors';

const RED_COLOR = 'rgba(240,71,71,.8)';


class MessageList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps);
  }
  renderMessages=()=>{
    const { messages, newMessagesAfterId } = this.props;
    // console.log(messages,'messages');

    const list=[];
    forEach(messages, (item,i)=>{
      if (!item.type){
        if  (newMessagesAfterId && item.id > newMessagesAfterId && i==0){
          list.push( <MessagesDivider key={"new_messages"} refz={c=>this.NEW_MESSAGES=c}
            content={'Новые сообщения'} textColor={RED_COLOR} lineColor={RED_COLOR}/>
          );
        }
        list.push( <Message
          isEdited={item.createdAt!==item.updatedAt}
          isEditable={this.props.editableMessageId==item.id}
          canBeEditable={this.props.currentUserId==item.userId}
          minimaized={item.minimaized}
          onEdit={this.props.onMessageEdit}
          onSaveEdit={this.props.onSaveMessageEdit}
          onCancelEdit={this.props.onCancelMessageEdit}
          onDelete={this.props.onMessageDelete}
          id={item.id}
          userId={item.userId}
          user={this.props.users[item.userId]}
          text={item.text}
          key={item.id}
          createdAt={item.createdAt}/>
        );

      }
      if(item.type==DIVIDER_TIME)
      list.push( <MessagesDivider key={item.key} content={item.content}/>        );

      if(!item.type && item.id == newMessagesAfterId && i != messages.length-1  )
      list.push( <MessagesDivider key={"new_messages"} refz={c=>this.NEW_MESSAGES=c}
        content={'Новые сообщения'} textColor={RED_COLOR} lineColor={RED_COLOR}/>
      );

    }  );

    return list;
  }


  render(){
    const {
      currentUserId, channelId,
      scrollPosition,
      isLoadingMoreBefore, isLoadingMoreAfter,
      moreBefore, moreAfter,
      newMessages, newMessagesAfterId, showIndicatorAboutNewMessages,
      lastOwnMessageId, lastNotOwnMessageId
    } = this.props;
    // console.log(this.props, 'messageList');
    return (
      <div className="message-list">
        {(newMessages && newMessages.length && showIndicatorAboutNewMessages) ?
          <div className="message-list__notification">{newMessages.length} новых сообщения</div>
          :null
        }
        <ChatScrollContainer
          lastNotOwnMessageId={lastNotOwnMessageId}
          lastOwnMessageId={lastOwnMessageId}

          currentUserId={currentUserId}
          loadMoreBefore={this.props.loadMoreBefore}
          loadMoreAfter={this.props.loadMoreAfter}
          moreBefore={moreBefore}
          moreAfter={moreAfter}
          isLoadingMoreBefore={isLoadingMoreBefore}
          isLoadingMoreAfter={isLoadingMoreAfter}
          channelId={channelId}
          newMessagesAfterId={newMessagesAfterId}
          // newMessagesRef={this.NEW_MESSAGES}
          scrollPosition={scrollPosition}
          onChangeScroll={this.props.onChangeScroll}
          className="message-list__scroll"
          // renderThumbVertical={this.renderScrollTumb}
          ref={c=>this.scrollView=c}
          // header={this.props.children}
          // footer={this.footer}
          >
          {this.props.users && this.renderMessages()}

        </ChatScrollContainer>
      </div>

      );
    }
  }

  export default MessageList;
