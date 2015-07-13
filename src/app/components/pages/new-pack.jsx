var React = require('react');
let Router = require('react-router');
let FullWidthSection = require('../full-width-section');
let {
  Mixins,
  Styles,
  TextField,
  Paper,
  ClearFix,
  Checkbox,
  RaisedButton
} = require('material-ui');
let Editor = require('./components/editor.jsx');
let EasylearnActions = require('../../action/easylearn-actions.jsx');

let {
  Spacing,
  Colors
} = Styles;
let {
  StyleResizable
} = Mixins;

let Navigation = Router.Navigation;


var newPack = React.createClass({

  mixins: [
    StyleResizable, React.addons.LinkedStateMixin, Navigation
  ],

  getInitialState: function() {
    return {
      title: '',
      description: '',
      tag: '',
      is_public: false,
      cover_filename: '',
      errorContent: ''
    };
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
      left: {
        float: 'left'
      },
      submitBtn:{
        float:'right'
      }
    };

    return styles;
  },

  render: function() {
    let styles = this.getStyles();

    return (
      <ClearFix>
        <Paper zDepth={1}>
          <div style={styles.block}>
            <div style={styles.left}>
              <TextField
                floatingLabelText="標題"
                style={styles.textfield}
                errorText={this.state.errorTitle}
                onChange={this._handleTitleInputChange}/>
              <TextField
                floatingLabelText="描述"
                multiLine={true}
                style={styles.textfield}
                onChange={this._handleDesInputChange}/>
              <TextField
                floatingLabelText="標籤"
                style={styles.textfield}
                onChange={this._handleTagInputChange}/>
              <Checkbox
                label="公開懶人包"
                name="is-pulic"
                style={styles.checkbox}
                value="is-pulic-value"
                onCheck={this._handlePublicChech}/>
              <RaisedButton
                label="選擇封面照片"
                secondary={true}
                style={styles.button}/>
            </div>

            <ClearFix>
              <RaisedButton
                label="完成"
                onTouchTap={this._onSubmit}
                primary={true}
                style={styles.submitBtn}/>
            </ClearFix>
            <Editor ref="editor"/>
          </div>
        </Paper>
      </ClearFix>
    );
  },

  _handlePublicChech:function (event) {
    console.log(event.target.checked);
    this.setState({
      is_public: event.target.checked
    });
  },

  _handleTagInputChange: function (event) {
    this.setState({
      tag: event.target.value.trim()
    });
  },

  _handleDesInputChange: function (event) {
    this.setState({
      description: event.target.value.trim()
    });
  },

  _onSubmit:function () {
    let content = '';
    let title = this.state.title;
    let canSubmit = true;

    if(this.refs.editor.isEmpty()){
      canSubmit = false;
    }
    else{
      content = this.refs.editor.getContent();
    }

    if(title === ''){
      this.setState({
        errorTitle: '標題不能為空白'
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
  },

  _handleTitleInputChange:function (event) {
    let value = event.target.value.trim();
    let errorText = '';
    if(value === ''){
      errorText = '標題不能為空白';
    }

    this.setState({
      title: value,
      errorTitle: errorText
    });
  }

});

module.exports = newPack;
