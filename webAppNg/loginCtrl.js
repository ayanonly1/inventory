
var app = angular.module('app');

app.controller('loginCtrl', function ($scope, userSvc, $location) {
	$scope.message = '';
    $scope.login = function (username, password) {
        userSvc.login(username, password)
        .then(function (response) {
            if (response.status === 401) {
            	$scope.message = 'Invalid user';
            }
            else {
            	window.localStorage.token = response.result.token;
            	$location.path("/profile");
            }
        })
    };
})
