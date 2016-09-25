import fetch from 'isomorphic-fetch';

let EASYLEARN_API_ROOT = 'http://140.121.102.163:8080/';
if (process.env.NODE_ENV !== 'production') {
  EASYLEARN_API_ROOT = 'http://localhost:8080/';
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
  return fetch(EASYLEARN_API_ROOT + 'api/auth', {
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
