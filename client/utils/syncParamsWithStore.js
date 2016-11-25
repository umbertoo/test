import React, { Component, PropTypes } from 'react';
import shallowEqual from 'shallowequal';

export default Comp =>
class syncParamsWithStore extends Component {
  static contextTypes = { store: PropTypes.object.isRequired }
  componentWillMount(){
    this.sync();
  }
  componentDidUpdate(prevProps, prevState){
    if(!shallowEqual(prevProps.params,this.props.params))
    this.sync();
  }
  sync=()=>{
    const {params} = this.props;
    this.context.store.dispatch({type:'CHANGE_PARAMS', params});
  }
  render(){
    return <Comp {...this.props}  />;
  }
};
