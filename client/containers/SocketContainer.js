import React, { Component, PropTypes } from 'react';
import shallowEqual from 'shallowequal';
import socketEventsListeners from '../actions/common/socketEvents';


export default Comp =>
class SocketContainer extends Component {
  static contextTypes = { store: PropTypes.object.isRequired }
  componentWillMount(){
    socketEventsListeners(this.context.store, this.getProps);
  }
  getProps=()=>{
    return this.props;
  }
  render(){
    return <Comp {...this.props} />;
  }
};
