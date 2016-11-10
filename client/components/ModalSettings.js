import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import '../static/scss/modal-dialog.scss';

const ModalSettings = ({
  isOpen, title, children,
  onAfterOpen, onClose,closeTimeoutMS,contentLabel
}) => {
  const style = {
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
      border                     : '1px solid #ccc',
      background                 : '#fff',
      overflow                   : 'auto',
      // WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '0'

    }
  };
  return (
    <Modal
      portalClassName="modal-dialog"
      className="modal-dialog__window"
      overlayClassName="modal-dialog__overlay"
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onClose}
      closeTimeoutMS={closeTimeoutMS}
      style={style}
    >
      <div className="modal-dialog__header">
        <div className="modal-dialog__title">
          <h1>{title}</h1>
        </div>
        <div className="modal-dialog__close-btn"
          onClick={onClose}>
          ×
        </div>
      </div>
      <div className="modal-dialog__body">
        {children}
      </div>
    </Modal>
  );
};
ModalSettings.propTypes = {

};
export default ModalSettings;
