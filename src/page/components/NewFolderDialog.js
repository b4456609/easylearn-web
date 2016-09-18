import React from 'react';
import { connect } from 'react-redux';
import { hideDialog, addFolder } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';

const mapStateToProps = (state) => {
  return { modalProps: state.dialog.modalProps };
};
class NewFolderDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount() {
    this.dialog = document.querySelector('dialog');
    this.dialog.showModal();
  }

  onCloseClick() {
    this.dialog.close();
  }

  onSubmitClick() {
    this.props.dispatch(addFolder(document.getElementById('new-dir-name').value));
    this.onCloseClick();
    this.props.dispatch(hideDialog());
  }

  render() {
    return (
      <dialog className="mdl-dialog">
        <h4 className="mdl-dialog__title">
          Add a Folder
        </h4>
        <div className="mdl-dialog__content">
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              id="new-dir-name"
            />
            <label
              className="mdl-textfield__label"
              htmlFor="sample1"
            >Folder name...</label>
          </div>
        </div>
        <div className="mdl-dialog__actions">
          <button
            type="button"
            className="mdl-button"
            onClick={this.onSubmitClick}
          >Submit</button>
          <button
            type="button"
            className="mdl-button close"
            onClick={this.onCloseClick}
          >Cancel</button>
        </div>
      </dialog>
    );
  }
}

export default connect(
  mapStateToProps
)(mdlUpgrade(NewFolderDialog));
