import React, { Component, PropTypes, cloneElement } from 'react';
import '../static/scss/step-slider.scss';

class StepSlider extends Component {
  state = {
    stepsCount:null,
    bodyWidth:null,
    stepWidth:null
  }
  componentDidMount(){
    const sliderWidth = this.slider.offsetWidth;
    this.setState({
      bodyWidth: sliderWidth*this.state.stepsCount,
      stepWidth: sliderWidth,
    });
  }
  componentWillMount(){
    this.setState({ stepsCount:this.props.children.length });
  }
  getBodyPosition(step, stepWidth){
    return -((step-1) * stepWidth);
  }
  render(){
    const {children, style, step, className} = this.props;
    const {stepWidth, bodyWidth} = this.state;

    const bodyStyle={
      transition:'all .2s',
      width:bodyWidth+'px',
      position:'absolute',
      top:0,
      left: this.getBodyPosition(step,stepWidth)+'px'
    };
    const stepStyle={
      width:stepWidth+'px',
      display:'inline-block'
    };
    return (
      <div ref={c=>this.slider=c}
        className={'step-slider '+className}
        style={style}>
        <div className="step-slider__body" style={bodyStyle}>
          {(!bodyWidth || !stepWidth) ? children[0] :
            children.map((e,i)=>
              <e.type key={i} {...e.props} style={stepStyle}/>
            )
          }
        </div>
      </div>
    );
  }
}

StepSlider.propTypes = {
  className:PropTypes.string,
  step:PropTypes.number,
  style:PropTypes.object,
  children:PropTypes.arrayOf(PropTypes.element)
};

StepSlider.defaultProps = {
  step:1,
  className:''
};

export default StepSlider;
