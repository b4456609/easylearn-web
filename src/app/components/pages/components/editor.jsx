var React = require('react');
let EditorApi = require('../../../api/editor-api.js');
let {
  Styles,
  TextField,
  ClearFix,
  FlatButton,
  Dialog
} = require('material-ui');

let {
  Spacing,
  Colors
} = Styles;

var Editor = React.createClass({

  getInitialState: function() {
    return {
      errorTitle: ''
    };
  },

  componentWillUnmount: function() {
    EditorApi.remove();
  },

  componentDidMount: function() {
    if (this.props.content)
      EditorApi.initAndSetContent(this._onClickImgButton, this._onClickSlideshareButton, this._onClickYoutubeButton, this.props.content);
    else
      EditorApi.init(this._onClickImgButton, this._onClickSlideshareButton, this._onClickYoutubeButton);
  },

  getStyles: function() {
    return {
      editor: {
        marginTop: 30
      },
      errorContent: {
        color: Colors.red500
      },
      textFullWidth:{
        width: '100%'
      },
      textHalfWidth:{
        width: '50%'
      },
      dialogHeader:{
        marginTop: 24
      }
    }
  },

  getImgDialog: function() {
    let styles = this.getStyles();

    let standardActions = [
      { text: '取消' },
      { text: '送出', onTouchTap: this._handleImgDialogSubmit }
    ];

    return (
      <Dialog ref="imgDialog" actions={standardActions} title="插入圖片">
        <TextField floatingLabelText="圖片網址" onChange={this._handleImgDialogtChange} ref="imgInput" style={styles.textFullWidth}/>
      </Dialog>
    );

  },

  getSlideshareDialog: function() {
    let styles = this.getStyles();


    let standardActions = [
      { text: '取消' },
      { text: '送出', onTouchTap: this._handleImgDialogSubmit }
    ];

    return (
      <Dialog ref="slideshareDialog" actions={standardActions} title="插入圖片">
        <TextField floatingLabelText="Slideshare網址" ref="slideshareInput" style={styles.textFullWidth}/>
        <h3 style={styles.dialogHeader}>進階選項</h3>
        <TextField floatingLabelText="開始頁面" ref="youtubeStartInput" style={styles.textHalfWidth}/>
        <TextField floatingLabelText="結束頁面" ref="youtubeEndInput" style={styles.textHalfWidth}/>
      </Dialog>
    );

  },

  getYoutubeDialog: function() {
    let styles = this.getStyles();

    let standardActions = [
      { text: '取消' },
      { text: '送出', onTouchTap: this._handleImgDialogSubmit }
    ];

    return (
      <Dialog ref="youtubeDialog" actions={standardActions} title="插入圖片">
        <TextField floatingLabelText="Youtube網址" ref="youtubeInput" style={styles.textFullWidth}/>
        <h3 style={styles.dialogHeader}>進階選項</h3>
        <TextField floatingLabelText="開始時間" ref="youtubeStartInput" style={styles.textHalfWidth}/>
        <TextField floatingLabelText="結束時間"  ref="youtubeEndInput" style={styles.textHalfWidth}/>
      </Dialog>
    );

  },

  render: function() {
    let styles = this.getStyles();
    let imgDialog = this.getImgDialog();
    let slideshareDialog = this.getSlideshareDialog();
    let YoutubeDialog = this.getYoutubeDialog();
    return (
      <ClearFix>
        <div style={styles.editor}>
          <div style={styles.errorContent}>
            {this.state.errorContent}
          </div>
          <textarea id="editor"/>
        </div>
        {imgDialog}
        {slideshareDialog}
        {YoutubeDialog}
      </ClearFix>
    );
  },


  _onClickImgButton: function () {
    this.refs.imgDialog.show();
  },

  _onClickYoutubeButton: function () {
    this.refs.youtubeDialog.show();
  },

  _onClickSlideshareButton: function () {
    this.refs.slideshareDialog.show();
  },

  _handleImgDialogtChange: function () {
    this.refs.imgInput.setErrorText('');
  },

  _handleImgDialogSubmit: function() {
    let value = this.refs.imgInput.getValue().trim();
    if (value === '') {
      this.refs.imgInput.setErrorText('網址不能空白');
    }
  },

  _handleContentChange: function() {
    this.setState({
      errorContent: ''
    });
  },

  isEmpty: function() {
    EditorApi.onContentChange(this._handleContentChange);
    if (EditorApi.getContent().trim() === '') {
      this.setState({
        errorContent: '內容不能為空白'
      });
      return true;
    }
    return false;
  },

  getContent: function() {
    return EditorApi.getContent();
  }

});

module.exports = Editor;
