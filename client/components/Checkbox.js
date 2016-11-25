import React, {Component} from 'react';
import '../static/scss/checkbox.scss';

class CheckBox extends Component {
  state = {
    checked: this.props.checked || false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }
  toggleCheck = () =>{
    this.props.onChange({
      checked:!this.state.checked,
      value:this.props.value
    });
    this.setState({
      checked: !this.state.checked
    });
  }
  render() {
    const {size, children}= this.props;
    const style={
      height:size+'px',
      width:size+'px',
      backgroundSize:size+'px '+ size+'px',
    };
    const checkedClass = this.state.checked ? ' -checked ' : '';
    return (
      <div className={"checkbox" +checkedClass} style={{paddingLeft:size+10+'px'}}
        onClick={this.toggleCheck}>
        <div className="checkbox__btn" style={style}/>
        <div className="checkbox__text" >
          {children}
        </div>
      </div>
    );
  }
}

export default CheckBox;
