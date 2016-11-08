import React from 'react';
import { connect } from 'react-redux';
import EditorApi from '../../../api/editor.js';
import YoutubeApi from '../../../api/youtube.js';
import SlideshareApi from '../../../api/slideshare.js';
import { uploadImg, uploadMultipleImg } from '../../../api/imgur.js';
import { showDialog, hideDialog } from '../../../actions';

class Editor extends React.Component {

  constructor() {
    super();
    this.state = {
      img: null,
    };
    this.onSlideshareClose = this.onSlideshareClose.bind(this);
    this.onSlideshareSubmit = this.onSlideshareSubmit.bind(this);
    this.onSlideshareButton = this.onSlideshareButton.bind(this);
    this.getSlideshareDialog = this.getSlideshareDialog.bind(this);
    this.onClickImgButton = this.onClickImgButton.bind(this);
    this.onImageSubmit = this.onImageSubmit.bind(this);
    this.onImageClose = this.onImageClose.bind(this);
    this.getImageDialog = this.getImageDialog.bind(this);
    this.getYoutubeDialog = this.getYoutubeDialog.bind(this);
    this.onYoutubeSubmit = this.onYoutubeSubmit.bind(this);
    this.onYoutubeClose = this.onYoutubeClose.bind(this);
    this.editorInit = this.editorInit.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mdl-componentupgraded', this.editorInit);
  }

  componentWillUnmount() {
    document.removeEventListener('mdl-componentupgraded', this.editorInit);
    EditorApi.remove();
  }

  onSlideshareButton() {
    const dialog = document.getElementById('slideshare-dialog');
    dialog.showModal();
  }

  onSlideshareClose() {
    const dialog = document.getElementById('slideshare-dialog');
    dialog.close();
  }

  onSlideshareSubmit() {
    const slideshareUrl = document.getElementById('slideshare-url').value.trim();
    const start = parseInt(document.getElementById('slideshare-start').value.trim(), 10);
    const end = parseInt(document.getElementById('slideshare-end').value.trim(), 10);

    if (slideshareUrl === '') {
      const snackbarContainer = document.querySelector('#easylearn-toast');
      snackbarContainer.MaterialSnackbar.showSnackbar({ message: '網址不能空白' });
    } else {
      this.onSlideshareClose();
      this.props.dispatch(showDialog('LOADING_DIALOG'));

      SlideshareApi
        .getSlideshareImg(slideshareUrl, start, end)
        .then((data) => {
          uploadMultipleImg(data.img)
            .then((response) => {
              for (const d of response) {
                const link = d.data.link;
                const img = `<img src="${link}" style='max-width:100% !important; height:auto;' >`;
                EditorApi.insertContent(img);
              }
            })
            .then(() => {
              this.props.dispatch(hideDialog());
            })
            .catch(() => {
              this.props.dispatch(hideDialog());
            });
        })
        .catch(() => {
          this.props.dispatch(hideDialog());
        });
    }
  }

  getSlideshareDialog() {
    return (
      <dialog className="mdl-dialog" id="slideshare-dialog">
        <h4 className="mdl-dialog__title">
          插入Slideshare
        </h4>
        <div className="mdl-dialog__content">
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="slideshare-url" />
            <label className="mdl-textfield__label" htmlFor="slideshare-url">slideshare網址</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="slideshare-start" />
            <label className="mdl-textfield__label" htmlFor="slideshare-start">開始頁數</label>
          </div>
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="slideshare-end" />
            <label className="mdl-textfield__label" htmlFor="slideshare-end">結束頁數</label>
          </div>
        </div>
        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button" onClick={this.onSlideshareSubmit}>完成</button>
          <button
            type="button"
            className="mdl-button close"
            onClick={this.onSlideshareClose}
          >取消</button>
        </div>
      </dialog>
    );
  }

  onClickImgButton() {
    const dialog = document.getElementById('img-dialog');
    dialog.showModal();

    document.getElementById('preview-file').onchange = (event) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById('preview-img').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        this.state.img = input.files[0];
      }
    };
  }

  getImageDialog() {
    return (
      <dialog className="mdl-dialog" id="img-dialog">
        <h4 className="mdl-dialog__title">
          插入圖片
        </h4>
        <div className="mdl-dialog__content">
          <div className="mdl-textfield mdl-js-textfield">
            <input type="file" id="preview-file" style={{ display: 'none' }} />
            <label
              htmlFor="preview-file"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            >
              從電腦裡選擇圖片
            </label>
          </div>
          <div>
            <img id="preview-img" alt="" src="" style={{ maxHeight: '300px', maxWidth: '100%' }} />
          </div>
        </div>
        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button" onClick={this.onImageSubmit}>完成</button>
          <button type="button" className="mdl-button close" onClick={this.onImageClose}>取消</button>
        </div>
      </dialog>
    );
  }

  onImageSubmit() {
    if (this.state.img === null) {
      const snackbarContainer = document.querySelector('#easylearn-toast');
      snackbarContainer.MaterialSnackbar.showSnackbar({ message: '沒有選擇圖片' });
    } else {
      const dialog = document.getElementById('img-dialog');
      dialog.close();
      this.props.dispatch(showDialog('LOADING_DIALOG'));
      uploadImg(this.state.img)
        .then((data) => {
          const link = data.data.link;
          const img = `<img src="${link}" style='max-width:100% !important; height:auto;' >`;
          EditorApi.insertContent(img);
        })
        .then(() => {
          this.props.dispatch(hideDialog());
        })
        .catch(() => {
          this.props.dispatch(hideDialog());
        });
    }
  }

  onImageClose() {
    const dialog = document.getElementById('img-dialog');
    dialog.close();
  }

  onClickYoutubeButton() {
    const dialog = document.getElementById('youtube-dialog');
    dialog.showModal();
  }

  getYoutubeDialog() {
    return (
      <dialog className="mdl-dialog" id="youtube-dialog">
        <h4 className="mdl-dialog__title">
          插入Youtube
        </h4>
        <div className="mdl-dialog__content">
          <div className="mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" id="youtube-url" />
            <label className="mdl-textfield__label" htmlFor="youtube-url">Youtube網址</label>
          </div>
        </div>
        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button" onClick={this.onYoutubeSubmit}>完成</button>
          <button
            type="button"
            className="mdl-button close"
            onClick={this.onYoutubeClose}
          >取消</button>
        </div>
      </dialog>
    );
  }

  onYoutubeSubmit() {
    const youtubeUrl = document.getElementById('youtube-url').value.trim();
    const snackbarContainer = document.querySelector('#easylearn-toast');
    if (youtubeUrl === '') {
      snackbarContainer.MaterialSnackbar.showSnackbar({ message: '網址不能空白' });
    } else {
      const dialog = document.getElementById('youtube-dialog');
      const code = YoutubeApi.generateYoutubeEmbedCode(youtubeUrl, 0, 0);
      if (code === null) {
        snackbarContainer.MaterialSnackbar.showSnackbar({ message: '輸入的Youtube網址不正確' });
      }
      EditorApi.insertContent(code);
      dialog.close();
    }
  }

  onYoutubeClose() {
    const dialog = document.getElementById('youtube-dialog');
    dialog.close();
  }

  editorInit() {
    EditorApi.init(this.onClickImgButton, this.onSlideshareButton, this.onClickYoutubeButton, this.props.content);
  }

  render() {
    return (
      <div>
        <div id="editor" className="pack-content" />
        {this.getYoutubeDialog()}
        {this.getImageDialog()}
        {this.getSlideshareDialog()}
      </div>
    );
  }
}

Editor.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  content: React.PropTypes.string,
};

export default connect()(Editor);
