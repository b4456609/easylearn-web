var AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
var EasyLearnConstants = require('../constants/easylearn-constants.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
let EasyLearnApi = require('../api/easylearn-api.jsx');

const CHANGE_EVENT = 'change';

var _packs = [];
let _packId = '';
let _pack = {};
let _versonId = '';
let _version = {};

function setPacks(data) {
  _packs = [];
  var keys = Object.keys(data);

  for(let i in keys){
    if(keys[i].indexOf('pack') != -1){
      _packs.push(data[keys[i]]);

      //add pack's id
      _packs[_packs.length-1].id = keys[i];
    }
  }
}

function setPackById() {
  for (var i in _packs) {
    if (_packs[i].id === _packId) {
      _pack = _packs[i];
      return;
    }
  }
}

function setVersionToLatest() {
  let version = _pack.version;
  let time = 0;

  for (let i in version) {
    if (version[i].create_time > time) {
      time = version[i].create_time
      _versonId = version[i].id;
      _version = version[i];
    }
  }
}

function replaceImgPath(content, packId) {
  var url = EasyLearnApi.getServerUrl() + 'easylearn/download?pack_id=' + viewPackId + '&filename=';
  var find = 'FILE_STORAGE_PATH' + packId + '/';
  var re = new RegExp(find, 'g');

  content = content.replace(re, url);
  return content;
}

console.log(EasyLearnApi.getServerUrl);

var PackStore = assign({}, EventEmitter.prototype, {

  getFolderList: function(packIdArray) {
    var list = [];
    for (let i in packIdArray) {
      for (let j in _packs) {
        if (packIdArray[i] == _packs[j].id) {
          let item = {
            id: _packs[j].id,
            title: _packs[j].name,
            description: _packs[j].description
          }
          list.push(item);
          break;
        }
      }
    }
    return list;
  },

  getAllPack: function() {
    return _packs;
  },

  getPack: function() {
    return _pack;
  },

  getViewVersion: function() {
    _version.content = replaceImgPath(_version.content, _packId);
    return {
      version: _version,
      title: _pack.name
    };
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
  case EasyLearnConstants.PACK_VIEW:
    _packId = action.packId;
    setPackById();
    setVersionToLatest();
    PackStore.emitChange();
    break;

  case EasyLearnConstants.SYNC_SUCCESS:
    setPacks(action.data);
    PackStore.emitChange();
    break;

  default:
// no op
  }
});

module.exports = PackStore;
