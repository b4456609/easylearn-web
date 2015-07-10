let _editor = null;

let Editor = {
  init: function() {
    console.log('[Editor]init');
    tinymce.init({
      selector: "#editor"
    });
    _editor = tinymce.get('editor');
  },
  getContent: function() {
    console.log('[Editor]getContent');
    let content = _editor.getContent();
    console.log(content);
    return content;
  },

  onContentChange: function(callback) {
    _editor.on('change', function(e) {
      console.log('[Editor]change event');
      callback();
    });
  }

};

module.exports = Editor;
