// These are regular React components we will write soon
import React from 'react';
import { connect } from 'react-redux';
import NewFolderDialog from '../components/NewFolderDialog';
import MovePackDialog from '../components/MovePackDialog';
import RemovePackDialog from '../components/RemovePackDialog';
import ListVersionDialog from '../components/ListVersionDialog';
import NoteDialog from '../components/NoteDialog';
import LoadingDialog from '../components/LoadingDialog';

const MODAL_COMPONENTS = {
  NEW_FOLDER_DIALOG: NewFolderDialog,
  MOVE_PACK: MovePackDialog,
  REMOVE_PACK_DIALOG: RemovePackDialog,
  LIST_VERSION_DIALOG: ListVersionDialog,
  NOTE_DIALOG: NoteDialog,
  LOADING_DIALOG: LoadingDialog,
  /* other modals */
};

const ModalRoot = ({ modalType, ownProps }) => {
  if (!modalType) {
    return <span />; // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...ownProps} />;
};

export default connect(
  (state, ownProps) => ({
    ownProps,
    modalType: state.dialog.modalType,
  })
)(ModalRoot);
