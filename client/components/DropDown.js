import React, {Component} from 'react';
import Tether from 'react-tether';
import '../static/scss/drop-down.scss';
import autoBind from 'react-autobind';

class DropDown extends Component {
    constructor(props){
        super(props);
        autoBind(this);
        this.state={
            isOpen: false,
            selfClick: false
        };
    }
    componentDidMount() {
        document.addEventListener("click", this.handleClickDocument);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickDocument);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen
        });
    }
    componentWillUpdate(nextProps, nextState) {
        if(nextState.isOpen!==this.state.isOpen && !nextState.isOpen) this.props.onClose();
    }
    handleClickDocument(){
        // console.log('handleClickDocument');
        if (!this.state.selfClick) {
            this.setState({
                isOpen: false
            });
        }
    }
    close(){
        this.setState({
            isOpen: false
        });
    }
    handleOpen(e){
        this.props.onOpen();
        this.setState({
            isOpen: !this.state.isOpen,
            selfClick: true
        });
        setTimeout(()=>this.setState({selfClick: false}),100);

    }
    handleClickDropBlock(){
        this.setState({
            selfClick: true
        });
        setTimeout(()=>this.setState({selfClick: false}),100);
    }
    render() {
        let openClass = this.state.isOpen ? '-open' : '';
        return (
            <div className={"drop-down "+openClass}>
                <Tether attachment={this.props.menuAttachment} targetAttachment={this.props.buttonAttachment} offset={this.props.menuOffset}>
                    <div className="drop-down__button" onClick={this.handleOpen}>
                        {this.props.children[0]}
                    </div>
                    {this.state.isOpen &&
                        <div className={"drop-down__menu "+openClass} onClick={this.handleClickDropBlock}>
                            {this.props.children[1]}
                        </div>
                    }
                </Tether>
            </div>
        );
    }
}
DropDown.defaultProps = {
    menuAttachment:'bottom left',
    buttonAttachment:'bottom left',
    menuOffset:'0 0',
    onClose:()=>{},
    onOpen:()=>{}
};
export default DropDown;
