import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../static/scss/typing-block.scss';

const TypingIndicator = ({
  users
})=>{
  return(
    <div className="typing-block">
      {users.length ? "печатает:" : null}
      {users.map(user=><span key={user.id}> {user.name} </span>)}
    </div>
  );
};

const mapStateToProps = (state) =>{
  const channel  = state.pagination.idsByChannel[state.ui.params.channelId];
  const {
    typingUsers=[]
  } = channel||{};

  const users = typingUsers.map(id=>state.entities.users.items[id]);

  return {
    users
  };
};
export default connect(mapStateToProps)(TypingIndicator);
