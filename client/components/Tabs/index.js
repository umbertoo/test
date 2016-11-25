import React, { Component, PropTypes, cloneElement } from 'react';
import './scss/xtabs.scss';
import isArray from 'lodash/isArray';
import Tab from './Tab';

class Tabs extends Component {
  state={
    activeTab:this.props.initTabIndex,
    labels:[]
  }
  componentWillMount(){
    const {children}=this.props;
    const elements = this.childrenToArray(children);
    this.setState({
      labels:elements.map(c=>c.props.label)
    });
  }
  onClick=(activeTab)=>{
    const prevIndex=this.state.activeTab;
    this.setState({activeTab},()=>
    this.props.onChange({
      value:
      prevIndex,
      curIndex:activeTab
    }));
  }
  childrenToArray=(children)=>{
    return isArray(children) ? children : [children];
  }
  render(){
    const {labels, activeTab} = this.state;
    const {children, style, tabStyle, tabPaneStyle} = this.props;
    const elements = this.childrenToArray(children);
    return (
      <div className="xtabs" style={style}>
        <ul className="xtabs__bar">
          {labels.map((label,i)=>
            <li
              style={tabStyle}
              key={i}
              className={'xtabs__tab '+(i==activeTab?'-active':'')}
              onClick={this.onClick.bind(null,i)}>
              {label}
            </li>
          )}
        </ul>
        {cloneElement(elements[activeTab],{style:tabPaneStyle})}
      </div>
    );
  }
}
Tabs.defaultProps={
  initTabIndex:0
};
Tabs.propTypes={
  initTabIndex:PropTypes.number,
};
export default Tabs;
