import React, { Component, PropTypes } from 'react';
import './scss/color-picker.scss';
import ColorItem from './ColorItem';
const colors = [
  '1abc9c',
  '2ecc71',
  '3498db',
  '9b59b6',
  'e91e63',
  'f1c40f',
  'e67e22',
  'e74c3c',
  '95a5a6',
  '607d8b',
  '11806a',
  '1f8b4c',
  '206694',
  '71368a',
  'ad1457',
  'c27c0e',
  'a84300',
  '992d22',
  '979c9f',
  '546e7a'
];
const DEFAULT_COLOR ='99aab5';

class ColorPicker extends Component {
  state = {
    selected:this.props.selectedColor.trim()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedColor !== this.state.selected) {
      this.setState({
        selected: nextProps.selectedColor.trim()
      });
    }
  }
  onSelectColor = (color)=>{
    this.setState({ selected:color });
    this.props.onChange(color);
  }
  onClickDefault = () =>{
    this.setState({ selected: DEFAULT_COLOR });
  }
  render(){
    const {selected} = this.state;
    const defaultSelectClass = selected==DEFAULT_COLOR ? '-selected' : '';
    return (
      <div className="color-picker">
        <div className={"color-picker__default "+ defaultSelectClass}
          onClick={this.onClickDefault}

          style={{backgroundColor:'#'+DEFAULT_COLOR}}
        />
        <div className="color-picker__colors-list">
          {colors.map((color,i)=>
            <ColorItem key={i}
              selected={color==selected}
              color={color}
              onSelect={this.onSelectColor}/>
          )}
        </div>

      </div>
    );
  }
}
const noop = () => {};

ColorPicker.propTypes = {
  selectedColor: PropTypes.string,
  onChange:PropTypes.func
};
ColorPicker.defaultProps = {
  selectedColor:DEFAULT_COLOR,
  onChange:noop
};
export default ColorPicker;
