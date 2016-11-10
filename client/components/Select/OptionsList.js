import React, { Component } from 'react';
import Option from './Option';

class OptionsList extends Component {
  render(){
    const {options,selectedValue} = this.props;
    return (
      <div>
        {options.map((opt,i)=>
          <Option
            isDeletable={this.props.deletableOptions}
            isSelected={opt.value==selectedValue}
            className="xselect__optionslist"
            key={i}
            option={opt}
            onClick={this.props.onSelect}
            onDelete={this.props.onDelete}
        />)}
      </div>
      );
    }
  }
  OptionsList.defaultProps={
    options:[]
  };
  export default OptionsList;
