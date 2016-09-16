// These are regular React components we will write soon
import React from 'react';
import { connect } from 'react-redux'
import NewFolderDialog from '../components/NewFolderDialog.js'

const MODAL_COMPONENTS = {
  'NEW_FOLDER_DIALOG': NewFolderDialog,
  /* other modals */
}

const ModalRoot = ({ modalType }) => {
  if (!modalType) {
    return <span /> // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal />
}

const mapStateToProps = (state) => {
  return {
    modalType: state.dialog.modalType
  }
}

export default connect(
  mapStateToProps
)(ModalRoot)
