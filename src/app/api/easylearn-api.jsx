let FolderStore = require('../stores/folder-store.jsx');
let UserStore = require('../stores/user-store.jsx');
let PackStore = require('../stores/pack-store.jsx');
let EasylearnConfig = require('../api/easylearn-config.js');

let Sync = {
  sync: function(success, fail) {
    var sendData = {
      user: UserStore.getUser(),
      folder: FolderStore.getFolder()
    };

    let packs = PackStore.getSyncAllPack();
    for (let j in packs) {
        sendData[packs[j].id] = packs[j];
    }

    console.log('[sync]Start',sendData);

    var syncAjax = $.ajax({
      method: "POST",
      url: EasylearnConfig.SERVER_URL + 'easylearn/sync',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      crossDomain :true,
      data: {
        sync_data: JSON.stringify(sendData)
      }
    });

//success
    syncAjax.done(function(data) {
      console.log('[sync] success',data);
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

  fileDataUpload:function (id, deletehash) {
    $.ajax({
      url: EasylearnConfig.SERVER_URL+'easylearn/file_data',
      type: 'POST',
      data: {
        id: id,
        deletehash: deletehash
      },
      success:function () {
        console.log('[fileDataUpload]success');
      },
      error:function () {
        console.log('[fileDataUpload]fail');
      }
    });
  }
}

module.exports = Sync;
