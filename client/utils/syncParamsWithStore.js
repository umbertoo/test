import React, { Component, PropTypes } from 'react';
import shallowEqual from 'shallowequal';

export default Comp =>
class syncParamsWithStore extends Component {
  static contextTypes = { store: PropTypes.object.isRequired }
  componentWillMount(){
    this.sync(this.props.params);
  }
  shouldComponentUpdate(nextProps, nextState){
      return !shallowEqual(nextProps.params,this.props.params);
  }
  // componentDidUpdate(prevProps, prevState){
  //   // if(!shallowEqual(prevProps.params,this.props.params))
  //   this.sync(this.props.params);
  // }
  componentWillReceiveProps(nextProps){
    if(!shallowEqual(nextProps.params,this.props.params))
    this.sync(nextProps.params);

  }
  sync=(params)=>{
    // const {params} = this.props;
    // console.log(params);
    this.context.store.dispatch({type:'CHANGE_PARAMS', params});
  }
  render(){
    // console.log('syncParamsWithStore',this.props);
    // const newProps ={...this.props};
    // const

    return <Comp {...this.props} />;
  }
};
