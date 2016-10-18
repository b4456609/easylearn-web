import { browserHistory } from 'react-router';
import { fbCheckLogin, fbLogin } from '../api/fb';
import { auth, appLogin, addFolderApi, delteFolderApi, getFolderApi } from '../api/easylearn';

export const APP_LOGIN_SUCCESS = 'APP_LOGIN_SUCCESS';
export function appAuth(name, id, token) {
  return (dispatch) => {
    auth(id, token)
    .then((data) => {
      localStorage.setItem('token', data.token);
      appLogin(id, name);
      getFolderApi(id, name);
      dispatch({
        type: APP_LOGIN_SUCCESS,
        token: data.token,
      });
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
          FB.api('/me', (res) => {
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
export function showDialog(modalType, modalProps) {
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

export const NEW_PACK = 'NEW_PACK';
export function newPack(id, title, description, isPublic, content, userId, userName) {
  return {
    type: NEW_PACK,
    id,
    title,
    description,
    isPublic,
    content,
    userId,
    userName,
  };
}

export const MOVE_PACK_TO_FOLDER = 'MOVE_PACK_TO_FOLDER';
export function movePackToFolder(packId, folderId) {
  return {
    type: MOVE_PACK_TO_FOLDER,
    packId,
    folderId,
  };
}

export const REMOVE_PACK = 'REMOVE_PACK';
export function removePack(packId) {
  return {
    type: REMOVE_PACK,
    packId,
  };
}

export const MOVE_PACK_OUT = 'MOVE_PACK_OUT';
export function movePackOut(packId, folderId) {
  return {
    type: MOVE_PACK_OUT,
    packId,
    folderId,
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

export const NEW_VERSION = 'NEW_VERSION';
export function newVersion(packId, versionId, content, userId, userName) {
  return {
    type: NEW_VERSION,
    packId,
    versionId,
    content,
    userId,
    userName,
  };
}

export const NEW_NOTE = 'NEW_NOTE';
export function newNote(packId, versionId, noteId, userId, userName, content, newContent) {
  return {
    type: NEW_NOTE,
    packId,
    versionId,
    userId,
    userName,
    noteId,
    content,
    newContent,
  };
}

export const NEW_COMMENT = 'NEW_COMMENT';
export function newComment(userId, userName, content, noteId) {
  const time = new Date().getTime();
  return {
    type: NEW_COMMENT,
    id: `comment${time}`,
    createTime: time,
    userId, userName, content, noteId,
  };
}
