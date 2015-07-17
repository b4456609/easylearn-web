let AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
let EasyLearnConstants = require('../constants/easylearn-constants.jsx');
let EasyLearnActions = require('../action/easylearn-actions.jsx');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

const CHANGE_EVENT = 'change';

let _isSyncFail = false;

let AppStore = assign({}, EventEmitter.prototype, {

  isSyncFail: function() {
    return _isSyncFail;
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
  case EasyLearnConstants.SYNC_FAIL:
    _isSyncFail = true;
    AppStore.emitChange();
    break;

  default:
// no op
  }
});

module.exports = AppStore;
