let Editor = {
  init: function(callback) {
    console.log('[Editor]init');
    tinymce.init({
      selector: "#editor",
      resize: true,
      min_height: 500,
      setup: function(editor) {
        editor.on('init', function() {
          typeof callback === 'function' && callback();
        });
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

  initAndSetContent:function (content) {
    console.log('[Editor]setContent');

    this.init(function () {
      tinymce.activeEditor.setContent(content);
    })
  }

};

module.exports = Editor;
