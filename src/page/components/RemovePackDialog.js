import React from 'react';
import { connect } from 'react-redux';
import { hideDialog, removePack } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';

class RemovePackDialog extends React.Component {
  componentDidMount() {
    this.dialog = document.querySelector('dialog');
    this.dialog.showModal();
  }

  onCloseClick() {
    this.dialog.close();
  }

  render() {
    return (
      <dialog className="mdl-dialog">
        <h4 className="mdl-dialog__title">
          Add a Folder
        </h4>
        <div className="mdl-dialog__content">
          {'確定要刪除 "'}{this.props.modalProps.name}{'"？'}
        </div>
        <div className="mdl-dialog__actions">
          <button
            type="button"
            className="mdl-button"
            onClick={() => {
              this.props.dispatch(removePack(this.props.modalProps.id));
              this.props.dispatch(hideDialog());
            }}
          >Submit</button>
          <button
            type="button"
            className="mdl-button"
            onClick={() => {
              this.props.dispatch(hideDialog());
            }}
          >Cancel</button>
        </div>
      </dialog>
    );
  }
}

export default connect(
  state => ({
    modalProps: state.dialog.modalProps,
    folder: state.folder,
  })
)(mdlUpgrade(RemovePackDialog));
