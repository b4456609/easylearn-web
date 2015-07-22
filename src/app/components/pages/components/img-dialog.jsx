let React = require('react');
let ImgurApi = require('../../../api/imgur-api.js');
let {
  Styles,
  TextField,
  ClearFix,
  FlatButton,
  Dialog,
  CircularProgress,
  LinearProgress
} = require('material-ui');

function getExtension(filename) {
  let parts = filename.split('.');
  return parts[parts.length - 1];
}

function isImage(filename) {
  let ext = getExtension(filename);
  switch (ext.toLowerCase()) {
  case 'jpg' :
  case 'gif' :
  case 'bmp' :
  case 'png' :
//etc
    return true;
  }
  return false;
}

function readURL(input) {
  $('#img-preview').attr('src', '');
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

    let reader = new FileReader();

    reader.onload = function(e) {
      $('#img-preview').attr('src', reader.result);
      return true;
    }
    reader.readAsDataURL(input.files[0]);
  }

}


let ImgDialog = React.createClass({
  getInitialState: function() {
    return {
      previewImg: false,
      progressValue: 0
    };
  },

  getStyles: function() {
    return {
      textFullWidth: {
        width: '100%'
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

  show: function() {
    let self = this;
    this.refs.imgDialog.show();
  },

  componentDidMount: function() {
    let a = document.getElementById('previewImgInput');
    console.log('componentDidMount' +a);
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
    let loadingDialog = this.getLoadingDialog();
    let progressDialog = this.getDeterminateLoadingDialog();

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
        <img alt="" id="img-preview" src={this.state.previewImg} style={styles.previewImg}/>
      );
    }

    return (
      <div>
        <Dialog actions={standardActions} ref="imgDialog" title="更換圖片">
        <TextField floatingLabelText="圖片網址" onChange={this._handleImgDialogtChange} ref="imgInput" style={styles.textFullWidth}/>

        <FlatButton label="從電腦裡選擇圖片" onClick={this.handleChooseBtn} primary={true}>
          <input id="previewImgInput" style={styles.exampleImageInput} type="file"/>
        </FlatButton>
        {img}

        <p id="error-img"/>
      </Dialog>
      {loadingDialog}
      {progressDialog}
      </div>
    );
  },

  handleChooseBtn: function () {
    let self = this;
    $("#previewImgInput").change(function() {
      console.log('previewImgInput');
      let result = readURL(this);
      self.setState({
        previewImg: result
      });
    });
  },

  _handleImgDialogSubmit: function() {
    let self = this;
    let value = this.refs.imgInput.getValue().trim();

    let success = function(item) {
      self.refs.loadingDialog.dismiss();
      self.refs.determinateLoadingDialog.dismiss();
//get file name
      let filename = item.link.substring(item.link.lastIndexOf('/') + 1);

//callback function
      self.props.success(item.link, filename);
    };

    let fail = function() {
      self.refs.loadingDialog.dismiss();

    };

    if (value === '' && this.state.previewImg === false) {
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

      let base64 = $('#img-preview').attr('src');
      base64 = base64.substring(base64.indexOf(',') + 1);
      ImgurApi.uploadImgUseBase64(base64, success, fail, this._handleProgressChange);
    }
  },

    _handleProgressChange: function(value) {
      this.setState({
        progressValue: value
      });
    },


  _handleImgDialogtChange: function() {
    this.refs.imgInput.setErrorText('');
  },

});

module.exports = ImgDialog;
