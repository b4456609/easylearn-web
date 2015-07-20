let React = require('react');
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
let PageTemplete = require('../page-templete.jsx');

let {
  Spacing,
  Colors
} = Styles;


let Navigation = Router.Navigation;


let newPack = React.createClass({

  mixins: [
     Navigation
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
      center:{
        width: '30.3%',
        float: 'left',
        marginRight: '3%'

      },
      block: {
        padding: '8px',
        lineHeight: '20px'
      },
      group: {
        marginBottom: 32
      },
      textfield: {
        marginTop: 10,
        width: '100%',
        paddingRight: '8px',
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
      },
      root : {
        margin: '0 auto',
        maxWidth: 660,
      },
      rootWhenLarge:{
        margin: '0 auto',
        maxWidth: 960,
      },
      sidebarMargin:{
        marginLeft: 0
      },
      sidebarMarginWhenLarge:{
        marginLeft: 256
      }
    };

    if(this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)){
      styles.root = this.mergeStyles(styles.root, styles.rootWhenLarge);
      styles.sidebarMargin = this.mergeStyles(styles.sidebarMargin, styles.sidebarMarginWhenLarge);
    }

    return styles;
  },

  render: function() {
    let styles = this.getStyles();

    return (

      <PageTemplete >
        <div style={styles.sidebarMargin}>
          <Paper zDepth={1} style={styles.root}>
            <div style={styles.block}>
              <div style={styles.center}>
              <TextField
                floatingLabelText="標題"
                style={styles.textfield}
                errorText={this.state.errorTitle}
                onChange={this._handleTitleInputChange}/>
              </div>
              <div style={styles.center}>

              <TextField
                floatingLabelText="描述"
                multiLine={true}
                style={styles.textfield}
                onChange={this._handleDesInputChange}/>
                </div>
                <div style={styles.center}>
              <TextField
                floatingLabelText="標籤"
                style={styles.textfield}
                onChange={this._handleTagInputChange}/>
                </div>
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
        </div>
      </PageTemplete>
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
    if(canSubmit === true){
      EasylearnActions.newPack({
        title: this.state.title,
        description: this.state.description,
        tag: this.state.tag,
        is_public: this.state.is_public,
        cover_filename: this.state.cover_filename,
        content: content,
        file: this.refs.editor.getFile()
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
