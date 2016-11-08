
// parse youtube url to id
function youtubeParser(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  console.log('youtube parser error');
  return null;
}

const YoutubeApi = {
  generateYoutubeEmbedCode(userUrl, start, end) {
    // save embed parameter
    let startPar = '';
    let endPar = '';

    // error input hanlder
    if (start !== 0 && start > 0) {
      startPar += `&start=${start}`;
    }
    if (end !== 0 && end > 0 && end > start) {
      endPar += `&end=${end}`;
    }
    // get input id
    const videoId = youtubeParser(userUrl);
    if (videoId == null) return null;

    // set embed code
    const embedCode = `<p><div id="${videoId}" class="youtube video-container"><iframe width="560" height="315" src="http://www.youtube.com/embed/${videoId}?controls=1&disablekb=1&modestbranding=1&showinfo=0&rel=0${startPar}${endPar}" frameborder="0" allowfullscreen></iframe></div></p>`;

    return embedCode;
  }
};

module.exports = YoutubeApi;
