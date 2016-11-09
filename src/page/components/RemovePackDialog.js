import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { hideDialog, removePack } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';

class RemovePackDialog extends React.Component {
  componentDidMount() {
    const dialog = findDOMNode(this);
    if (!dialog.showModal) {   // avoid chrome warnings and update only on unsupported browsers
      window.dialogPolyfill.registerDialog(dialog);
    }
    this.dialog = document.querySelector('#remove-pack-dialog');
    this.dialog.showModal();
  }

  onCloseClick() {
    this.dialog.close();
  }

  render() {
    return (
      <dialog className="mdl-dialog" id="remove-pack-dialog">
        <h4 className="mdl-dialog__title">
          刪除懶人包
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
          >送出</button>
          <button
            type="button"
            className="mdl-button"
            onClick={() => {
              this.props.dispatch(hideDialog());
            }}
          >取消</button>
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
