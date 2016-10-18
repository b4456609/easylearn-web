import axios from 'axios';

let EASYLEARN_API_ROOT = 'https://microservices.ntou.edu.tw/api/';
if (process.env.NODE_ENV !== 'production') {
  EASYLEARN_API_ROOT = 'http://localhost:8080/api/';
}

const config = {
  baseURL: EASYLEARN_API_ROOT,
  responseType: 'json',
  validateStatus: status => (status >= 200 && status < 300),
  headers: {
    'X-Auth-Token': localStorage.getItem('token')
  }
};

export function auth(id, token) {
  return axios.post('auth', {
    id,
    token
  }, {
    baseURL: EASYLEARN_API_ROOT,
    validateStatus: status => (status >= 200 && status < 300)
  }).then(r => (r.data));
}

export function appLogin(id, name) {
  return axios.post('user/login', {
    id,
    name
  }, config);
}

export function getFolderApi() {
  return axios.get('user/folder', config)
  .then(r => r.data)
  .then((data) => {
    console.log(data);
  });
}

export function addFolderApi(id, name, pack) {
  return axios.post('user/folder', {
    id,
    name,
    pack
  }, config);
}

export function delteFolderApi(id) {
  return axios.delete(`user/folder/${id}`, config);
}
