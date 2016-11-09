import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { hideDialog, movePackToFolder } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';

class MovePackDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.content = this.content.bind(this);
    this.actionList = this.actionList.bind(this);
  }

  componentDidMount() {
    const dialog = findDOMNode(this);
    if (!dialog.showModal) {   // avoid chrome warnings and update only on unsupported browsers
      window.dialogPolyfill.registerDialog(dialog);
    }
    this.dialog = document.querySelector('#moving-dialog');
    this.dialog.showModal();
  }

  onCloseClick() {
    this.dialog.close();
    this.props.dispatch(hideDialog());
  }

  onSubmitClick() {
    const id = document.querySelector('input[name="folderlist"]:checked').value;
    this.props.dispatch(movePackToFolder(this.props.modalProps.id, id));
    this.dialog.close();
    this.props.dispatch(hideDialog());
  }

  content() {
    if (this.props.folder.length === 0) {
      return (<p>沒有資料夾可以放入</p>);
    }
    return (
      <ul className="demo-list-control mdl-list">
        {this.props.folder.map(i => (
          <li key={i.id} className="mdl-list__item">
            <span className="mdl-list__item-primary-content">
              {i.name}
            </span>
            <span className="mdl-list__item-secondary-action">
              <label className="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={`folderlist-${i.id}`}>
                <input type="radio" id={`folderlist-${i.id}`} className="mdl-radio__button" name="folderlist" value={i.id} />
              </label>
            </span>
          </li>))}
      </ul>
    );
  }

  actionList() {
    if (this.props.folder.length === 0) {
      return (
        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button close" onClick={this.onCloseClick}>取消</button>
        </div>
      );
    }
    return (
      <div className="mdl-dialog__actions">
        <button type="button" className="mdl-button" onClick={this.onSubmitClick}>移動</button>
        <button type="button" className="mdl-button close" onClick={this.onCloseClick}>取消</button>
      </div>
    );
  }

  render() {
    return (
      <dialog className="mdl-dialog" id="moving-dialog">
        <h4 className="mdl-dialog__title">
          放入...
        </h4>
        <div className="mdl-dialog__content">
          {this.content()}
        </div>
        <div className="mdl-dialog__actions">
          {this.actionList()}
        </div>
      </dialog>
    );
  }
}

MovePackDialog.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  folder: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  })).isRequired,
  modalProps: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  state => ({
    modalProps: state.dialog.modalProps,
    folder: state.folder.filter(i => i.id !== 'all'),
  })
)(mdlUpgrade(MovePackDialog));
