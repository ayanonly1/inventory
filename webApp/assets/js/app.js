'use strict'
angular.module('app', []);
angular.module('app', ['ngRoute']);
var baseUrl = 'http://localhost:8080/';

var app = angular.module('app');
 
app.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}]);

app.service('insertDB', ['$http', function ($http) {
  var svc = this;

  svc.uploadFileToUrl = function(file, uploadUrl){
     var fd = new FormData();
     fd.append('file', file);

     return $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
     }).then(function (val) {
          return {
              status: 200,
              result: {
                  fileInfo: val.data
              }
          };
      }, function (err) {
          return {
              status: 401
          };
      });
  };

  svc.insert = function (pName, category, filename) {
    var location = '/img/product-image/' + filename;

    return $http.post('/api/products/', {
        productName: pName,
        category: category,
        imageLocation: location
    }).then(function () {
        return {
            status: 200,
            result: {
              location: location
            }
        };
    }, function (err) {
        return {
            status: 404
        };
    })
  };
}]);

app.controller('addProductCtrl', ['$scope', 'insertDB', function($scope, insertDB){
  $scope.insert = function(pName, category){
    var file = $scope.pdctImg,
        uploadUrl = '/api/products/uploadPImg';

    insertDB.uploadFileToUrl(file, uploadUrl)
    .then(function (response) {
        if (response.status === 200) {
          insertDB.insert(pName, category, response.result.fileInfo.filename);
        }
    });
  };
}]);
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


// jQuery(document).ready(function() {
	
    
//         Fullscreen background
    
//     $.backstretch("img/1.jpg");   
// });


var app = angular.module('app');

app.controller('loginCtrl', ["$scope", "userSvc", "$location", "authentication", function ($scope, userSvc, $location, authentication) {
	$scope.message = '';
    $scope.login = function (username, password) {
        userSvc.login(username, password)
        .then(function (response) {
            if (response.status === 401) {
            	$scope.message = '*Invalid username or password!';
                $scope.username = '';
                $scope.password = '';
                $('#usrname').focus();
            }
            else {
            	authentication.saveToken(response.result.token);
            	$location.path("/profile");
            }
        })
    };
}])

var app = angular.module('app');
app.controller('profileController', ["$scope", "userSvc", "authentication", "$location", function ($scope, userSvc, authentication, $location) {
	var token = window.sessionStorage.token;

	userSvc.getUser(token, function (res) {
		$scope.username = res.data.username;
	});
	$scope.logout = function () {
		authentication.logout();
		$location.path('/login');
	}
}]);
(function () {
    var app = angular.module('app');

    function config($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            //controller: 'dashboardCtrl',
            templateUrl: 'dashboard.html'
        }).
        when('/register', {
            //controller: 'registerCtrl',
            templateUrl: 'register.html'
        }).when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'login.html'
        }).when('/profile', {
            templateUrl: 'profile.html',
            controller: 'profileController'
        }).when('/profile/adduser', {
            templateUrl: 'adduser.html'
        })
        .when('/addproduct', {
            templateUrl: 'addproduct.html'
        });
    };

    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
                $location.path('/');
            }
        });
    };

    app.config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
    


angular.module('app').service('userSvc', ["$http", function ($http) {
    var svc = this;
    svc.getUser = function (token, callback) {
        $http.get('/api/users/', {
            headers : {
                'X-Auth': token
            }
        }).then(function(res) {
            callback(res);
        });
    }

    svc.login = function (username, password) {
        return $http.post('/api/sessions/', {
            username: username,
            password: password
        }).then(function (val) {
            svc.token = val.data;
            return {
                status: 200,
                result: {
                    token: svc.token
                }
            };
        }, function (err) {
            return {
                status: 401
            };
        })
    }
}]);
