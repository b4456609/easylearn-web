let _notes;

function findNote(noteId) {
  for(let item of _notes){
    if(item.id == noteId){
      return item;
    }
  }
}

let Tooltip = {
  init: function(notes) {
    console.log('[Tooltip]init');
    _notes = notes;

    $('.note').tooltipster({
      content: 'Loading...'
    });

    $('.note').mouseover(function (e) {
      let noteId = $(this).attr("noteid");
      let item = findNote(noteId);
      $('.note').tooltipster('content', item.content);
    })
  }
};

module.exports = Tooltip;
