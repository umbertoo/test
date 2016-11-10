import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';
import './scss/xtabs.scss';
import isArray from 'lodash/isArray';
import Tab from './Tab';
class Tabs extends Component {
  constructor(props){
    super(props);
    autoBind(this);
    this.state={
      activeTab:props.initTabIndex,
      labels:[]
    };
  }
  componentWillMount(){
    const {children}=this.props;
    const elements = this.childrenToArray(children);
    this.setState({
      labels:elements.map(c=>c.props.label)
    });
  }
  onClick(activeTab){
    const prevIndex=this.state.activeTab;
    this.setState({activeTab},()=>
      this.props.onChange({
        value:
        prevIndex,
        curIndex:activeTab
      })
    );
  }
  childrenToArray(children){
    return isArray(children) ? children : [children];
  }
  render(){
    const {labels, activeTab} = this.state;
    const {children} = this.props;
    const elements = this.childrenToArray(children);
    return (
      <div className="xtabs">
        <ul className="xtabs__bar">
          {labels.map((label,i)=>
            <li
              key={i}
              className={'xtabs__tab '+(i==activeTab?'-active':'')}
              onClick={this.onClick.bind(null,i)}>
              {label}
            </li>
          )}
        </ul>
        <div className="xtabs__tab-pane">
          {elements[activeTab]}
        </div>
      </div>
    );
  }
}
Tabs.defaultProps={
  initTabIndex:0
};
Tabs.propTypes={
  initTabIndex:PropTypes.number,
  // children:PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.instanceOf(Tab)),
  //   PropTypes.instanceOf(Tab)
  // ])
};
export default Tabs;
