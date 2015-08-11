
module.exports = function () {
  var youtube = [];
  var slideshare = [];
  var youtubeResult = [];
  var slideshareResult = [];
  var count = 0;
  var deferred;

  //add image
  this.addYoutube = function(str) {
    youtube.push(str);
    count++;
  };

  //add slideshare
  this.addSlideshare = function(str) {
    for (var i in slideshare) {
      if (slideshare[i] === str) {
        return;
      }
    }
    slideshare.push(str);
    count++;
  };

  this.getInfo = function(content) {
    console.log('[Reference]getInfo');
    //Deferred object
    deferred = $.Deferred();

    //parse content
    this.setRef(content);

    //no content Reference
    if (slideshare.length + youtube.length === 0) {
      console.log('[Reference]getInfo:no need to ajax');
      deferred.resolve();
      return deferred.promise();
    }

    //get slide share info
    var i;
    for (i in slideshare) {
      this.slideshareAjax(slideshare[i]);
    }

    //get youtube info
    for (i in youtube) {
      this.youtubeAjax(youtube[i]);
    }


    return deferred.promise();
  };

  this.youtubeAjax = function(id) {
    console.log('[youtubeAjax]' + id);
    var self = this;
    var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=AIzaSyBaRuuH-H3TCyW4ek-_J-XR9BCOBjfbP5s';
    var result;
    //ajax slideshare info and put into array
    $.get(url,
      function(data) {
        var video = data.items[0].snippet;
        //use exteranl broswer
        result = '<li><a href="#" onclick="window.open(\'http://www.youtube.com/watch?v=' + id + '\', \'_system\');">' + video.title + '</a></li>';
        youtubeResult.push(result);
        self.isFinish();
      });
  };

  this.slideshareAjax = function(slidesharePath) {
    var slideshareUrl = 'http://www.slideshare.net/' + slidesharePath;
    var ajaxUrl = "http://www.slideshare.net/api/oembed/2?url=http://www.slideshare.net/" + slidesharePath;

    var self = this;
    var result;
    //ajax slideshare info and put into array
    $.ajax({
      url: ajaxUrl,
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        result = '<li><a href="#" onclick="window.open(\'' + slideshareUrl + '\', \'_system\');">' + data.title + ' - ' + data.author_name + '</a></li>';
        slideshareResult.push(result);
        self.isFinish();
      },
      error: function(e, s, t) {
        console.log('[Slideshare]Fail');
        console.log(e, s, t);
        fail();
      }
    });
  };

  //check is all complete
  this.isFinish = function() {
    //check is all finished
    count--;
    console.log(count);
    if (count === 0) {
      console.log(slideshare);
      console.log(slideshareResult);
      console.log(youtube);
      console.log(youtubeResult);
      deferred.resolve();
    }
  };

  //output html string
  this.get = function() {
    console.log('[Reference]toString');
    var youtubeLength = youtubeResult.length;
    var slideShareLength = slideshareResult.length;
    var result = '';
    if (youtubeLength + slideShareLength > 0) {
      result = '<div id="pack_refrence">';
      result += '<h1>引用資料</h1>';

      if (youtubeLength > 0) {
        result += '<h2>Youtube</h2>';
        result += '<ol>';
        for (var i in youtubeResult) {
          result += youtubeResult[i];
        }
        result += '</ol>';
      }

      if (slideShareLength > 0) {
        result += '<h2>Slideshare</h2>';
        result += '<ol>';
        for (var j in slideshareResult) {
          result += slideshareResult[j];
        }
        result += '</ol>';
        result += '</div>';
      }
    }
    console.log(result);

    return result;
  };

  //get the refrence from exsit version
  this.setRef = function(content) {
    console.log("[Reference]getExistRefrence");

    //add youtube id to youtube array
    var index = 0;
    var endIndex;
    index = content.indexOf('http://www.youtube.com/embed/');
    while (index !== -1) {
      console.log('youtube ' + index);
      endIndex = content.indexOf('?', index + 29);
      this.addYoutube(content.substring(index + 29, endIndex));
      index = content.indexOf('http://www.youtube.com/embed/', index + 1);
    }

    index = 0;
    index = content.indexOf('slideshare-img ');
    while (index !== -1) {
      console.log('slide ' + index);
      endIndex = content.indexOf(' ', index + 15);
      this.addSlideshare(content.substring(index + 15, endIndex).replace('_', '/'));
      index = content.indexOf('slideshare-img ', index + 1);
    }
  };

  //delete exist reference
  this.deleteRef = function(content) {
    console.log("[Reference]deleteRef");
    var endIndex = content.indexOf('<div id="pack_refrence">');
    if (endIndex === -1) {
      console.log('[Reference]no exist reference');
      return content;
    }

    return content.substring(0, endIndex);
  };
}
