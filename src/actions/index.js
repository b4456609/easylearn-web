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
export function newPack(title, description, isPublic, content, userId, userName) {
  return {
    type: NEW_PACK,
    title,
    description,
    isPublic,
    content,
    userId,
    userName,
  };
}
