function addImgButton(editor, callback) {
  editor.addButton('img', {
    text: 'Img',
    icon: false,
    onclick: function() {
      callback();
    }
  });
}

function addSlideshareButton(editor, callback) {
  editor.addButton('slideshare', {
    text: 'Slideshare',
    icon: false,
    onclick: function() {
      callback();
    }
  });
}

function addYoutubeButton(editor, callback) {
  editor.addButton('youtube', {
    text: 'Youtube',
    icon: false,
    onclick: function() {
      callback();
    }
  });
}

let Editor = {
  init: function(imgcallback, slideshareCallback, youtubeCallback, callback) {
    console.log('[Editor]init');
    tinymce.init({
      selector: "#editor",
      resize: true,
      min_height: 500,
      language: 'zh_TW',
      plugins: "advlist autolink lists link charmap preview hr anchor searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime nonbreaking table contextmenu directionality emoticons paste textcolor colorpicker textpattern imagetools",
      toolbar1: "insertfile undo redo | styleselect | bold italic strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link table",
      toolbar2: "preview fullscreen | forecolor backcolor emoticons charmap | youtube slideshare img",
      setup: function(editor) {
        editor.on('init', function() {
          typeof callback === 'function' && callback();
        });
        addYoutubeButton(editor,youtubeCallback);
        addSlideshareButton(editor,slideshareCallback);
        addImgButton(editor,imgcallback);
      }
    });
    console.log(tinymce.activeEditor);
  },
  getContent: function() {
    let content = tinymce.activeEditor.getContent();
    console.log('[Editor]getContent', content);
    return content;
  },

  onContentChange: function(callback) {
    tinymce.activeEditor.on('change', function(e) {
      console.log('[Editor]change event');
      callback();
    });
  },

  remove:function () {
    tinymce.remove('#editor');
  },

  initAndSetContent: function(content) {
    console.log('[Editor]setContent');

    this.init(function() {
      tinymce.activeEditor.setContent(content);
    })
  },

  insertContent: function (content) {
    console.log('[Editor]insertContet',content);
    tinymce.activeEditor.insertContent(content);
  }

};

module.exports = Editor;
