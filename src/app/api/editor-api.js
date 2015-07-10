let Editor = {
  init: function() {
    console.log('[Editor]init');
    tinymce.init({
      selector: "#editor"
    });
  },
  getContent: function() {
    console.log('[Editor]getContent');
    let content = tinymce.activeEditor.getContent();
    console.log(content);
    return content;
  },

  onContentChange: function(callback) {
    tinymce.activeEditor.on('change', function(e) {
      console.log('[Editor]change event');
      callback();
    });
  }

};

module.exports = Editor;
