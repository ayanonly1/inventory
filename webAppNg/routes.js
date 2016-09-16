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
    

