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
let _versionId = '';
let _version = {};

function setPacks(data) {
  let packs = [];
  var keys = Object.keys(data);

  for (let i in keys) {
    if (keys[i].indexOf('pack') != -1) {
      packs.push(data[keys[i]]);

//add pack's id
      packs[packs.length - 1].id = keys[i];
    }
  }

  for (let pack of packs) {
    for (let version of pack.version) {
      version.content = replaceImgPath(version.content, pack.id);
    }
  }

  _packs = packs;

  if (_packId != '') {
    setPackById();
  }
  if (_versionId != '') {
    checkoutVersion(_versionId);
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

  version.sort(function(a, b) {
    return b.create_time = a.create_time
  });
  _versionId = version[0].id;
  _version = version[0];

}

function newNote(newNote, versionContent) {
  _version.note.push(newNote);
  _version.content = versionContent;
  console.log('newNote', newNote, _version.note);
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
        file: data.file,
        version: 0,
        private_id: '',
        view_count: 0,
        user_view_count: 0
      }
    ]
  };

//not private give a private id
  if (!data.is_public) {
    newPackItem.version[0].private_id = 'private' + time;
  }

  console.log(newPackItem);

  _packs.push(newPackItem);
}

function modifiedPackVersion(is_public, content, files) {
  console.log('[PackStore]modifiedPackVersion');
  var time = new Date().getTime();

//TODO replace file path

//TODO add reference

  let newVersion = {
    id: "version" + time,
    content: content,
    create_time: time,
    is_public: is_public,
    creator_user_id: UserStore.getUserId(),
    creator_user_name: UserStore.getUserName(),
    bookmark: [],
    note: _version.note,
    file: files.concat(_version.file),
    version: _version.version,
    private_id: _version.private_id,
    view_count: 0,
    user_view_count: 0
  };

  console.log('[publicInfo]oldVersion', _version.is_public, 'newVersion', is_public);

//origin is private, new is private
//remain one not public
  if (!_version.is_public && !is_public) {
// modify origin to second one
    var find = _version.private_id;
    newVersion.version++;

//remove the other backup
    for (var index in _pack.version) {
      if (_pack.version[index].id == _version.id) {
        continue;
      }
      if (_pack.version[index].private_id === find) {
        _pack.version.splice(index, 1);
        break;
//should be only one
//public version, remove all old version
      }
    }
  } else if (!_version.is_public && is_public) {
    newVersion.version++;

    for (var j in _pack.version) {
      if (_pack.version[j].private_id === _version.private_id) {
        _pack.version.splice(j, 1);
//because delete one i
        j--;
      }
    }
//version is public the pack will be public
    _pack.is_public = true;
// old is public and new private
  } else if (_version.is_public && !is_public) {
//set new private id
    newVersion.private_id = 'private' + time;
  }

  _pack.version.push(newVersion);
  checkoutVersion(newVersion.id);
  console.log(_packs);
}
function replaceImgPath(content, packId) {
  var url = EasylearnConfig.IMG_URL;
  var find = 'FILE_STORAGE_PATH' + packId + '/';
  var re = new RegExp(find, 'g');

  content = content.replace(re, url);
  return content;
}

function newComment(newComment, noteId) {
  var time = new Date();
  for (let item of _version.note) {
    if (item.id == noteId) {
      item.comment.push(newComment);
    }
  }
}

function setComment(comments, noteId) {
  var time = new Date();
  for (let item of _version.note) {
    if (item.id == noteId) {
      item.comment = comments;
    }
  }
}

function getVersionInfo() {

  let result = [];

//sort by private id and version
  _pack.version.sort(function(a, b) {
    return (b.private_id - a.private_id) + (b.version - a.version);
  });

  for (let item of _pack.version) {
//it's backup version
    if (result.length !== 0 && result[result.length - 1].private_id == item.private_id && item.is_public == false) {
      continue;
    }

//other people's private version
    if (item.is_public == false && item.creator_user_id != UserStore.getUserId()) {
      continue;
    }

    let versionInfo = {
      text: item.create_time,
      name: item.creator_user_name,
      id: item.id,
      private_id: item.private_id
    };

    result.push(versionInfo);
  }

//sort by private id and version
  result.sort(function(a, b) {
    return (b.text - a.text);
  });

//replace create time to string
  for (let item of result) {
    var time = new Date(item.text);
    var timeString = time.toLocaleString("zh-TW", {
      hour: '2-digit',
      minute: 'numeric',
      day: "numeric",
      month: "numeric",
      year: 'numeric'
    });
    item.text = timeString + ' ' + item.name;
    delete item.private_id;
    delete item.name;
  }
  return result;
}

function checkoutVersion(versionId) {
  let version = _pack.version;

  version.sort(function(a, b) {
    return b.create_time - a.create_time;
  });

  for (let i in version) {
    if (version[i].id == versionId) {
      _versionId = versionId;
      _version = version[i];
    }
  }
}

function deletePack(idArray) {
  localStorage.setItem('packs', JSON.stringify(_packs));
  for (let id of idArray) {
    console.log(id);
    for (let i in _packs) {
      if (_packs[i].id == id) {
        _packs.splice(i, 1);
      }
    }
  }
}

function redoDeletePack() {
  _packs = JSON.parse(localStorage.getItem('packs'));
}

function getContentForModified() {
  let content = [];
  for (let item of _pack.version) {
    if (item.id == _versionId || item.private_id == _version.private_id) {
      content.push({
        is_public: item.is_public,
        content: item.content,
        create_time: item.create_time
      });
    }
  }
  content.sort(function(a, b) {
    return b.create_time - a.create_time;
  })
  console.log(content);
  return content;
}

var PackStore = assign({}, EventEmitter.prototype, {
  getVersionForModified: function() {
    return {
      version: getContentForModified(),
      title: _pack.name
    }
  },

  getDeleteList: function() {
    let result = [];

    _packs.sort(function(a, b) {
      return b.create_time - a.create_time
    })
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
        },
        id: item.id
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
            img = EasylearnConfig.IMG_URL + _packs[j].cover_filename;
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

  getSyncAllPack: function() {
    sessionStorage.setItem('pack', JSON.stringify(_packs));
    var packs = JSON.parse(sessionStorage.getItem('pack'));

    for (let pack of packs) {
      for (let version of pack.version) {
        var target = 'FILE_STORAGE_PATH' + pack.id + '/';
        var find = EasylearnConfig.IMG_URL;
        var re = new RegExp(find, 'g');

        version.content = version.content.replace(find, target);
      }
    }

    return packs;
  },

  getPack: function() {
    return _pack;
  },

  getViewVersion: function() {
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

  case EasyLearnConstants.MODIFIED_PACK:
    modifiedPackVersion(action.is_public, action.content, action.files);
    PackStore.emitChange();
    break;

  case EasyLearnConstants.DELETE_PACK:
    deletePack(action.idArray);
    PackStore.emitChange();
    break;

  case EasyLearnConstants.REDO_DELETE_PACK:
    redoDeletePack();
    PackStore.emitChange();
    break;

  case EasyLearnConstants.NEW_NOTE:
    newNote(action.note, action.versionContent);
    PackStore.emitChange();
    break;

  case EasyLearnConstants.NEW_COMMENT:
    newComment(action.newComment, action.noteId);
    PackStore.emitChange();
    break;

  case EasyLearnConstants.GET_COMMENT:
    setComment(action.notes, action.noteId);
    PackStore.emitChange();
    break;

  default:
// no op
  }
});

module.exports = PackStore;
