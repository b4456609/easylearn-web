var AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
var EasyLearnConstants = require('../constants/easylearn-constants.jsx');
let EasyLearnActions = require('../action/easylearn-actions.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

const CHANGE_EVENT = 'change';

let _user = {
  id: '',
  name: '遊客',
  "setting": {
      wifi_sync: true,
      mobile_network_sync: true,
      last_sync_time: 1419519614000,
      version: 0,
      modified: true
    }
};

var UserStore = assign({}, EventEmitter.prototype, {

  getUser: function() {
    return _user;
  },

  getUserId: function() {
    console.log('[getUserId]'+_user.id);
    return _user.id;
  },

  getUserName: function() {
    return _user.name;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

/**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

/**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch (action.actionType) {
  case EasyLearnConstants.SYNC_SUCCESS:
    _user.setting = action.data.setting;
    //_user.name = action.data.user.name;
    UserStore.emitChange();
    break;

  case EasyLearnConstants.LOGIN_SUCCESS:
    _user.id = action.id;
    _user.name = action.name;
    console.log('[LOGIN_SUCCESS]');
    console.log(_user);
    UserStore.emitChange();
    break;

  default:
// no op
  }
});

module.exports = UserStore;
