export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export function loginSuccess(name, id) {
  return {
    type: USER_LOGIN_SUCCESS,
    name,
    id,
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
