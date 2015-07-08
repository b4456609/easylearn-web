var AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
var EasyLearnConstants = require('../constants/easylearn-constants.jsx');
var EasyLearnApi = require('../api/easylearn-api.jsx');
var FBApi = require('../api/facebook-api.js');

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
    console.log('[Action]Sync');
    let success = function(data) {
      AppDispatcher.dispatch({
        actionType: EasyLearnConstants.SYNC_SUCCESS,
        data: data
      });
    };

    let fail = function() {};

    EasyLearnApi.sync(success, fail);
  },

  fbInit: function(){
    console.log('[Action]fbInit');
    let callback = function(response){
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

  fbLogin: function(){
    let callback = function(response){
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
  }

};

module.exports = EasyLearnActions;
