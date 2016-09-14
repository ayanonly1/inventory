
var app = angular.module('app'),
	route

app.controller('loginCtrl', function ($scope, userSvc, $location) {
	$scope.message = '';
    $scope.login = function (username, password) {
        userSvc.login(username, password)
        .then(function (response) {
            if (response.status === 401) {
            	$scope.message = 'Invalid user';
            }
            else {
            	$location.path("/profile");
            }
        })
    };
})
