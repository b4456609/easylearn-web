var AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
var EasyLearnConstants = require('../constants/easylearn-constants.jsx');
var EasyLearnApi = require('../api/easylearn-api.jsx');

var EasyLearnActions = {

/**
   * @param  {string} packId
   */
  packView: function(packId) {
    console.log('[Action]packView packId: ' + packId);
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.PACK_VIEW,
      packId: packId
    });
  },

  folderView: function (folderId) {
    console.log('[Action]folderView folderId:' + folderId);
    AppDispatcher.dispatch({
      actionType: EasyLearnConstants.FOLDER_VIEW,
      folderId: folderId
    });
  },

  sync: function() {
    let success = function(data) {
      AppDispatcher.dispatch({
        actionType: EasyLearnConstants.SYNC_SUCCESS,
        data: data
      });
    };

    let fail = function() {};

    EasyLearnApi.sync(success, fail);
  }

};

module.exports = EasyLearnActions;
