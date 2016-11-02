import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

let SlideShareApi = {
  getSlideshareImg: function (user_url, start, end) {
    // set slideshare url
    var url = "http://www.slideshare.net/api/oembed/2?url=" + user_url + "&format=json";

    //set slide share path variable
    var indexOfSlash = user_url.lastIndexOf('/');
    indexOfSlash = user_url.lastIndexOf('/', indexOfSlash - 1);
    var slidesharePath = user_url.substr(indexOfSlash + 1).replace('/', '_');

    return fetchJsonp(url)
      .then(function(response) {
        return response.json()
      })
      .then((data) => {
        console.log('[Slideshare]success', data);

        let result = {
          path: slidesharePath,
          img: []
        }

        if (start <= 0 || start === null || start > data.total_slides) {
          start = 1;
        }
        if (end < start) {
          end = start;
        } else if (end > data.total_slides) {
          end = data.total_slides;
        }
        console.log(start, end);
        for (; start <= end; start++) {
          var imgUrl = 'http:' + data.slide_image_baseurl + start + data.slide_image_baseurl_suffix;
          result.img.push(imgUrl);
        }

        return result
      });
  }
}

module.exports = SlideShareApi;
