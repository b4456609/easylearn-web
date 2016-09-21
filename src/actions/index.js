import { browserHistory } from 'react-router';
import { fbCheckLogin, fbLogin } from '../api/fb';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export function loginSuccess(name, id) {
  browserHistory.push('/folder/all');
  return {
    type: USER_LOGIN_SUCCESS,
    name,
    id,
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
    fbCheckLogin((name, id) => {
      dispatch(loginSuccess(name, id));
    }, () => {
      dispatch(notLogin());
    });
  };
}

export function checkLogin() {
  return (dispatch) => {
    fbCheckLogin((name, id) => {
      dispatch(loginSuccess(name, id));
    }, () => {
      dispatch(notLogin());
    });
  };
}

export function login() {
  return (dispatch) => {
    fbCheckLogin((name, id) => {
      dispatch(loginSuccess(name, id));
    }, () => {
      fbLogin((response) => {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          // eslint-disable-next-line
          FB.api('/me', (response) => {
            dispatch(loginSuccess(response.name, response.id));
          });
        } else {
          dispatch(notLogin());
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    });
  };
}

export const ADD_FOLDER = 'ADD_FOLDER';
export function addFolder(name) {
  return {
    type: ADD_FOLDER,
    name,
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
  return {
    type: REMOVE_FOLDER,
    folderId,
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
