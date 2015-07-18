let AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
let EasyLearnConstants = require('../constants/easylearn-constants.jsx');
let EasyLearnActions = require('../action/easylearn-actions.jsx');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

const CHANGE_EVENT = 'change';

let _user = {
  id: '1009840175700426',
  name: '遊客',
  "setting": {
    wifi_sync: true,
    mobile_network_sync: true,
    last_sync_time: 1419519614000,
    version: 0,
    modified: true
  }
};

function setLocalStorage() {
  localStorage.setItem('user', JSON.stringify(_user));
}

function modified() {
  _user.setting.modified = true;
}

function hasUser() {
  if (_user.id === '') {
    return false;
  }
  return true;
}

function getLocalStorage() {
  console.log('[User]getLocalStorage');
  let user = localStorage.getItem('user');
  if (user !== null) {
    _user = JSON.parse(localStorage.getItem('user'));
  }
  console.log('[User]hasUser()' + hasUser());
}

//initial data from localStorage
getLocalStorage();
_user.setting = {
  wifi_sync: true,
  mobile_network_sync: true,
  last_sync_time: 1419519614000,
  version: 0,
  modified: true
};

let UserStore = assign({}, EventEmitter.prototype, {

  getUser: function() {
    return _user;
  },

  getUserId: function() {
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
  case EasyLearnConstants.NEW_PACK:
    _user.setting.modified = true;
    break;

  case EasyLearnConstants.RENAME_FOLDER:
    _user.setting.modified = true;
    break;

  case EasyLearnConstants.SYNC_SUCCESS:
    _user.setting = action.data.setting;
    UserStore.emitChange();
    setLocalStorage();
    break;

  case EasyLearnConstants.LOGIN_SUCCESS:
    _user.id = action.id;
    _user.name = action.name;
    console.log('[LOGIN_SUCCESS]');
    console.log(_user);
    UserStore.emitChange();
    setLocalStorage();
    break;

  default:
// no op
  }
});

module.exports = UserStore;
