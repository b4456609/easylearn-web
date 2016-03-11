let FolderStore = require('../stores/folder-store.jsx');
let UserStore = require('../stores/user-store.jsx');
let PackStore = require('../stores/pack-store.jsx');
let EasylearnConfig = require('../api/easylearn-config.js');

let EasylearnApi = {
  sync: function(success, fail) {
    var sendData = {
      user: UserStore.getUser(),
      folder: FolderStore.getFolder()
    };

    let packs = PackStore.getSyncAllPack();
    for (let j in packs) {
      sendData[packs[j].id] = packs[j];
    }

    console.log('[sync]Start', sendData);

    var syncAjax = $.ajax({
      method: "POST",
      url: EasylearnConfig.SERVER_URL + 'sync',
      contentType: "application/json; charset=UTF-8",
      crossDomain: true,
      data: JSON.stringify(sendData)
    });

//success
    syncAjax.done(function(data) {
      console.log('[sync] success', data);
      success(data);
    });

//fail
    syncAjax.fail(function(xhr, textStatus, error) {
      console.log('[sync] fail');
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
      fail();
    });
  },

  fileDataUpload: function(id, deletehash) {
    $.ajax({
      url: EasylearnConfig.SERVER_URL + 'file_data',
      type: 'POST',
      data: {
        id: id,
        deletehash: deletehash
      },
      success: function() {
        console.log('[fileDataUpload]success');
      },
      error: function() {
        console.log('[fileDataUpload]fail');
      }
    });
  },

  postComment: function(noteId, newComment) {
    console.log('[postComment]',noteId, newComment);
    var jsonObj = JSON.stringify(newComment);
    $.ajax({
      type: "POST",
      url: EasylearnConfig.SERVER_URL + 'comment',
      data: {
        noteId: noteId,
        newComment: jsonObj
      },
      success: function() {
        console.log('[postComment]success');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('[postComment]error');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  },

  getComment: function(NoteId,callback) {
    console.log('[getComment]',NoteId);
    //set url for get comment
    var url = EasylearnConfig.SERVER_URL + 'comment?note_id=' + NoteId;
    console.log(url);
    $.ajax({
      type: "GET",
      url: url,
      success: function(data) {
        console.log('success get comment');
        console.log(data);
        callback(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }
}
module.exports = EasylearnApi;
