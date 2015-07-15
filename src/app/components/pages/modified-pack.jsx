var React = require('react');
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

let {
  Colors
} = Styles;

let Navigation = Router.Navigation;

function getContent() {
  return {
    pack: PackStore.getVersionForModified()
  };
}

var ModifiedPack = React.createClass({

  mixins: [Navigation],

  getInitialState: function() {
    let pack = PackStore.getVersionForModified();
    return {
      is_public: pack.version[0].is_public,
      modifyIndex: 0,
      pack: PackStore.getVersionForModified()
    };
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
      title:{
        marginTop: 8
      },
      block: {
        padding: '8px',
        lineHeight: '20px'
      },
      checkbox: {
        marginTop: 10,
        width: '300px',
        float: 'left',
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
      }
    };

    return styles;
  },

  componentWillUnmount: function() {
    tinymce.remove('#editor');
  },

  render: function() {
    let styles = this.getStyles();

    return (
      <ClearFix>
        <Paper zDepth={1}>
          <div style={styles.block}>

            <h1 style={styles.title}>{this.state.pack.title}</h1>
            <div style={styles.tool}>
              <ClearFix>
                <Checkbox label="公開懶人包" name="is-pulic" onCheck={this._handlePublicChech} style={styles.checkbox} value="is-pulic-value"/>

                <RaisedButton label="完成" onTouchTap={this._onSubmit} primary={true} style={styles.submitBtn}/>
              </ClearFix>
            </div>


            <ClearFix>
              <Editor ref="editor" content={this.state.pack.version[this.state.modifyIndex].content}/>
            </ClearFix>

          </div>
        </Paper>
      </ClearFix>
    );
  },


  _handlePublicChech: function(event) {
    console.log(event.target.checked);
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
    if (canSubmit == true) {
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
