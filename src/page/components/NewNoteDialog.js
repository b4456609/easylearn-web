import React from 'react';
import { connect } from 'react-redux';
import { hideDialog, newNote } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';

class NewNoteDialog extends React.Component {
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
    this.props.dispatch(hideDialog());
  }

  onSubmitClick() {
    const { packId, versionId, noteId } = this.props.modalProps;
    const { userId, userName, dispatch } = this.props;
    this.props.dispatch(newNote(packId, versionId, noteId, userId, userName, document.getElementById('new-dir-name').value));
    this.dialog.close();
    dispatch(hideDialog());
  }

  render() {
    return (
      <dialog className="mdl-dialog">
        <h4 className="mdl-dialog__title">
          {this.props.text}
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
            >便利貼內容</label>
          </div>
        </div>
        <div className="mdl-dialog__actions">
          <button
            type="button"
            className="mdl-button"
            onClick={this.onSubmitClick}
          >確定</button>
          <button
            type="button"
            className="mdl-button close"
            onClick={this.onCloseClick}
          >取消</button>
        </div>
      </dialog>
    );
  }
}

NewNoteDialog.propTypes = {
  packId: React.PropTypes.string,
  versionId: React.PropTypes.string,
  noteId: React.PropTypes.string,
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
  dispatch: React.PropTypes.func,
};

export default connect(
  state => ({
    modalProps: state.dialog.modalProps,
    userId: state.user.id,
    userName: state.user.name,
  })
)(mdlUpgrade(NewNoteDialog));
