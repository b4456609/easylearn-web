/* eslint-disable */
function addImgButton(editor, callback) {
  editor.addButton('img', {
    text: 'Img',
    icon: false,
    onclick() {
      callback();
    }
  });
}

function addSlideshareButton(editor, callback) {
  editor.addButton('slideshare', {
    text: 'Slideshare',
    icon: false,
    onclick() {
      callback();
    }
  });
}

function addYoutubeButton(editor, callback) {
  editor.addButton('youtube', {
    text: 'Youtube',
    icon: false,
    onclick() {
      callback();
    }
  });
}

const Editor = {
  init(imgcallback, slideshareCallback, youtubeCallback, content) {
    console.log('[Editor]init');
    tinymce.init({
      selector: '#editor',
      resize: true,
      content_style: "p {font-size: 1.5em;}",
      min_height: 400,
      // language: 'zh_TW',
      plugins: 'advlist autolink lists link charmap preview hr anchor searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime nonbreaking table contextmenu directionality emoticons paste textcolor colorpicker textpattern imagetools',
      toolbar1: 'insertfile undo redo | styleselect | bold italic strikethrough | bullist numlist | link table',
      toolbar2: 'fullscreen | forecolor backcolor emoticons charmap | youtube slideshare img',
      setup(editor) {
        editor.on('init', () => {
          if (typeof content === 'string') {
            tinymce.activeEditor.setContent(content);
          }
        });
        addYoutubeButton(editor, youtubeCallback);
        addSlideshareButton(editor, slideshareCallback);
        addImgButton(editor, imgcallback);
      }
    });
  },

  setContent(content) {
    tinymce.activeEditor.setContent(content);
  },

  getContent() {
    const content = tinymce.activeEditor.getContent();
    console.log('[Editor]getContent', content);
    return content;
  },

  onContentChange(callback) {
    tinymce.activeEditor.on('change', (e) => {
      console.log('[Editor]change event');
      callback();
    });
  },

  remove() {
    tinymce.remove('#editor');
  },

  initAndSetContent(content) {
    console.log('[Editor]initAndSetContent', content);

    this.init(() => {
      tinymce.activeEditor.setContent(content);
    });
  },

  insertContent(content) {
    console.log('[Editor]insertContet', content);
    tinymce.activeEditor.insertContent(content);
  }

};

module.exports = Editor;
