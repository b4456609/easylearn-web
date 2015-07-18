let AppDispatcher = require('../dispatcher/app-dispatcher.jsx');
let EasyLearnConstants = require('../constants/easylearn-constants.jsx');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

const CHANGE_EVENT = 'change';

let _folder = [
  {
    "name": "All",
    "id": "allPackId",
    "pack": []
  }, {
    "name": "我的最愛",
    "id": "fjoeiwjowfe",
    "pack": []
  }, {
    "name": "全部的懶人包",
    "id": "allfolder",
    "pack": []
  }
];

let _viewFolderId = "allPackId";

function addPackToAll(packId) {
  for (let item of _folder) {
    if (item.id === 'allPackId') {
      item.pack.push(packId);
      break;
    }
  }
  _viewFolderId = "allPackId";
}

function deletePack(idArray) {
  localStorage.setItem('folder', JSON.stringify(_folder));
  for (let id of idArray) {
    for (let folder of _folder) {
      for (let i in folder.pack) {
        if (folder.pack[i] === id) {
          folder.pack.splice(i, 1);
        }
      }
    }
  }
}

function redoDeletePack() {
  _folder = JSON.parse(localStorage.getItem('folder'));
}

function renameFolder(id, name) {
  for (let folder of _folder) {
    if (folder.id === id) {
      folder.name = name;
      break;
    }
  }
}

function movePack(packId, originFolderId, targetFolderId) {
  for (let folder of _folder) {
    if (folder.id === originFolderId) {
      let index = folder.pack.indexOf(packId);
      folder.pack.splice(index, 1);
    }

    if (folder.id === targetFolderId) {
//not exist in folder then add
      if (folder.pack.indexOf(packId) === -1)
        folder.pack.push(packId);
    }
  }
}

function copyPack(packId, targetFolderId) {
  for (let folder of _folder) {
    if (folder.id === targetFolderId) {
//not exist then add
      if (folder.pack.indexOf(packId) === -1)
        folder.pack.push(packId);
      break;
    }
  }
}

function deletePackInFolder(packId, fodlerId) {
  for (let folder of _folder) {
    if (folder.id === fodlerId) {
      let index = folder.pack.indexOf(packId);
      if(index !== -1){
          folder.pack.splice(index, 1);
      }
      break;
    }
  }
}

function deletePackInAllFolders(packId) {
  for (let folder of _folder) {
    let index = folder.pack.indexOf(packId);
    if(index !== -1){
        folder.pack.splice(index, 1);
    }
  }
}

let FolderStore = assign({}, EventEmitter.prototype, {
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

  getFolderIdName: function() {
    let result = [];
    for (let item of _folder) {
      result.push({
        id: item.id,
        name: item.name
      })
    }

    return result;
  },

//generate master menu
  getFolderMenu: function() {
    let folderMenu = [];

    for (let i in _folder) {
      let item = {
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
  case EasyLearnConstants.FOLDER_VIEW :
    _viewFolderId = action.folderId;
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.SYNC_SUCCESS :
    _folder = action.data.folder;
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.NEW_PACK :
    addPackToAll(action.data.id);
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.DELETE_PACK :
    deletePack(action.idArray);
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.REDO_DELETE_PACK :
    redoDeletePack();
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.RENAME_FOLDER :
    renameFolder(action.folderId, action.name);
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.MOVE_PACK :
    movePack(action.packId, action.originFolderId, action.targetFolderId);
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.COPY_PACK :
    copyPack(action.packId, action.targetFolderId);
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.DELETE_PACK_IN_ALL_FOLDERS :
    deletePackInAllFolders(action.packId);
    FolderStore.emitChange();
    break;

  case EasyLearnConstants.DELETE_PACK_IN_FOLDER :
    deletePackInFolder(action.packId, action.fodlerId);
    FolderStore.emitChange();
    break;

  default :
// no op
  }
});

module.exports = FolderStore;
