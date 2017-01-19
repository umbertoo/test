import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import '../static/scss/modal-dialog.scss';
import merge from 'lodash/merge';
class ModalDialog extends Component {
  state = {
    isOpen:false
  }
  componentDidMount(){
    this.setState({ isOpen:true });
  }
  render(){
    const {
      isOpen, title, children,
       onClose, onAfterOpen, closeTimeoutMS, contentLabel, showHeader,
      style
    } = this.props;
    const defStyle = {
      overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(0, 0, 0, 0.75)',
        zIndex:10
      },
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        position                   : 'absolute',
        border                     : 'none',
        background                 : '#fff',
        overflow                   : 'auto',
        // WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '0'

      }
    };
    const resultStyle = merge({}, defStyle, style);

    const openClass = this.state.isOpen?'-open':'';
    return(
      <Modal
        closeTimeoutMS={300}
        portalClassName="modal-dialog"
        className={"modal-dialog__window "+ openClass}
        overlayClassName="modal-dialog__overlay"
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        style={resultStyle}
        contentLabel={'dialog'}
        >
        {showHeader &&
          <div className="modal-dialog__header">
            <div className="modal-dialog__title">
              <h1>{title}</h1>
            </div>
            <div className="modal-dialog__close-btn" onClick={onClose}>
              ×
            </div>
          </div>
        }
        <div className="modal-dialog__body">
          {children}
        </div>
      </Modal>
      );
    }
  }
  // const ModalDialog = ({
  //   isOpen, title, children,
  //   onAfterOpen, onClose, closeTimeoutMS, contentLabel, showHeader,
  //   style
  // }) => {
  //   const defStyle = {
  //     overlay : {
  //       position          : 'fixed',
  //       top               : 0,
  //       left              : 0,
  //       right             : 0,
  //       bottom            : 0,
  //       backgroundColor   : 'rgba(0, 0, 0, 0.75)',
  //       zIndex:10
  //     },
  //     content : {
  //       top                   : '50%',
  //       left                  : '50%',
  //       right                 : 'auto',
  //       bottom                : 'auto',
  //       marginRight           : '-50%',
  //       transform             : 'translate(-50%, -50%)',
  //       position                   : 'absolute',
  //       border                     : 'none',
  //       background                 : '#fff',
  //       overflow                   : 'auto',
  //       // WebkitOverflowScrolling    : 'touch',
  //       borderRadius               : '4px',
  //       outline                    : 'none',
  //       padding                    : '0'
  //
  //     }
  //   };
  //   const resultStyle = merge({}, defStyle, style);
  //   return (
  //     <Modal
  //       portalClassName="modal-dialog"
  //       className="modal-dialog__window"
  //       overlayClassName="modal-dialog__overlay"
  //       isOpen={isOpen}
  //       onAfterOpen={onAfterOpen}
  //       onRequestClose={onClose}
  //       // closeTimeoutMS={closeTimeoutMS}
  //       style={resultStyle}
  //       >
  //       {showHeader &&
  //         <div className="modal-dialog__header">
  //           <div className="modal-dialog__title">
  //             <h1>{title}</h1>
  //           </div>
  //           <div className="modal-dialog__close-btn" onClick={onClose}>
  //             ×
  //           </div>
  //         </div>
  //       }
  //       <div className="modal-dialog__body">
  //         {children}
  //       </div>
  //     </Modal>
  //     );
  //   };
    ModalDialog.propTypes = {
      showHeader:PropTypes.bool,
      title:PropTypes.string,

      onClose:PropTypes.func,
      onAfterOpen:PropTypes.func
    };
    ModalDialog.defaultProps = {
      showHeader:true
    };
    export default ModalDialog;
