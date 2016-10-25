import React from 'react';
import { connect } from 'react-redux';
import { hideDialog, removePack } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';

class LoadingDialog extends React.Component {
  componentDidMount() {
    this.dialog = document.querySelector('#loading-dialog');
    this.dialog.showModal();
  }

  componentWillUnmount() {
    this.dialog.close();
  }

  render() {
    return (
      <dialog id="loading-dialog" className="mdl-dialog">
        <h4 className="mdl-dialog__title" style={{ fontSize: '1.2em' }}>圖片上傳中</h4>
        <div className="mdl-dialog__content">
          <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate" />
        </div>
      </dialog>
    );
  }
}

export default connect()(mdlUpgrade(LoadingDialog));
