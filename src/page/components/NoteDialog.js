import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { hideDialog, newComment } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';
import './NoteDialog.css';
import { simpleNotify } from '../../utils/toast.js';

const mapStateToProps = state => ({
  name: state.dialog.modalProps.name,
  noteId: state.dialog.modalProps.noteId,
  note: state.note[state.dialog.modalProps.noteId],
  userId: state.user.id,
  userName: state.user.name,
});

class NoteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount() {
    const dialog = findDOMNode(this);
    if (!dialog.showModal) {   // avoid chrome warnings and update only on unsupported browsers
      window.dialogPolyfill.registerDialog(dialog);
    }
    this.dialog = document.querySelector('#note-comment-dialog');
    this.dialog.showModal();
    const scroll = document.querySelector('.note-comment');
    scroll.scrollTop = scroll.scrollHeight;
  }

  componentDidUpdate() {
    this.dialog.close();
    this.dialog.showModal();
    const scroll = document.querySelector('.note-comment');
    scroll.scrollTop = scroll.scrollHeight;
  }

  onCloseClick() {
    this.dialog.close();
    this.props.dispatch(hideDialog());
  }

  onSubmitClick() {
    const { userName, userId, noteId } = this.props;
    const content = document.getElementById('comment-content').value.trim();
    if (content === '') {
      simpleNotify('留言內容不可以空白');
      return;
    }
    this.props.dispatch(newComment(userId, userName, content, noteId));
    document.getElementById('comment-content').value = '';
  }

  render() {
    return (
      <dialog className="mdl-dialog" id="note-comment-dialog" style={{ width: '500px' }}>
        <h4 className="mdl-dialog__title">
          {this.props.name}
        </h4>
        <div className="mdl-dialog__content">
          <p>
            {this.props.note.content}
          </p>
          <ul className="mdl-list note-comment">
            {this.props.note.comment.map(comment =>
              (<li key={comment.id} className="mdl-list__item mdl-list__item--three-line">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons  mdl-list__item-avatar">person</i>
                  <span>{comment.userName}</span>
                  <span className="mdl-list__item-text-body">
                    {comment.content}
                  </span>
                </span>
              </li>
              )
            )}
          </ul>
          <div className="mdl-textfield mdl-js-textfield" style={{ width: '100%' }}>
            <input
              className="mdl-textfield__input"
              type="text"
              id="comment-content"
            />
            <label
              className="mdl-textfield__label"
              htmlFor="comment-content"
            >留言...</label>
          </div>
        </div>
        <div className="mdl-dialog__actions">
          <button
            type="button"
            className="mdl-button"
            onClick={this.onSubmitClick}
          >留言</button>
          <button
            type="button"
            className="mdl-button close"
            onClick={this.onCloseClick}
          >離開</button>
        </div>
      </dialog>
    );
  }
}

NoteDialog.propTypes = {
  dispatch: React.PropTypes.func,
  name: React.PropTypes.string,
  noteId: React.PropTypes.string,
  note: React.PropTypes.object,
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
};

export default connect(
  mapStateToProps
)(mdlUpgrade(NoteDialog));
