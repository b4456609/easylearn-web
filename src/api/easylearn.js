import fetch from 'isomorphic-fetch';

let EASYLEARN_API_ROOT = 'https://microservices.ntou.edu.tw/api/';
if (process.env.NODE_ENV !== 'production') {
  EASYLEARN_API_ROOT = 'http://localhost:8080/api/';
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export function auth(id, token) {
  return fetch(`${EASYLEARN_API_ROOT}auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      token,
    }),
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function appLogin(id, name) {
  return fetch(`${EASYLEARN_API_ROOT}user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': sessionStorage.getItem('token'),
    },
    body: JSON.stringify({
      id,
      name,
    }),
  })
  .then(checkStatus);
}

export function addFolder(id, name, pack) {
  return fetch(`${EASYLEARN_API_ROOT}user/folder`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': sessionStorage.getItem('token'),
    },
    body: JSON.stringify({
      id,
      name,
      pack,
    }),
  })
  .then(checkStatus);
}
