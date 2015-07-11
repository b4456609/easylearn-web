let _notes;

function findNote(noteId) {
  for(let item of _notes){
    if(item.id == noteId){
      return item;
    }
  }
}

let Tooltip = {
  init: function(notes, clickHandler) {
    console.log('[Tooltip]init');
    _notes = notes;

    $('.note').tooltipster({
      content: 'Loading...'
    });

    $('.note').mouseover(function () {
      let noteId = $(this).attr("noteid");
      let item = findNote(noteId);
      console.log('[Tooltip]mouseover',item);
      $('.note').tooltipster('content', item.content);
    });

    $('.note').click(function () {
      let noteId = $(this).attr("noteid");
      let noteText = $(this).text();
      let item = findNote(noteId);

      clickHandler(noteText, item);
    });
  },

  destroy: function () {
    $('.note').unbind( "mouseover" );
    $('.note').unbind( "click" );
    $('.note').tooltipster('destroy');
  }
};

module.exports = Tooltip;
