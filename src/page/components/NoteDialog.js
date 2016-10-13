import React from 'react';
import { connect } from 'react-redux';
import { hideDialog, newComment } from '../../actions';
import mdlUpgrade from '../../utils/mdlUpgrade';
import './NoteDialog.css';

const mapStateToProps = (state) => {
  return {
    name: state.dialog.modalProps.name,
    noteId: state.dialog.modalProps.noteId,
    note: state.note[state.dialog.modalProps.noteId],
    userId: state.user.id,
    userName: state.user.name,
  };
};
class NoteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  componentDidMount() {
    this.dialog = document.querySelector('#note-comment-dialog');
    this.dialog.showModal();
  }

  onCloseClick() {
    this.dialog.close();
    this.props.dispatch(hideDialog);
  }

  onSubmitClick() {
    let { userName, userId, noteId } = this.props;
    const content = document.getElementById('comment-content').value.trim();
    this.props.dispatch(newComment(userId, userName, content, noteId));
  }

  render() {
    return (
      <dialog className="mdl-dialog" id="note-comment-dialog" style={{ width: '500px' }}>
        <h4 className="mdl-dialog__title">
          {this.props.name}
        </h4>
        <div className="mdl-dialog__content">
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
          <div className="mdl-textfield mdl-js-textfield">
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

export default connect(
  mapStateToProps
)(mdlUpgrade(NoteDialog));
