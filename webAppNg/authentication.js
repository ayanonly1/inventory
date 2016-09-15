(function () {
  var app = angular.module('app')
  app.service('authentication', authentication);
  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
        $window.sessionStorage.token = token;
      },
      getToken = function () {
        return $window.sessionStorage.token;
      },
      logout = function() {
        $window.sessionStorage.removeItem('token');
      },
      isLoggedIn = function () {
        var token = getToken();
        return token;
      };

    return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
      isLoggedIn: isLoggedIn
    };
  }
})();
