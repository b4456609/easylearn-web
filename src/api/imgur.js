import axios from 'axios';

const API_ROOT = 'https://api.imgur.com/3/';
const ImgurAuth = 'Client-ID 3cda8943e794d34';

const config = {
  baseURL: API_ROOT,
  responseType: 'json',
  validateStatus: status => (status >= 200 && status < 300),
  headers: {
    Authorization: ImgurAuth,
  }
};

export function uploadImg(file) {
  const data = new FormData();
  data.append('image', file);
  data.append('album', 'dvtm9wHkgA5cbZa');

  const uploadConfig = Object.assign({}, config,
    {
      onUploadProgress(progressEvent) {
        const percentCompleted = progressEvent.loaded / progressEvent.total;
        console.log(percentCompleted);
      }
    });

  console.log(uploadConfig);

  return axios
    .post('image', data, uploadConfig)
    .then(r => (r.data));
}

export function uploadMultipleImg(imgurlArray) {
  console.log(imgurlArray);
  const array = imgurlArray.map(i => (uploadImg(i)));
  return Promise.all(array);
}
