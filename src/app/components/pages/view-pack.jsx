var React = require('react');
let Router = require('react-router');
var PackStore = require('../../stores/pack-store');
let EasyLearnActions = require('../../action/easylearn-actions.jsx');
let VersionInfo = require('./components/version-info.jsx');

let Tooltip = require('../../api/tooltip-api.js');

let Navigation = Router.Navigation;

let {
  Styles,
  Paper,
  ClearFix,
  Dialog,
  TextField,
  RaisedButton,
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
    var sel = doc.selection, range, rects, rect;
    var x = 0, y = 0;
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
        if(sel.isCollapsed ==  true){
          x = 0;
          y = 0;
        }
        else if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {

                rects = range.getClientRects();
                console.log(rects);
                if (rects.length > 0) {
                    rect = range.getClientRects()[0];
                }
                x = rect.right;
                y = rect.top;
            }
            else{
              x = 0;
              y = 0;
            }

            // // Fall back to inserting a temporary element
            // if (x == 0 && y == 0) {
            //     var span = doc.createElement("span");
            //     if (span.getClientRects) {
            //         // Ensure span has dimensions and position by
            //         // adding a zero-width space character
            //         span.appendChild( doc.createTextNode("\u200b") );
            //         range.insertNode(span);
            //         rect = span.getClientRects()[0];
            //         x = rect.left;
            //         y = rect.top;
            //         var spanParent = span.parentNode;
            //         spanParent.removeChild(span);
            //
            //         // Glue any broken text nodes back together
            //         spanParent.normalize();
            //     }
            // }
        }
    }
    return { x: x, y: y };
}

var ViewPack = React.createClass({
  mixins: [Navigation],

  getInitialState: function() {
    return {
      noteText: '',
      note: {},
      pack: PackStore.getViewVersion(),
      x: 0,
      y: 0
    };
  },

  componentWillUpdate: function(nextProps, nextState) {
    Tooltip.destroy();
  },

  componentDidUpdate: function(prevProps, prevState) {
    Tooltip.init(this.state.pack.version.note, this._onClickNote);
  },

  componentDidMount: function() {
    Tooltip.init(this.state.pack.version.note, this._onClickNote);
    PackStore.addChangeListener(this._onChange);
    let self = this;


    document.getElementById("content").onmouseup = function() {
        var coords = getSelectionCoords();
        console.log(coords.x, coords.y);
        self.setState({x: coords.x, y:coords.y});
    };
  },

  componentWillUnmount: function() {
    PackStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getViewPackState());
  },

  getStyles: function() {
    return {
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
      divider: {
        margin: 0,
        marginTop: '-1px',
        marginLeft: '0',
        height: '1px',
        border: 'none',
        backgroundColor: '#e0e0e0'
      },
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
      textField: {
        width: '100%'
      },
      submitBtn: {
        width: 100
      },
      floatBtn:{
        position:'absolute',
        top: this.state.y + 20,
        left: this.state.x + 20
      }
    }
  },

  _onClickNote: function(noteText, note) {
    this.setState({
      noteText: noteText,
      note: note
    });
    this.refs.noteDialog.show();
  },

  getNote: function() {
    let styles = this.getStyles();

    if (Object.keys(this.state.note).length === 0) {
      return null;
    }
    let content = (
      <h3>{this.state.note.content}</h3>
    );

    let comment = (this.state.note.comment.map(function(item) {
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
              <TextField style={styles.textField} ref="message"
                floatingLabelText="留言" multiLine={true} />
            </td>
            <td style={styles.submitBtn}>
              <RaisedButton label="送出"           onClick={this._onSubmitMessage} />
            </td>
          </tr>
        </table>
      </div>
    )

    return (
      <Dialog autoDetectWindowHeight={true} autoScrollBodyContent={true} ref="noteDialog" title={this.state.noteText}>
        <div>
          {content}
          <h3 style={styles.commentHeader}>Comment:</h3>
          {comment}
          {userInput}
        </div>
      </Dialog>
    );
  },

  _onSubmitMessage: function () {
    this.refs.message.setErrorText('');
    let text = this.refs.message.getValue().trim();
    if(text === ''){
      this.refs.message.setErrorText('請輸入留言');
      return;
    }
    console.log(text);

    this.refs.message.setValue('');
  },

  render: function() {
    let styles = this.getStyles();
    let note = this.getNote();
    return (
      <ClearFix>
        <div style={styles.root}>

          <div style={styles.rightBlock}>
            <ClearFix>
              <VersionInfo versionInfo={this.state.pack.versionInfo} currentVersionId={this.state.pack.version.id}/>
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
        {note}
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} style={styles.floatBtn}/>
      </ClearFix>
    );
  }
});

module.exports = ViewPack;
