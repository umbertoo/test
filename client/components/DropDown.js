import React, {Component, PropTypes, cloneElement} from 'react';
import Tether from 'react-tether';
import '../static/scss/drop-down.scss';
import autoBind from 'react-autobind';

class DropDown extends Component {
  state = {
    isOpen: false,
    attachment:'top '+this.props.position,
    targetAttachment:'bottom '+this.props.position
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickDocument);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickDocument);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.isOpen != this.state.isOpen)
    this.setState({
      isOpen: nextProps.isOpen
    });
  }
  handleClickDocument=(e)=>{
    if(this.control.contains(e.target)) {
      return
    }
    if(!this.props.closeOnClickMenu && this.menu && this.menu.contains(e.target)) {
      return
    }
    this.setState({ isOpen: false }, this.props.onClose);
  }
  handleOpen=(e)=>{
    this.setState({
      isOpen: true
    },()=>{
      const { position } = this.props;
      const { bottom } = this.menu.getBoundingClientRect();
      const winHeight = document.documentElement.clientHeight;
      if(bottom > winHeight){
        this.setState({
          attachment:'bottom '+position,
          targetAttachment:'top '+position
        });
      }
      this.props.onOpen();
    });
  }
  render() {
    const {attachment, targetAttachment} = this.state;
    const {children, menuOffset, className} = this.props;

    const openClass = this.state.isOpen ? '-open' : '';
    const dropClass = className ? className : 'drop-down';

    return (
      <div className={dropClass+" "+openClass}>
        <Tether
          attachment={attachment}
          targetAttachment={targetAttachment}
          offset={menuOffset}>

          {cloneElement(children[0],{
            className:"drop-down__button "+children[0].props.className,
            ref:c=>this.control=c,
            onClick:this.handleOpen
          })}

          {this.state.isOpen &&
            <div className={"drop-down__menu "+openClass}
              ref={c=>this.menu=c}
              onClick={this.handleClickDropBlock}>
              {children[1]}
            </div>
          }
        </Tether>
      </div>
    );
  }
}
DropDown.defaultProps = {
  closeOnClickMenu:true,
  position:'right',
  menuOffset:'0 0',
  onClose:()=>{},
  onOpen:()=>{}
};
DropDown.propTypes={
  position:PropTypes.oneOf(['left', 'right']),
  closeOnClickMenu:PropTypes.bool,
  onClose:PropTypes.func,
  onOpen:PropTypes.func
};
export default DropDown;
