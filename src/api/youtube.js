
//parse youtube url to id
function youtube_parser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[7].length === 11) {
    return match[7];
  } else {
    alert("Url incorrecta");
  }
}

let YoutubeApi = {
  generateYoutubeEmbedCode: function(user_url, start, end) {
    //save embed parameter
    var startPar = '',
      endPar = '';

    // error input hanlder
    if (start !== 0 && start > 0) {
      startPar += '&start=' + start;
    }
    if (end !== 0 && end > 0 && end > start) {
      endPar += '&end=' + end;
    }
    //get input id
    var videoId = youtube_parser(user_url);

    //set embed code
    var embedCode = '<p><div id="' + videoId + '" class="youtube video-container">' + '<iframe width="560" height="315" src="http://www.youtube.com/embed/' + videoId + '?controls=1&disablekb=1&modestbranding=1&showinfo=0&rel=0' + startPar + endPar + '" frameborder="0" allowfullscreen></iframe>' + '</div></p>';

    return embedCode;
  }
}

module.exports = YoutubeApi;
