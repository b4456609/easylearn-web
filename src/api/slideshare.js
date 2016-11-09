/* eslint-disable */
import fetchJsonp from 'fetch-jsonp';

const SlideShareApi = {
  getSlideshareImg(userUrl, start, end) {
    // set slideshare url
    const url = `http://www.slideshare.net/api/oembed/2?url=${userUrl}&format=json`;

    // set slide share path variable
    let indexOfSlash = userUrl.lastIndexOf('/');
    indexOfSlash = userUrl.lastIndexOf('/', indexOfSlash - 1);
    const slidesharePath = userUrl.substr(indexOfSlash + 1).replace('/', '_');

    return fetchJsonp(url)
      .then(response => (response.json()))
      .then((data) => {
        console.log('[Slideshare]success', data);

        const result = {
          path: slidesharePath,
          img: []
        };

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
          const imgUrl = `http:${data.slide_image_baseurl}${start}${data.slide_image_baseurl_suffix}`;
          result.img.push(imgUrl);
        }
        return result;
      });
  }
};

module.exports = SlideShareApi;
