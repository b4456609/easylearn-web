var React = require('react');
let Router = require('react-router');
let {
  Mixins,
  Styles,
  Paper,
  ClearFix,
  RaisedButton
} = require('material-ui');
let Editor = require('../../api/editor-api.js');
let EasylearnActions = require('../../action/easylearn-actions.jsx');
let PackStore = require('../../stores/pack-store.jsx');

let {
  Colors
} = Styles;

let Navigation = Router.Navigation;

function getContent(){
  return {
    errorContent: '',
    pack: PackStore.getVersionForModified()
  };
}

var newPack = React.createClass({

  mixins: [
    Navigation
  ],

  getInitialState: function() {
    return getContent();
  },

  componentDidMount: function() {
    PackStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PackStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getContent());
  },

  getStyles: function() {
    let styles = {
      block: {
        padding: '8px',
        lineHeight: '20px'
      },
      group: {
        marginBottom: 32
      },
      textfield: {
        display: 'block',
        marginTop: 10
      },
      checkbox: {
        marginTop: 20
      },
      button: {
        marginTop: 30
      },
      editor: {
        marginTop: 30
      },
      left: {
        float: 'left'
      },
      submitBtn:{
        float:'right'
      },
      errorContent:{
        color: Colors.red500
      }
    };

    return styles;
  },

  componentWillUnmount: function() {
    tinymce.remove('#editor');
  },

  componentDidMount: function() {
    if (this.isMounted()) {
      Editor.init();
      Editor.setContent(this.state.pack.content);
    }
  },

  render: function() {
    let styles = this.getStyles();

    return (
      <ClearFix>
        <Paper zDepth={1}>
          <div style={styles.block}>

            <h1>{this.state.pack.title}</h1>

            <ClearFix>
              <RaisedButton
                label="完成"
                onTouchTap={this._onSubmit}
                primary={true}
                style={styles.submitBtn}/>
            </ClearFix>

            <ClearFix>
              <div style={styles.editor}>
                <div style={styles.errorContent}>
                  {this.state.errorContent}
                </div>
                <textarea id="editor"/>
              </div>
            </ClearFix>

          </div>
        </Paper>
      </ClearFix>
    );
  },

  _handleContentChange:function () {
    this.setState({
      errorContent: ''
    });
  },

  _onSubmit:function () {

    Editor.onContentChange(this._handleContentChange);
    //check title and content
    let content = Editor.getContent();
    let canSubmit = true;

    if(content === ''){
      this.setState({
        errorContent: '內容不能為空白'
      });
      canSubmit = false;
    }

    //if no error send submit pack action
    if(canSubmit == true){
      EasylearnActions.newPack({
        title: this.state.title,
        description: this.state.description,
        tag: this.state.tag,
        is_public: this.state.is_public,
        cover_filename: this.state.cover_filename,
        content: content
      });
      EasylearnActions.sync();
      this.transitionTo('folder-list');
    }
  }
});

module.exports = newPack;
