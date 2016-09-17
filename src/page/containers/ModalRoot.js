// These are regular React components we will write soon
import React from 'react';
import { connect } from 'react-redux';
import NewFolderDialog from '../components/NewFolderDialog';
import MovePackDialog from '../components/MovePackDialog';
import RemovePackDialog from '../components/RemovePackDialog';

const MODAL_COMPONENTS = {
  NEW_FOLDER_DIALOG: NewFolderDialog,
  MOVE_PACK: MovePackDialog,
  REMOVE_PACK_DIALOG: RemovePackDialog,
  /* other modals */
};

const ModalRoot = ({ modalType }) => {
  if (!modalType) {
    return <span />; // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal />;
};

export default connect(
  state => ({
    modalType: state.dialog.modalType,
  })
)(ModalRoot);
