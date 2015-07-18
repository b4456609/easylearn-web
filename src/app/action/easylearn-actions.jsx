let AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
let EasyLearnConstants = require('../constants/easylearn-constants.jsx');
let EasylearnApi = require('../api/easylearn-api.jsx');
let FBApi = require('../api/facebook-api.js');
let UserStore = require('../stores/user-store.jsx');

let EasyLearnActions = {

  appInit: function() {
    console.log('[Action]appInit');
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.APP_INIT
    });
  },

  packView: function(packId) {
    console.log('[Action]packView packId: ' + packId);
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.PACK_VIEW,
      packId: packId
    });
  },

  folderView: function(folderId) {
    console.log('[Action]folderView folderId:' + folderId);
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.FOLDER_VIEW,
      folderId: folderId
    });
  },

  sync: function() {
    console.log('[Action]Sync');
    let success = function(data) {
      AppDispatcher.dispatch({
        actionType: EasyLearnConstants.SYNC_SUCCESS,
        data: data
      });
    };

    let fail = function() {
      AppDispatcher.dispatch({
        actionType: EasyLearnConstants.SYNC_FAIL
      });
    };

    EasylearnApi.sync(success, fail);
  },

  fbInit: function() {
    console.log('[Action]fbInit');
    let callback = function(response) {
      if (response.status === 'connected') {
// Logged into your app and Facebook.
//this.testAPI();
        console.log('[fbInit]connected');
        FBApi.me(function(response) {
          console.log('Successful login for: ' + response.name);
          AppDispatcher.dispatch({
            actionType: EasyLearnConstants.LOGIN_SUCCESS,
            id: response.id,
            name: response.name
          });
          EasyLearnActions.sync();
        });
      } else if (response.status === 'not_authorized') {
// The person is logged into Facebook, but not your app.
        console.log('[fbInit]Please log into this app.');
      } else {
// The person is not logged into Facebook, so we're not sure if
// they are logged into this app or not.
        console.log('[fbInit]Please log into Facebook.');
      }
    };
    FBApi.initial(callback);
  },

  fbLogin: function() {
    let callback = function(response) {
      if (response.status === 'connected') {
// Logged into your app and Facebook.
//this.testAPI();
        console.log('[fbInit]connected');
        FBApi.me(function(response) {
          console.log('Successful login for: ' + response.name);
          AppDispatcher.dispatch({
            actionType: EasyLearnConstants.LOGIN_SUCCESS,
            id: response.id,
            name: response.name
          });
          EasyLearnActions.sync();
        });
      } else if (response.status === 'not_authorized') {
// The person is logged into Facebook, but not your app.
        console.log('[fbInit]Please log into this app.');
      } else {
// The person is not logged into Facebook, so we're not sure if
// they are logged into this app or not.
        console.log('[fbInit]Please log into Facebook.');
      }
    };

    FBApi.login(callback);
  },

  newPack: function(data) {
// set packid
    let time = new Date().getTime();
    data['id'] = 'pack' + time;

    console.log('[Action]newPack', data);

    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.NEW_PACK,
      data: data
    });
  },

  modifiedPack: function(data) {
    console.log('[Action]modifiedPack', data);

    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.MODIFIED_PACK,
      is_public: data.is_public,
      content: data.content,
      files: data.files
    });
  },

  deletePack: function(idArray) {
    console.log('[Action]deletePack', idArray);
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.DELETE_PACK,
      idArray: idArray
    });
  },

  checkoutVersion: function(versionId) {
    console.log('[Action]checkoutVersion versionId', versionId);

    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.CHECKOUT_VERSION,
      versionId: versionId
    });
  },

  redoDeletePack: function() {
    console.log('[Action]redoDeletePack');

    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.REDO_DELETE_PACK
    });
  },

  newNote: function(note, versionContent) {
    console.log('[Action]newNote', note, versionContent);

    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.NEW_NOTE,
      note: note,
      versionContent: versionContent
    });
  },

  newComment: function(content, noteId) {
    console.log('[Action]newComment', content, noteId);
//create new comment
    let time = new Date();
    let newComment = {
      id: 'comment' + time.getTime(),
      content: content,
      create_time: time.getTime(),
      user_id: UserStore.getUserId(),
      user_name: UserStore.getUserName()
    };

    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.NEW_COMMENT,
      newComment: newComment,
      noteId: noteId
    });
    EasylearnApi.postComment(noteId, newComment);
  },

  getComment: function (noteId) {
    console.log('[Action]getComment', noteId);

    let success = function (data) {
      AppDispatcher.dispatch({
        actionType: EasyLearnConstants.GET_COMMENT,
        notes: data,
        noteId: noteId
      });
    }

    EasylearnApi.getComment(noteId,success);
  },

  renameFolder: function (folderId, name) {
    console.log('[Action]renameFolder', folderId, name);
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.RENAME_FOLDER,
      folderId: folderId,
      name: name
    });
  },

  movePack: function (packId, originFolderId, targetFolderId) {
    console.log('[Action]movePack',packId, originFolderId, targetFolderId);
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.MOVE_PACK,
      packId: packId,
      originFolderId: originFolderId,
      targetFolderId: targetFolderId
    });
  },

  copyPack: function (packId, targetFolderId) {
    console.log('[Action]copyPack',packId, targetFolderId);
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.COPY_PACK,
      packId: packId,
      targetFolderId: targetFolderId
    });
  },
};

module.exports = EasyLearnActions;
