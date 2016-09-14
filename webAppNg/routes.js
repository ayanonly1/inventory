angular.module('app')
    .config(function($routeProvider) {  
        $routeProvider.when('/', {
            //controller: 'dashboardCtrl',
            templateUrl: 'dashboard.html'
        }).when('/register', {
            //controller: 'registerCtrl',
            templateUrl: 'register.html'
        }).when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'login.html'
        })
    })
