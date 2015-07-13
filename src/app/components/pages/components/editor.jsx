var React = require('react');
let EditorApi = require('../../../api/editor-api.js');
let ImgurApi = require('../../../api/imgur-api.js');
let {
  Styles,
  TextField,
  ClearFix,
  FlatButton,
  Dialog,
  CircularProgress
} = require('material-ui');

let {
  Spacing,
  Colors
} = Styles;

function generateYoutubeEmbedCode(user_url, start, end) {

//save embed parameter
  var startPar = '',
    endPar = '';

// error input hanlder
  if (start !== 0 && start > 0) {
    startPar += '&start=' + start;
  }
  if (end !== 0 && end > 0 && end > start) {
    endPar += '&end=' + end;
  }
//get input id
  var videoId = youtube_parser(user_url);

//set embed code
  var embedCode = '<p><div id="' + videoId + '" class="youtube video-container">' + '<iframe width="560" height="315" src="http://www.youtube.com/embed/' + videoId + '?controls=1&disablekb=1&modestbranding=1&showinfo=0&rel=0' + startPar + endPar + '" frameborder="0" allowfullscreen></iframe>' + '</div></p>';

  return embedCode;
}

//parse youtube url to id
function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Url incorrecta");
  }
}

var Editor = React.createClass({

  getInitialState: function() {
    return {
      errorTitle: '',
      file: []
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
      textFullWidth: {
        width: '100%'
      },
      textHalfWidth: {
        width: '50%'
      },
      dialogHeader: {
        marginTop: 24
      },
      loadingText: {
        margin: 'auto 0',
        fontSize: 24
      }
    }
  },

  getImgDialog: function() {
    let styles = this.getStyles();

    let standardActions = [
      {
        text: '取消'
      }, {
        text: '送出',
        onTouchTap: this._handleImgDialogSubmit
      }
    ];

    return (
      <Dialog actions={standardActions} ref="imgDialog" title="插入圖片">
        <TextField floatingLabelText="圖片網址" onChange={this._handleImgDialogtChange} ref="imgInput" style={styles.textFullWidth}/>
      </Dialog>
    );

  },

  getSlideshareDialog: function() {
    let styles = this.getStyles();

    let standardActions = [
      {
        text: '取消'
      }, {
        text: '送出',
        onTouchTap: this._handleImgDialogSubmit
      }
    ];

    return (
      <Dialog actions={standardActions} ref="slideshareDialog" title="插入Slideshare">
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
      {
        text: '取消'
      }, {
        text: '送出',
        onTouchTap: this._handleYoutubeDialogSubmit
      }
    ];

    return (
      <Dialog actions={standardActions} ref="youtubeDialog" title="插入Youtube">
        <TextField floatingLabelText="Youtube網址" ref="youtubeInput" style={styles.textFullWidth}/>
        <h3 style={styles.dialogHeader}>進階選項</h3>
        <TextField floatingLabelText="開始時間" ref="youtubeStartInput" style={styles.textHalfWidth}/>
        <TextField floatingLabelText="結束時間" ref="youtubeEndInput" style={styles.textHalfWidth}/>
      </Dialog>
    );

  },

  getLoadingDialog: function() {
    let styles = this.getStyles();
    return (
      <Dialog ref="loadingDialog">
        <CircularProgress mode="indeterminate"/>
        <span style={styles.loadingText}>請稍後</span>
      </Dialog>
    );
  },

  render: function() {
    let styles = this.getStyles();
    let imgDialog = this.getImgDialog();
    let slideshareDialog = this.getSlideshareDialog();
    let YoutubeDialog = this.getYoutubeDialog();
    let loadingDialog = this.getLoadingDialog();
    return (
      <ClearFix>
        <div style={styles.editor}>
          <div style={styles.errorContent}>
            {this.state.errorContent}
          </div>
          <textarea id="editor"/>
        </div>
        {imgDialog} {slideshareDialog} {YoutubeDialog} {loadingDialog}
      </ClearFix>
    );
  },

  _onClickImgButton: function() {
    this.refs.imgDialog.show();
    this.refs.imgInput.focus();
  },

  _onClickYoutubeButton: function() {
    this.refs.youtubeDialog.show();
    this.refs.youtubeInput.focus();
  },

  _onClickSlideshareButton: function() {
    this.refs.slideshareDialog.show();
    this.refs.slideshareInput.focus();
  },

  _handleImgDialogtChange: function() {
    this.refs.imgInput.setErrorText('');
  },

  _handleYoutubeDialogSubmit: function() {
    let youtubeUrl = this.refs.youtubeInput.getValue().trim();
    let start = this.refs.youtubeStartInput.getValue().trim();
    let end = this.refs.youtubeEndInput.getValue().trim();

    if (youtubeUrl === '') {
      this.refs.youtubeInput.setErrorText('網址不能空白');
    } else {
      this.refs.youtubeDialog.dismiss();
      let code = generateYoutubeEmbedCode(youtubeUrl, start, end);
      EditorApi.insertContent(code);
    }

  },

  _handleImgDialogSubmit: function() {
    let self = this;
    let value = this.refs.imgInput.getValue().trim();
    if (value === '') {
      this.refs.imgInput.setErrorText('網址不能空白');
    } else {
      this.refs.imgDialog.dismiss();
      this.refs.loadingDialog.show();
      let success = function(item) {
        self.refs.loadingDialog.dismiss();
//get file name
        let filename = item.link.substring(item.link.lastIndexOf('/') + 1);
        self.state.file.push(filename);

//img html code
        let img = "<img id='" + item.id + " ' src='" + item.link + "' width='100%' >";
        EditorApi.insertContent(img);
      };

      let fail = function() {
        self.refs.loadingDialog.dismiss();

      };

      ImgurApi.uploadImgUseUrl(value, success, fail);
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
