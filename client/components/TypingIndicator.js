import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../static/scss/typing-block.scss';
import map from 'lodash/map';
const TypingIndicator = ({
  users
})=>{
  return(
    <div className="typing-block">
      {users.length ? "печатает:" : null}
      {map(users,user=><span key={user.id}> {user.name} </span>)}
    </div>
  );
};




import {getChannelData, getTypingUsers} from '../selectors/selectors';

const mapStateToProps = (state, props) =>{
  return {
    users:getTypingUsers(state,props)
  };
};
export default connect(mapStateToProps)(TypingIndicator);
