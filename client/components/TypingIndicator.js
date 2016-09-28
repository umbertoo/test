import React, { Component } from 'react';
import {connect} from 'react-redux';
const TypingIndicator = (props)=>{
  return(
      <div>TypingIndicato : {props.users.map(user=><span key={user.id}>{user.name}</span>)}</div>
  );
};

const mapStateToProps = (state) =>{
  const channel  = state.pagination.idsByChannel[state.ui.selectedChannel];
  let {
    typingUsers=[]
  } = channel||{};

  const users = typingUsers.map(id=>state.entities.users.items[id]);

  return {
    users
  };
};
export default connect(mapStateToProps)(TypingIndicator);
