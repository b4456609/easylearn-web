var React = require('react');
let {
  Dialog,
  TextField,
  RaisedButton,
  FlatButton
} = require('material-ui');
let EasylearnActions = require('../../../action/easylearn-actions.jsx');
var NoteDialog = React.createClass({

  getStyles: function () {
    return {
      commentHeader: {
        marginTop: 16
      },
      commentUser: {
        fontWeight: 'bold'
      },
      commentTime: {
        float: 'right'
      },
      commentContent: {
        fontSize: 13,
        marginTop: 8
      },
      commentItem: {
        marginTop: 8
      },
      commentUserBlock: {
        marginTop: 8
      },
      divider: {
        margin: 0,
        marginTop: '-1px',
        marginLeft: '0',
        height: '1px',
        border: 'none',
        backgroundColor: '#e0e0e0'
      },
      textField: {
        width: '100%'
      },
      submitBtn: {
        width: 100
      },
      commentBlock: {
        height: 500
      }
    };
  },

  render: function() {
    let styles = this.getStyles();

    if (Object.keys(this.props.note).length === 0) {
      return null;
    }
    let content = (
      <h3>{this.props.note.content}</h3>
    );

    let comment = (this.props.note.comment.map(function(item) {
      var time = new Date(item.create_time);
      var timeString = time.toLocaleString("zh-TW", {
        hour: '2-digit',
        minute: 'numeric',
        day: "numeric",
        month: "numeric",
        year: 'numeric'
      });
      return (
        <div style={styles.commentItem}>
          <hr style={styles.divider}/>
          <div style={styles.commentUserBlock}>
            <span style={styles.commentUser}>
              {item.user_name}
            </span>
            <span style={styles.commentTime}>
              {timeString}
            </span>
          </div>
          <span style={styles.commentContent}>{item.content}</span>
        </div>
      );
    }));

    let userInput = (
      <div>
        <table>
          <tr>
            <td style={styles.textField}>
              <TextField floatingLabelText="留言" multiLine={true} ref="message" style={styles.textField}/>
            </td>
            <td style={styles.submitBtn}>
              <RaisedButton label="送出" onClick={this._onSubmitMessage}/>
            </td>
          </tr>
        </table>
      </div>
    )

    let scrollableCustomActions = [
      <FlatButton
        key={1}
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleScrollableDialogCancel} />
    ];

    return (
      <Dialog  actions={scrollableCustomActions} autoDetectWindowHeight={true} autoScrollBodyContent={true} ref="noteDialog" title={this.props.noteText}>
        <div style={styles.commentBlock}>
          {content}
          <h3 style={styles.commentHeader}>Comment:</h3>
          {comment} {userInput}
        </div>
      </Dialog>
    );
  },

  _handleScrollableDialogCancel(){
    this.refs.noteDialog.dismiss();    
  },

  show(){
    this.refs.noteDialog.show();
  },

  _onSubmitMessage: function() {
    let text = this.refs.message.getValue().trim();
    //error check
    if (text === '') {
      this.refs.message.setErrorText('請輸入留言');
      return;
    }

    this.refs.message.setErrorText('');
    this.refs.message.setValue('');

    EasylearnActions.newComment(text, this.props.note.id);
  }

});

module.exports = NoteDialog;
