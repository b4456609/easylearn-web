var React = require('react');
let Router = require('react-router');
var PackStore = require('../../stores/pack-store');
let EasyLearnActions = require('../../action/easylearn-actions.jsx');
let VersionInfo = require('./components/version-info.jsx');
let InsetComment = require('material-ui/lib/svg-icons/editor/insert-comment.js');
let Tooltip = require('../../api/tooltip-api.js');
let UserStore = require('../../stores/user-store.jsx');
let NoteDialog = require('./components/note-dialog.jsx');

let Navigation = Router.Navigation;

let {
  Paper,
  Styles,
  Dialog,
  Snackbar,
  ClearFix,
  TextField,
  RadioButton,
  RaisedButton,
  RadioButtonGroup,
  FloatingActionButton
} = require('material-ui');

function getViewPackState() {
  return {
    pack: PackStore.getViewVersion()
  };
}

function getSelectionCoords(win) {
  win = win || window;
  var doc = win.document;
  var sel = doc.selection,
    range,
    rects,
    rect;
  var x = 0,
    y = 0;

  if (sel) {
    if (sel.type != "Control") {
      range = sel.createRange();
      range.collapse(true);
      x = range.boundingLeft;
      y = range.boundingTop;
    }
  } else if (win.getSelection) {
    sel = win.getSelection();
    console.log(sel);

    let textNode = sel.focusNode;
    let content = document.getElementById('content');
    if (!content.contains(textNode)) {
      return getWindowSize();
    }

    if (sel.isCollapsed == true) {
      return getWindowSize();
    } else if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange();
      if (range.getClientRects) {

        rects = range.getClientRects();
        console.log(rects);
        if (rects.length > 0) {
          rect = range.getClientRects()[0];
        }
        x = rect.right;
        y = rect.top + window.pageYOffset;
      } else {
        return getWindowSize();
      }
    }
  } else {
    return getWindowSize();
  }
  return {
    x: x,
    y: y
  };
}

function getWindowSize() {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return {
    x: w - 100,
    y: h - 50
  }
}

function paintNote(range, noteId) {

  var span = document.createElement("span");
  span.className = "note note-indigo";
  span.setAttribute('noteid', noteId);
  range.surroundContents(span);
}

var ViewPack = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      noteText: '',
      note: {},
      pack: PackStore.getViewVersion(),
      x: 2000,
      y: 2000,
      selectionText: '',
      notifyText: '',
      range: null
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    console.log('[ViewPack]componentDidUpdate');
    Tooltip.destroy();
    Tooltip.init(this.state.pack.version.note, this._onClickNote);
  },

  componentDidMount: function() {
    Tooltip.init(this.state.pack.version.note, this._onClickNote);
    PackStore.addChangeListener(this._onChange);
    let self = this;

    document.onmouseup = function() {
      var coords = getSelectionCoords();
      console.log('document.onmouseup', coords.x, coords.y);
      self.setState({
        x: coords.x,
        y: coords.y
      });
    };

    $(document).not("#content").mouseup(function() {
      self.setState(getWindowSize());
      console.log('$(document).not("#content")');
    });
    self.setState(getWindowSize());
  },

  componentWillUnmount: function() {
    document.onmouseup = null;
    $(document).not("#content").unbind('mouseup');
    PackStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getViewPackState());
  },

  getStyles: function() {
    let styles = {
      contentPaper: {
        marginRight: '324px',
        marginBottom: '16px'
      },
      contentPadding: {
        padding: '16px'
      },
      title: {
        lineHeight: '1.25em',
        fontSize: '25px',
        paddingTop: '6px'
      },
      content: {
        paddingTop: '6px',
        fontSize: '16px'
      },
      rightBlock: {
        float: 'right',
        width: '300px'
      },
      root: {
        maxWidth: '1920px'
      },
      floatBtn: {
        position: 'absolute',
        top: this.state.y + 30,
        left: this.state.x + 20
      }
    };

    let windowSize = getWindowSize();

    if (this.state.y == windowSize.y && this.state.x == windowSize.x) {
      styles.floatBtn.position = 'fixed';
      styles.floatBtn.top = this.state.y - 50;
      styles.floatBtn.left = this.state.x - 50;
    }

    return styles;
  },

  _onClickNote: function(noteText, note) {
    this.setState({
      noteText: noteText,
      note: note
    });
    this.refs.noteDialog.show();
  },

  getNewNoteDialog() {
    let style = {
      width: '100%'
    };
    let buttonStyle = {
      float: 'right'
    }
    let marginBottomStyle = {
      marginBottom: 16
    }
    let colors = {
      orange: {
        backgroundColor: '#FFE0B2',
        borderRadius: '5px'
      },
      teal: {
        backgroundColor: '#B2DFDB',
        borderRadius: '5px'
      },
      indigo: {
        backgroundColor: '#C5CAE9',
        borderRadius: '5px'
      },
      purple: {
        backgroundColor: '#E1BEE7',
        borderRadius: '5px'
      }
    }
    return (
      <Dialog ref="newNoteDialog" title="新增便利貼">
        <h2>{this.state.selectionText}</h2>
        <RaisedButton label="完成" onClick={this._onSubmitNoteButton} secondary={true} style={buttonStyle}/>
        <TextField floatingLabelText="便利貼內容" multiLine={true} ref="noteText" style={style}/>
        <h3 style={marginBottomStyle}>便利貼顏色</h3>
        <RadioButtonGroup defaultSelected="orange" name="color">
          <RadioButton label="Orange" style={marginBottomStyle} labelStyle={colors.orange} value="orange"/>
          <RadioButton label="Teal" style={marginBottomStyle} labelStyle={colors.teal} value="teal"/>
          <RadioButton label="Indigo" style={marginBottomStyle} labelStyle={colors.indigo} value="indigo"/>
          <RadioButton label="Purple" style={marginBottomStyle} labelStyle={colors.purple} value="purple"/>
        </RadioButtonGroup>
      </Dialog>
    );
  },

  _onSubmitNoteButton() {
    let content = this.refs.noteText.getValue().trim();
    if (content !== '') {
      Tooltip.destroy();
//get current time
      var time = new Date();
      var newNote = {
        id: "note" + time.getTime(),
        content: content,
        create_time: time.getTime(),
        comment: [],
        user_id: UserStore.getUserId,
        user_name: UserStore.getUserName
      };
      paintNote(this.state.range, newNote.id);
      let newContent = $('#content').html();

      EasyLearnActions.newNote(newNote, newContent);
      this.refs.newNoteDialog.dismiss();
      EasyLearnActions.sync();

      Tooltip.init(this.state.pack.version.note, this._onClickNote);
    }
  },

  getNotifySnackBar: function() {
    return (
      <Snackbar autoHideDuration={5000} message={this.state.notifyText} ref="notify"/>
    );
  },

  render: function() {
    let styles = this.getStyles();
    let newNote = this.getNewNoteDialog();
    let notifyBar = this.getNotifySnackBar();
    return (
      <div>
        <ClearFix>
          <div style={styles.root}>

            <div style={styles.rightBlock}>
              <ClearFix>
                <VersionInfo currentVersionId={this.state.pack.version.id} versionInfo={this.state.pack.versionInfo}/>
              </ClearFix>
            </div>

            <Paper style={styles.contentPaper} zDepth={1}>
              <div style={styles.contentPadding}>
                <h1 style={styles.title}>
                  {this.state.pack.title}
                </h1>
                <div dangerouslySetInnerHTML={{__html: this.state.pack.version.content}} id="content" style={styles.content}/>
              </div>
            </Paper>

          </div>
          <FloatingActionButton onClick={this._handleNewNoteButtonClick} secondary={true} style={styles.floatBtn}>
            <InsetComment/>
          </FloatingActionButton>
          <NoteDialog note={this.state.note} noteText={this.state.noteText} ref="noteDialog"/>
          {newNote} {notifyBar}
        </ClearFix>
      </div>
    );
  },

  _handleNewNoteButtonClick: function() {
    let selection = window.getSelection();
    let textNode = selection.focusNode;
    let content = document.getElementById('content');
    let text = selection.toString();

// select words and is in version content
    if (text !== '' || !content.contains(textNode)) {
      this.setState({
        range: selection.getRangeAt(0).cloneRange(),
        selectionText: selection.toString().trim()
      })
      this.refs.newNoteDialog.show();
    } else {
      this.setState({
        notifyText: '請選擇文章的文字'
      });
      this.refs.notify.show();
      return;
    }
  }
});

module.exports = ViewPack;
