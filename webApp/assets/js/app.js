'use strict'
angular.module('app', []);
angular.module('app', ['ngRoute']);
var baseUrl = 'http://localhost:8080/';

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

    if (authentication.isLoggedIn()) {
        $location.path('/profile');
    }
    
    $scope.login = function (username, password) {
        userSvc.login(username, password)
        .then(function (response) {
            if (response.status === 401) {
            	$scope.message = '*Invalid username or password!';
                $scope.username = '';
                $scope.password = '';
                // $('#usrname').focus();
            }
            else {
            	authentication.saveToken(response.result.token);
            	$location.path("/profile");
            }
        })
    };
}])

var app = angular.module('app');
app.controller('productController', ["$scope", "$http", function ($scope, $http) {
	var token = window.sessionStorage.token;
	$scope.products = [];
	$http.get('/api/products').then(function (response) {
		$scope.products = response.data;
	});
}]);
var app = angular.module('app');
app.controller('profileController', ["$scope", "userSvc", "authentication", "$location", function ($scope, userSvc, authentication, $location) {
	var token = window.sessionStorage.token;

	userSvc.getUser(token).then(function (res) {
		$scope.username = res.data.name;
	});

	$scope.logout = function () {
		authentication.logout();
		$location.path('/login');
	}
}]);
(function () {
	var app = angular.module('app');
	app.controller('registrationController', ["$scope", "userSvc", function ($scope, userSvc) {
		function validate(userData) {
			return userData.mobileNo && userData.mobileNo.length === 10 && userData.name && $scope.password;
		}

		$scope.register = function () {
			var userData = {
				name: $scope.name,
				userId: $scope.email,
				mobileNo: $scope.mobileno,
				password: $scope.password
			};

			if (validate(userData)) {
				userSvc.register(userData).then(function (data) {
					$scope.message = 'Registration Succesful';
				});
			}
			else {
				$scope.message = 'Invalid data';
			}
		};

	}]);
})();
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
            templateUrl: 'adduser.html',
            controller: 'registrationController'
        }).when('/product', {
            templateUrl: 'product.html',
            controller: 'productController'
        });
    };

    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            if (/\/profile|\//g.test($location.path()) && !authentication.isLoggedIn()) {
                $location.path('/login');
            }
        });
    };

    app.config(['$routeProvider', '$locationProvider', config])
    .run(['$rootScope', '$location', 'authentication', run]);

})();
    


angular.module('app').service('userSvc', ["$http", "authentication", function ($http, authentication) {
    var svc = this;
    svc.getUser = function (token) {
        return $http.get('/api/users/get', {
            headers : {
                'X-Auth': token
            }
        }).then(function(res) {
            return res;
        });
    };

    svc.login = function (userId, password) {
        return $http.post('/api/sessions/login', {
            userId: userId,
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
        });
    };

    svc.register = function (userData) {
        return $http({
                method: 'POST',
                url: '/api/users/add',
                headers: {
                    'X-Auth': authentication.getToken()
                },
                data: userData
            }).then(function (val) {
                return val.data.status;
            });
    };
}]);
