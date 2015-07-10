var AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
var EasyLearnConstants = require('../constants/easylearn-constants.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
let EasylearnConfig = require('../api/easylearn-config.js');
let UserStore = require('./user-store.jsx');

const CHANGE_EVENT = 'change';

var _packs = [];
let _packId = '';
let _pack = {};
let _versonId = '';
let _version = {};

function setPacks(data) {
  _packs = [];
  var keys = Object.keys(data);

  for (let i in keys) {
    if (keys[i].indexOf('pack') != -1) {
      _packs.push(data[keys[i]]);

//add pack's id
      _packs[_packs.length - 1].id = keys[i];
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

function newPack(data) {
  console.log('[PackStore]newPack');
  var time = new Date().getTime();

  let newPackItem = {
    id: data.id,
    create_time: time,
    name: data.title,
    description: data.description,
    tags: data.tag,
    is_public: data.is_public,
    cover_filename: data.cover_filename,
    creator_user_id: UserStore.getUserId(),
    creator_user_name: UserStore.getUserName(),
    version: [
      {
        id: "version" + time,
        content: data.content,
        create_time: time,
        is_public: data.is_public,
        creator_user_id: UserStore.getUserId(),
        creator_user_name: UserStore.getUserName(),
        bookmark: [],
        note: [],
        file: [],
        version: 0,
        modified: false,
        view_count: 0,
        user_view_count: 0
      }
    ]
  };

  console.log(newPackItem);

  _packs.push(newPackItem);
}

function replaceImgPath(content, packId) {
  var url = EasylearnConfig.SERVER_URL + 'easylearn/download?pack_id=' + packId + '&filename=';
  var find = 'FILE_STORAGE_PATH' + packId + '/';
  var re = new RegExp(find, 'g');

  content = content.replace(re, url);
  return content;
}

function getVersionInfo() {

  let result = [];

  _pack.version.sort(function (a,b) {
    return b.create_time-a.create_time;
  });

  for (let item of _pack.version) {
    //it's backup version
    if(result.length !== 0 && result[result.length-1].id == item.id){
      continue;
    }

    //other people's private version
    if(item.is_public == false && item.creator_user_id != UserStore.getUserId()){
      continue;
    }

    var time = new Date(item.create_time);
    var timeString = time.toLocaleString("zh-TW", {
      hour: '2-digit',
      minute: 'numeric',
      day: "numeric",
      month: "numeric",
      year: 'numeric'
    });

    let versionInfo = {
      text: timeString + ' ' + item.creator_user_name,
      id: item.id
    };

    result.push(versionInfo);
  }
  return result;
}

function checkoutVersion(versionId) {
  let version = _pack.version;

  version.sort(function (a,b) {
    return b.create_time-a.create_time;
  });

  for (let i in version) {
    if (version[i].id == versionId) {
      _versonId = versionId;
      _version = version[i];
    }
  }
}

var PackStore = assign({}, EventEmitter.prototype, {

  getDeleteList: function() {
    let result = [];
    for (let item of _packs) {
      let time = new Date(item.create_time);
      let timeString = time.toLocaleString("zh-TW", {
        year: 'numeric',
        hour: '2-digit',
        minute: 'numeric',
        day: "numeric",
        month: "numeric"
      });

      let pack = {
        name: {
          content: item.name
        },
        description: {
          content: item.description
        },
        create_time: {
          content: timeString
        }
      };

      result.push(pack);
    }
    return result;
  },

  getFolderList: function(packIdArray) {
    var list = [];
    for (let i in packIdArray) {
      for (let j in _packs) {
        if (packIdArray[i] == _packs[j].id) {
//set img
          let img = 'img/light102.png';
          if (_packs[j].cover_filename !== "") {
            img = EasylearnConfig.SERVER_URL + 'easylearn/download?filename=' + _packs[j].cover_filename + '&pack_id=' + _packs[j].id;
          }

          let item = {
            id: _packs[j].id,
            title: _packs[j].name,
            description: _packs[j].description,
            img: img
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
      title: _pack.name,
      versionInfo: getVersionInfo()
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

  case EasyLearnConstants.NEW_PACK:
    newPack(action.data);
    PackStore.emitChange();
    break;
  case EasyLearnConstants.CHECKOUT_VERSION:
    checkoutVersion(action.versionId);
    PackStore.emitChange();
    break;

  default:
// no op
  }
});

module.exports = PackStore;
