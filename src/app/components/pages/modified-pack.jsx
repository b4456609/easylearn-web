let React = require('react');
let Router = require('react-router');
let {
  Mixins,
  Styles,
  Paper,
  ClearFix,
  RaisedButton,
  Checkbox
} = require('material-ui');
let EditorApi = require('../../api/editor-api.js');
let EasylearnActions = require('../../action/easylearn-actions.jsx');
let PackStore = require('../../stores/pack-store.jsx');
let Editor = require('./components/editor.jsx');
let PageTemplete = require('../page-templete.jsx');

let {
  Colors
} = Styles;

let Navigation = Router.Navigation;

function getContent() {
  return {
    pack: PackStore.getVersionForModified()
  };
}

let ModifiedPack = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    let pack = PackStore.getVersionForModified();
    return {
      is_public: pack.version[0].is_public,
      modifyIndex: 0,
      pack: PackStore.getVersionForModified(),
      backupBtnText: '切換至上次編輯內容'
    };
  },

  componentDidMount: function() {
    PackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PackStore.removeChangeListener(this._onChange);
    tinymce.remove('#editor');
  },

  _onChange: function() {
    this.setState(getContent());
  },

  getStyles: function() {
    let styles = {
      title: {
        marginTop: 8
      },
      block: {
        padding: '8px',
        lineHeight: '20px'
      },
      checkbox: {
        marginTop: 10,
        width: '300px',
        float: 'left'
      },
      editor: {
        marginTop: 30
      },
      submitBtn: {
        float: 'right'
      },
      errorContent: {
        color: Colors.red500
      },
      tool: {
        marginTop: '24px'
      },
      backupBtn: {
        float: 'right',
        marginRight: 8
      }
    };

    return styles;
  },

  getBackupButton: function() {
    let styles = this.getStyles();
    if (this.state.pack.version.length === 1) {
      return null
    } else {
      return (
        <RaisedButton label={this.state.backupBtnText} onTouchTap={this._toggleVersion} style={styles.backupBtn}/>
      )
    }
  },

  render: function() {
    let styles = this.getStyles();
    let backupButton = this.getBackupButton();
    return (
        <PageTemplete>
        <Paper zDepth={1}>
          <div style={styles.block}>

            <h1 style={styles.title}>{this.state.pack.title}</h1>
            <div style={styles.tool}>
              <ClearFix>
                <Checkbox label="公開懶人包" name="is-pulic" onCheck={this._handlePublicChech} style={styles.checkbox} value="is-pulic-value"/>
                <RaisedButton label="完成" onTouchTap={this._onSubmit} primary={true} style={styles.submitBtn}/>
                {backupButton}
              </ClearFix>
            </div>

            <ClearFix>
              <Editor content={this.state.pack.version[this.state.modifyIndex].content} ref="editor"/>
            </ClearFix>

          </div>
        </Paper>
      </PageTemplete>
    );
  },

  _toggleVersion: function() {
    if (this.state.modifyIndex === 0) {
      this.setState({
        modifyIndex: 1,
        backupBtnText: '切換至本次編輯內容'
      });
    } else {
      this.setState({
        modifyIndex: 0,
        backupBtnText: '切換至上次編輯內容'
      });
    }
  },

  _handlePublicChech: function(event) {
    this.setState({
      is_public: event.target.checked
    });
  },

  _onSubmit: function() {

//check title and content
    let content = EditorApi.getContent();
    let canSubmit = true;

    if (content === '') {
      this.setState({
        errorContent: '內容不能為空白'
      });
      canSubmit = false;
    }

//if no error send submit pack action
    if (canSubmit === true) {
      EasylearnActions.modifiedPack({
        is_public: this.state.is_public,
        content: content,
        files: []
      });
      EasylearnActions.sync();
      this.transitionTo('view-pack');
    }
  }
});

module.exports = ModifiedPack;
