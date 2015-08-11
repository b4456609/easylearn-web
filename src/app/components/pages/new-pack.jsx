let React = require('react');
let Router = require('react-router');
let FullWidthSection = require('../full-width-section');
let {
  Mixins, Styles, TextField, Paper, ClearFix, Checkbox, RaisedButton
} = require('material-ui');
let Editor = require('./components/editor.jsx');
let EasylearnActions = require('../../action/easylearn-actions.jsx');
let PageTemplete = require('../page-templete.jsx');
let ImgDialog = require('./components/img-dialog.jsx');

let {
  Spacing, Colors
} = Styles;

let {
  StyleResizable, StylePropable
} = Mixins;

let Navigation = Router.Navigation;

let newPack = React.createClass({

  mixins: [
    StylePropable, StyleResizable, Navigation
  ],

  getInitialState: function() {
    return {
      title: '',
      description: '',
      tag: '',
      cover_filename: '',
      errorContent: ''
    };
  },

  getStyles: function() {
    let styles = {
      col3: {
        width: '100%'
      },
      col3WhenMedium: {
        width: '30.3%',
        float: 'left',
        marginRight: '3%'
      },
      col2: {

        float: 'left',
        width: '50%'
      },
      block: {
        padding: '8px',
        lineHeight: '20px'
      },
      textfield: {
        width: '100%'
      },
      img: {
        maxWidth: '100%'
      },
      checkbox: {
        marginTop: '8px',
        marginBottom: '8px'
      },
      submitBtn: {
        float: 'right'
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = this.mergeStyles(styles.root, styles.rootWhenLarge);
      styles.sidebarMargin = this.mergeStyles(styles.sidebarMargin, styles.sidebarMarginWhenLarge);
    }

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) || this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.col3 = this.mergeStyles(styles.col3, styles.col3WhenMedium);
    }

    return styles;
  },

  render: function() {
    let styles = this.getStyles();

    return (

      <PageTemplete >
        <Paper zDepth={1}>
          <div style={styles.block}>
            <ClearFix>
              <div style={styles.col3}>
                <TextField errorText={this.state.errorTitle} floatingLabelText="標題" onChange={this._handleTitleInputChange} style={styles.textfield}/>
              </div>
              <div style={styles.col3}>
                <TextField floatingLabelText="描述" multiLine={true} onChange={this._handleDesInputChange} style={styles.textfield}/>
              </div>
              <div style={styles.col3}>
                <TextField floatingLabelText="標籤" style={styles.textfield}/>
              </div>

              <div style={styles.col2}>
                <Checkbox defaultChecked={true} label="公開懶人包" name="is-pulic" ref="publicInfo" style={styles.checkbox} value="is-pulic-value"/>
              </div>
              <div style={styles.col2}>
                <RaisedButton label="選擇封面照片" onClick={this._onChangeCoverClick} secondary={true}/>
              </div>

            </ClearFix>
          </div>
          <img id="cover-img" src={"img/305.png"} style={styles.img}/>
          <Editor ref="editor"/>
          <div style={styles.block}>

            <ClearFix>
              <RaisedButton label="完成" onTouchTap={this._onSubmit} primary={true} style={styles.submitBtn}/>
            </ClearFix>
          </div>
        </Paper>
        <ImgDialog ref="imgDialog" success={this.successCallback}/>
      </PageTemplete>
    );
  },

  successCallback(link, filename) {
    $('#cover-img').attr('src', link);
    this.setState({
      cover_filename: filename
    });
  },

  _onChangeCoverClick() {
    this.refs.imgDialog.show();
  },

  _handleDesInputChange: function(event) {
    this.setState({
      description: event.target.value.trim()
    });
  },

  _onSubmit: function() {
    let content = '';
    let title = this.state.title;
    let canSubmit = true;

    if (this.refs.editor.isEmpty()) {
      canSubmit = false;
    } else {
      content = this.refs.editor.getContent();
    }

    if (title === '') {
      this.setState({
        errorTitle: '標題不能為空白'
      });
      canSubmit = false;
    }

//if no error send submit pack action
    if (canSubmit === true) {
      //action with sync call back because reference async
      EasylearnActions.newPack({
        title: this.state.title,
        description: this.state.description,
        tag: this.state.tag,
        is_public: this.refs.publicInfo.isChecked(),
        cover_filename: this.state.cover_filename,
        content: content,
        file: this.refs.editor.getFile()
      }, function() {
        EasylearnActions.sync();
      });

      this.transitionTo('folder-list');
    }
  },

  _handleTitleInputChange: function(event) {
    let value = event.target.value.trim();
    let errorText = '';
    if (value === '') {
      errorText = '標題不能為空白';
    }

    this.setState({
      title: value,
      errorTitle: errorText
    });
  }

});

module.exports = newPack;
