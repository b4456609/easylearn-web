import { browserHistory } from 'react-router';
import { fbCheckLogin, fbLogin, fbLogout } from '../api/fb';
import { getPackApi,
  auth,
  appLogin,
  addFolderApi,
  delteFolderApi,
  getFolderApi,
  addPackApi,
  updateFolderApi,
  deltePackInFolderApi,
  addVersionApi,
  setAppToken
} from '../api/easylearn';
import { uploadImg } from '../api/imgur.js';

export const PACK_FETCHING = 'PACK_FETCHING';
export const PACK_FETCHING_ERROR = 'PACK_FETCHING_ERROR';

export const FOLDER_FETCHING = 'FOLDER_FETCHING';
export const FOLDER_FETCHING_ERROR = 'FOLDER_FETCHING_ERROR';

export const SERVER_ERROR = 'SERVER_ERROR';
export const NOT_FOUND = 'NOT_FOUND';

export const SUCCESS_LOAD_PACK = 'SUCCESS_LOAD_PACK';
export const SUCCESS_LOAD_FOLDER = 'SUCCESS_LOAD_FOLDER';
export function loadData() {
  return (dispatch) => {
    dispatch({
      type: PACK_FETCHING
    });
    dispatch({
      type: FOLDER_FETCHING
    });
    // get pack
    getPackApi()
    .then((data) => {
      dispatch({
        type: SUCCESS_LOAD_PACK,
        data,
      });
    })
    .catch((error) => {
      const status = '';
      if (error.response.status >= 500) {
        browserHistory.push('/error');
      } else {
        browserHistory.push('/404');
      }
      dispatch({
        type: PACK_FETCHING_ERROR,
        status,
      });
    });
    // get folder
    getFolderApi()
      .then((data) => {
        dispatch({
          type: SUCCESS_LOAD_FOLDER,
          data,
        });
      })
      .catch((error) => {
        const status = '';
        if (error.response.status >= 500) {
          browserHistory.push('/error');
        } else {
          browserHistory.push('/404');
        }
        dispatch({
          type: FOLDER_FETCHING_ERROR,
          status,
        });
      });
  };
}

export const APP_LOGIN_SUCCESS = 'APP_LOGIN_SUCCESS';
export function appAuth(name, id, token) {
  return (dispatch) => {
    auth(id, token)
    .then((data) => {
      setAppToken(data.token);
      appLogin(id, name);
      dispatch({
        type: APP_LOGIN_SUCCESS,
        token: data.token,
      });
    })
    .then(() => {
      dispatch(loadData());
    });
  };
}

export const USER_FB_LOGIN_SUCCESS = 'USER_FB_LOGIN_SUCCESS';
function fbLoginSuccess(name, id, fbAccessToken) {
  browserHistory.push('/folder/all');
  return (dispatch) => {
    dispatch({
      type: USER_FB_LOGIN_SUCCESS,
      name,
      id,
      fbAccessToken,
    });
    dispatch(appAuth(name, id, fbAccessToken));
  };
}

export const USER_NOT_LOGIN = 'USER_NOT_LOGIN';
export function notLogin() {
  return {
    type: USER_NOT_LOGIN,
  };
}

export function logOut() {
  fbLogout();
  localStorage.removeItem('token');
  return {
    type: USER_NOT_LOGIN,
  };
}

export function fbLoaded() {
  return (dispatch) => {
    fbCheckLogin((name, id, accessToken) => {
      dispatch(fbLoginSuccess(name, id, accessToken));
    }, () => {
      dispatch(notLogin());
    });
  };
}

export function login() {
  return (dispatch) => {
    fbCheckLogin((name, id, accessToken) => {
      dispatch(fbLoginSuccess(name, id, accessToken));
    }, () => {
      fbLogin((r) => {
        if (r.status === 'connected') {
          window.FB.api('/me', (res) => {
            dispatch(fbLoginSuccess(res.name, res.id, r.authResponse.accessToken));
          });
        } else {
          fbCheckLogin(
            (name, id, accessToken) => {
              dispatch(fbLoginSuccess(name, id, accessToken));
            },
            () => { dispatch(notLogin()); }
          );
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    });
  };
}

export const ADD_FOLDER = 'ADD_FOLDER';
export function addFolder(id, name) {
  return (dispatch) => {
    dispatch({
      type: ADD_FOLDER,
      id,
      name,
    });
    addFolderApi(id, name, []);
  };
}

export const SHOW_DIALOG = 'SHOW_DIALOG';
export function showDialog(modalType, modalProps = {}) {
  return {
    type: SHOW_DIALOG,
    modalType,
    modalProps,
  };
}

export const HIDE_DIALOG = 'HIDE_DIALOG';
export function hideDialog() {
  return {
    type: HIDE_DIALOG,
  };
}


function newPackFactory(id, name, description, isPublic, content, creatorUserId, creatorUserName, coverFilename = '') {
  const time = new Date().getTime();
  return {
    id,
    createTime: time,
    name,
    description,
    isPublic,
    coverFilename,
    creatorUserId,
    creatorUserName,
    viewCount: 0,
    version: [
      {
        id: `version${time}`,
        content,
        createTime: time,
        isPublic,
        creatorUserId,
        creatorUserName,
        version: 0,
        view_count: 0,
        user_view_count: 0
      },
    ]
  };
}

export const NEW_PACK = 'NEW_PACK';
export function newPack(id, title, description, isPublic, content, userId, userName, file) {
  if (file != null) {
    return (dispatch, getState) => {
      dispatch(showDialog('LOADING_DIALOG'));
      uploadImg(file).then((response) => {
        const filename = response.data.link.substr(response.data.link.lastIndexOf('/') + 1);
        const pack = newPackFactory(id, title, description, isPublic,
           content, userId, userName, filename);
        dispatch({ type: NEW_PACK, pack });
        addPackApi(pack);
        updateFolderApi(getState().folder.find(i => i.id === 'all'));
      }).then(() => {
        dispatch(hideDialog());
        browserHistory.push('/');
      }).catch(() => {
        dispatch(hideDialog());
      });
    };
  }
  return (dispatch, getState) => {
    const pack = newPackFactory(id, title, description, isPublic, content, userId, userName);
    dispatch({ type: NEW_PACK, pack });
    addPackApi(pack);
    updateFolderApi(getState().folder.find(i => i.id === 'all'));
    browserHistory.push('/');
  };
}

export const MOVE_PACK_TO_FOLDER = 'MOVE_PACK_TO_FOLDER';
export function movePackToFolder(packId, folderId) {
  return (dispatch, getState) => {
    dispatch({
      type: MOVE_PACK_TO_FOLDER,
      packId,
      folderId,
    });
    updateFolderApi(getState().folder.find(i => i.id === folderId));
  };
}

export const REMOVE_PACK = 'REMOVE_PACK';
export function removePack(packId) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_PACK,
      packId,
    });
    deltePackInFolderApi(packId);
  };
}

export const MOVE_PACK_OUT = 'MOVE_PACK_OUT';
export function movePackOut(packId, folderId) {
  return (dispatch, getState) => {
    dispatch({
      type: MOVE_PACK_OUT,
      packId,
      folderId,
    });
    updateFolderApi(getState().folder.find(i => i.id === folderId));
  };
}

export const REMOVE_FOLDER = 'REMOVE_FOLDER';
export function removeFolder(folderId) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FOLDER,
      folderId,
    });
    delteFolderApi(folderId);
  };
}

function newVersionTemplate(id, content, creatorUserId, creatorUserName, isPublic) {
  return {
    id,
    content,
    createTime: new Date().getTime(),
    isPublic,
    creatorUserId,
    creatorUserName,
    view_count: 0,
    user_view_count: 0
  };
}

export const NEW_VERSION = 'NEW_VERSION';
export function newVersion(packId, versionId, content, userId, userName, isPublic) {
  const version = newVersionTemplate(versionId, content, userId, userName, isPublic);
  addVersionApi(packId, version);
  return {
    type: NEW_VERSION,
    packId,
    version,
  };
}

function newNoteTemplate(id, content, createTime, userId, userName) {
  return {
    id,
    content,
    createTime,
    comment: [],
    userId,
    userName,
  };
}

export const NEW_NOTE = 'NEW_NOTE';
export function newNote(packId, versionId, noteId, userId, userName, content, newContent) {
  const note = newNoteTemplate(noteId, content, new Date().getTime(), userId, userName);
  return {
    type: NEW_NOTE,
    noteId,
    note,
    packId,
    versionId,
    newContent,
  };
}

function newCommentTemplate(id, createTime, userId, userName, content) {
  return {
    id, createTime, userId, userName, content,
  };
}

export const NEW_COMMENT = 'NEW_COMMENT';
export function newComment(userId, userName, content, noteId) {
  const time = new Date().getTime();
  const comment = newCommentTemplate(`comment${time}`, time, userId, userName, content);
  return {
    type: NEW_COMMENT,
    comment,
    noteId,
  };
}
