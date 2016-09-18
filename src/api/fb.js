export function init(callback) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '937637919620079',
      xfbml      : true,
      version    : 'v2.7'
    });
    callback();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}

export function fbCheckLogin(successCallback, failCallback) {
    FB.getLoginStatus((r) => {
      if (r.status === 'connected') {
        FB.api('/me', (r) => {
          successCallback(r.name, r.id);
        });
      }
      else {
        failCallback();
      }
    });
}

export function fbLogin(callback) {
  FB.login(callback);
}

export function fbLogout(callback) {
  FB.logout(callback);
}
