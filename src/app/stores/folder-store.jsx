var AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
var EasyLearnConstants = require('../constants/easylearn-constants.jsx');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

const CHANGE_EVENT = 'change';

var _folder = [
  {
    "name": "All",
    "id": "allPackId",
    "pack": ["pack1435654271204"]
  }, {
    "name": "我的最愛",
    "id": "fjoeiwjowfe",
    "pack": []
  }, {
    "name": "全部的懶人包",
    "id": "allfolder",
    "pack": [
      "pack1435654271204", "pack1435840821469", "pack1435931033502", "pack1435931116723", "pack1435931157535"
    ]
  }
];

let _viewFolderId = "allPackId";

function addPackToAll(packId) {
  for (let item of _folder) {
    if (item.id == 'allPackId') {
      item.pack.push(packId);
      break;
    }
  }
  _viewFolderId = "allPackId";
}

var FolderStore = assign({}, EventEmitter.prototype, {
  getViewFolderId: function() {
    return _viewFolderId;
  },

  getPackInFolder: function() {
    for (let i in _folder) {
      if (_folder[i].id === _viewFolderId) {
        return _folder[i].pack;
      }
    }
  },

  getFolder: function() {
    return _folder;
  },

//generate master menu
  getFolderMenu: function() {
    var folderMenu = [];

    for (var i in _folder) {
      var item = {
        route: 'folder-list',
        text: _folder[i].name,
        number: _folder[i].pack.length.toString(),
        id: _folder[i].id
      };
      folderMenu.push(item);
    }

    return folderMenu;
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
  case EasyLearnConstants.FOLDER_VIEW:
    _viewFolderId = action.folderId;
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.SYNC_SUCCESS:
    _folder = action.data.folder;
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.NEW_PACK:
    addPackToAll(action.data.id);
    FolderStore.emitChange();
    break;

  default:
// no op
  }
});

module.exports = FolderStore;
