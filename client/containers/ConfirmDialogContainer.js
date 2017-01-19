import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index';
import ModalDialog from '../components/ModalDialog';

const ConfirmDialog = ({
  show, text, confirmYes, confirmNo
}) =>
(show ? <ModalDialog
  showHeader={false}
  isOpen={show}
  onClose={confirmNo}
  style={{content:{background:'#2e3136'}}}>

  <h1>{text}</h1>
  <button onClick={confirmYes}>YES</button>
  <button onClick={confirmNo}>No</button>

</ModalDialog>
: null
);

const mapStateToProps = (state) =>({
  show:state.confirmDialog.show,
  text:state.confirmDialog.text
});

export default connect(mapStateToProps, Actions)(ConfirmDialog);
