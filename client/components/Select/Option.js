import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

class Option extends Component {
  constructor(props){
    super(props);
    autoBind(this);
  }
  onClick(){
    const {option} = this.props;
    this.props.onClick(option);
  }
  onDelete(){
    const {option} = this.props;
    this.props.onDelete(option);
  }
  render(){
    const { isSelected, isDeletable } = this.props;
    const selectedClass = isSelected ? '-selected' : '';
    return (
      <div
        className={"xselect__option "+selectedClass}
        onClick={this.onClick}>
        {this.props.option.label}
        {isDeletable &&
          <div onClick={this.onDelete}
            className="xselect__delete-btn">
            ×
          </div>
        }
      </div>
    );
  }
}
Option.propTypes = {
  isDeletable: PropTypes.bool,
  isSelected: PropTypes.bool,
  option: PropTypes.shape({
    label: PropTypes.string,
    value:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }).isRequired
};
Option.defaultProps={
  isDeletable:false,
  isSelected:false
};
export default Option;
