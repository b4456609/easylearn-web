var React = require('react');
let EditorApi = require('../../../api/editor-api.js');
let ImgurApi = require('../../../api/imgur-api.js');
let YoutubeApi = require('../../../api/youtube-api.js');
let SlideShareApi = require('../../../api/slideshare-api.js');
let {
  Styles,
  TextField,
  ClearFix,
  FlatButton,
  Dialog,
  CircularProgress,
  LinearProgress
} = require('material-ui');

let {
  Spacing,
  Colors
} = Styles;

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

function isImage(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
  case 'jpg':
  case 'gif':
  case 'bmp':
  case 'png':
//etc
    return true;
  }
  return false;
}

function readURL(input) {
  console.log(input.files[0]);
  $('#blah').attr('src', '');
  if (!input) {
    $('#error-img').text("找不到 fileinput element");
    return false;
  } else if (!input.files) {
    $('#error-img').text("此瀏覽器不支援此上傳方式");
    return false;
  } else if (!input.files[0]) {
    //$('#error-img').text("請選擇圖片");
    return false;
  } else if (!isImage(input.files[0].name)) {
    //$('#error-img').text("請選擇圖片");
    return false;
  } else if (input.files[0].size > 10000000) {
    $('#error-img').text("檔案大小不能超過10MB");
    return false;
  } else {
    let file = input.files[0];

    var reader = new FileReader();

    reader.onload = function(e) {
      $('#blah').attr('src', reader.result);
      return true;
    }
    reader.readAsDataURL(input.files[0]);
  }

}

var Editor = React.createClass({
  propTypes: {
    content: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      content: ''
    };
  },

  getInitialState: function() {
    return {
      errorTitle: '',
      file: [],
      previewImg: false,
      progressValue: 0
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    console.log('[Editor]componentDidUpdate');
    if(this.props.content !== '')
      EditorApi.setContent(this.props.content);
  },

  componentWillUnmount: function() {
    EditorApi.remove();
  },

  componentDidMount: function() {
    if (this.props.content !== '')
      EditorApi.init(this._onClickImgButton, this._onClickSlideshareButton, this._onClickYoutubeButton, this.props.content);
    else
      EditorApi.init(this._onClickImgButton, this._onClickSlideshareButton, this._onClickYoutubeButton);
  },

  getFile: function () {
    return this.state.file;
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
        fontSize: 24,
        fontWeight: 'bold'
      },
      previewImg: {
        width: '100px',
        height: 'auto',
        display: 'block'
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        width: '100%',
        opacity: '0'
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

    let img = null;

    if (this.state.previewImg !== false) {
      img = (
        <img alt="" id="blah" src={this.state.previewImg} style={styles.previewImg}/>
      );
    }

    return (
      <Dialog actions={standardActions} ref="imgDialog" title="插入圖片">
        <TextField floatingLabelText="圖片網址" onChange={this._handleImgDialogtChange} ref="imgInput" style={styles.textFullWidth}/>

        <FlatButton label="從電腦裡選擇圖片" primary={true}>
          <input id="imgInp" style={styles.exampleImageInput} type="file"/></FlatButton>
        {img}

        <p id="error-img"/>
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
        onTouchTap: this._handleSlideshareDialogSubmit
      }
    ];

    return (
      <Dialog actions={standardActions} ref="slideshareDialog" title="插入Slideshare">
        <TextField floatingLabelText="Slideshare網址" ref="slideshareInput" style={styles.textFullWidth} value="http://www.slideshare.net/Branded3/what-is-the-future-of-seo-50393085"/>
        <h3 style={styles.dialogHeader}>進階選項</h3>
        <TextField floatingLabelText="開始頁數" ref="slideshareStartInput" style={styles.textHalfWidth} value="0"/>
        <TextField floatingLabelText="結束頁數" ref="slideshareEndInput" style={styles.textHalfWidth} value="0"/>
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
        <p style={styles.loadingText}>請稍後</p>
      </Dialog>
    );
  },

  getDeterminateLoadingDialog: function() {
    return (
      <Dialog ref="determinateLoadingDialog">
        <LinearProgress mode="determinate" value={this.state.progressValue}/>
      </Dialog>
    );
  },

  render: function() {
    let styles = this.getStyles();
    let imgDialog = this.getImgDialog();
    let slideshareDialog = this.getSlideshareDialog();
    let YoutubeDialog = this.getYoutubeDialog();
    let loadingDialog = this.getLoadingDialog();
    let progressDialog = this.getDeterminateLoadingDialog();
    return (
      <ClearFix>
        <div style={styles.editor}>
          <div style={styles.errorContent}>
            {this.state.errorContent}
          </div>
          <textarea id="editor"/>
        </div>
        {imgDialog} {slideshareDialog} {YoutubeDialog} {loadingDialog} {progressDialog}
      </ClearFix>
    );
  },

  _onClickImgButton: function() {
    let self = this;
    this.refs.imgDialog.show();
    this.refs.imgInput.focus();

    $('#imgChooseButton').on('click', function() {
      $('#yourinputname').trigger('click');
    });

    $("#imgInp").change(function() {
      let result = readURL(this);
      self.setState({
        previewImg: result
      });
    });
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

  _handleSlideshareDialogSubmit: function() {
    let self = this;
    let url = this.refs.slideshareInput.getValue().trim();
    let start = this.refs.slideshareStartInput.getValue().trim();
    let end = this.refs.slideshareEndInput.getValue().trim();

    if (url === '') {
      this.refs.slideshareInput.setErrorText('網址不能空白');
    } else {
      this.refs.slideshareDialog.dismiss();
      this.refs.loadingDialog.show();

      let fail = function() {
        self.refs.loadingDialog.dismiss();
      };

      let success = function(result) {
        ImgurApi.uploadMultipleImg(result.img, function(items) {
          console.log('[SlideshareDialogSubmit]', items);
          let code = '';
          for (var i in items) {
            let filename = items[i].link.substring(items[i].link.lastIndexOf('/') + 1);
            self.state.file.push(filename);
            var img = "<img id='" + items[i].id + "' class='slideshare-img " + result.path + " ' src='" + items[i].link + "' style='max-width:100% !important; height:auto;' >";
            code += img;
          }
          EditorApi.insertContent(code);
          self.refs.loadingDialog.dismiss();
        });
      };

      SlideShareApi.getSlideshareImg(url, start, end, success, fail);
    }

  },

  _handleYoutubeDialogSubmit: function() {
    let youtubeUrl = this.refs.youtubeInput.getValue().trim();
    let start = this.refs.youtubeStartInput.getValue().trim();
    let end = this.refs.youtubeEndInput.getValue().trim();

    if (youtubeUrl === '') {
      this.refs.youtubeInput.setErrorText('網址不能空白');
    } else {
      this.refs.youtubeDialog.dismiss();
      let code = YoutubeApi.generateYoutubeEmbedCode(youtubeUrl, start, end);
      EditorApi.insertContent(code);
    }

  },

  _handleImgDialogSubmit: function() {
    let self = this;
    let value = this.refs.imgInput.getValue().trim();

    let success = function(item) {
      self.refs.loadingDialog.dismiss();
      self.refs.determinateLoadingDialog.dismiss();
//get file name
      let filename = item.link.substring(item.link.lastIndexOf('/') + 1);
      self.state.file.push(filename);

//img html code
      let img = "<img id='" + item.id + " ' src='" + item.link + "' style='max-width:100% !important; height:auto; display:block;' >";
      EditorApi.insertContent(img);
    };

    let fail = function() {
      self.refs.loadingDialog.dismiss();

    };

    if (value === '' && this.state.previewImg == false) {
      this.refs.imgInput.setErrorText('網址不能空白');
    } else if (value !== '') {
      this.refs.imgDialog.dismiss();
      this.refs.loadingDialog.show();

      ImgurApi.uploadImgUseUrl(value, success, fail);
    } else {
      this.refs.imgDialog.dismiss();
      this.setState({
        progressValue: 0
      });
      this.refs.determinateLoadingDialog.show();

      let base64 = $('#blah').attr('src');
      base64 = base64.substring(base64.indexOf(',') + 1);
      ImgurApi.uploadImgUseBase64(base64, success, fail, this._handleProgressChange);
    }
  },

  _handleProgressChange: function(value) {
    this.setState({
      progressValue: value
    });
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
