let EasylearnApi = require('./easylearn-api.jsx');
const ImgurAuth = 'Client-ID 3cda8943e794d34';
const ImgurAPIUrl = 'https://api.imgur.com/3/';

function uploadImgUseBase64(data, successCallback, failCallback) {
  console.log('[uploadImgUseBase64]start');

  $.ajax({
    url: ImgurAPIUrl + 'image',
    type: 'POST',
    headers: {
      Authorization: ImgurAuth,
      Accept: 'application/json'
    },
    data: {
      image: data,
      type: 'base64',
      album: "dvtm9wHkgA5cbZa"
    },
    success: function(result) {
      console.log('[uploadImgUseBase64]success', result);
      if (result.success == true) {
        var item = {
          id: result.data.id,
          link: result.data.link,
          deletehash: result.data.deletehash
        };
        EasylearnApi.fileDataUpload(item.id, item.deletehash);

        successCallback(item);
      } else {
        console.log('[uploadImgUseBase64]imgeHostFail', result);
        failCallback();
      }
    },
    error: function(e, s, t) {
      console.log('[uploadImgUseBase64]Fail');
      console.log(e, s, t);
      failCallback();
    }
  });
}

function uploadImgUseUrl(imgUrl, successCallback, failCallback) {
  console.log('[uploadImgUseUrl]start');

  $.ajax({
    url: 'https://api.imgur.com/3/image',
    type: 'POST',
    headers: {
      Authorization: ImgurAuth,
      Accept: 'application/json'
    },
    data: {
      image: imgUrl,
      type: 'URL',
      album: "dvtm9wHkgA5cbZa"
    },
    success: function(result) {
      console.log('[uploadImgUseUrl]success', result);
      if (result.success == true) {
        var item = {
          id: result.data.id,
          link: result.data.link,
          deletehash: result.data.deletehash
        };
        EasylearnApi.fileDataUpload(item.id, item.deletehash)

        successCallback(item);
      } else {
        console.log('[uploadImgUseUrl]imgeHostFail', result);
        failCallback();
      }
    },
    error: function(e, s, t) {
      console.log('[uploadImgUseUrl]Fail');
      console.log(e, s, t);
      failCallback();
    }
  });
}

let ImgurApi = {
  uploadImgUseUrl: function(imgUrl, successCallback, failCallback) {
    uploadImgUseUrl(imgUrl, successCallback, failCallback);
  },
  uploadImgUseBase64: function(data, successCallback, failCallback) {
    uploadImgUseBase64(data, successCallback, failCallback);
  },
  uploadMultipleImg: function(imgUrlArray, callback) {
    let promiseArray = [];
    let result = [];

    for (let item of imgUrlArray) {
      let deffer = $.Deferred();
      promiseArray.push(deffer);
      uploadImgUseUrl(item, function(data) {
        result.push(data);
        deffer.resolve();
      }, function() {
        deffer.resolve();
      });
    }

    $.when.apply($, promiseArray).done(function() {
      console.log('[uploadMultipleImg]All done');
      callback(result);
    });
  }
}

module.exports = ImgurApi;
