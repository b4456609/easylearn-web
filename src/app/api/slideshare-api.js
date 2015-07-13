let SlideShareApi = {
  getSlideshareImg: function (user_url, start, end, successCallback, fail) {
    // set slideshare url
    var url = "http://www.slideshare.net/api/oembed/2?url=" + user_url + "&format=json";

    //set slide share path variable
    var indexOfSlash = user_url.lastIndexOf('/');
    indexOfSlash = user_url.lastIndexOf('/', indexOfSlash - 1);
    var slidesharePath = user_url.substr(indexOfSlash + 1).replace('/', '_');

    let result = {
      path: slidesharePath,
      img: []
    }


    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        console.log('[Slideshare]success', result);

        if (start <= 0 || start === null || start > data.total_slides) {
          start = 1;
        }
        if (end < start) {
          end = start;
        } else if (end > data.total_slides) {
          end = data.total_slides;
        }

        for (; start <= end; start++) {
          var imgUrl = 'http:' + data.slide_image_baseurl + start + data.slide_image_baseurl_suffix;
          result.img.push(imgUrl);
        }

        successCallback(result);
      },
      error: function(e, s, t) {
        console.log('[Slideshare]Fail');
        console.log(e, s, t);
        fail();
      }
    });
  }
}

module.exports = SlideShareApi;
