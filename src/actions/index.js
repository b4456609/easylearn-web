export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'

export function loginSuccess(name,id) {
  return {
    type: USER_LOGIN_SUCCESS,
    name: name,
    id: id
  }
}

export const ADD_FOLDER = 'ADD_FOLDER'
export function addFolder(name) {
  return {
    type: ADD_FOLDER,
    name: name
  }
}
