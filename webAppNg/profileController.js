var app = angular.module('app');
app.controller('profileController', function ($scope, userSvc, authentication, $location) {
	var token = window.sessionStorage.token;

	userSvc.getUser(token).then(function (res) {
		$scope.username = res.data.name;
	});

	$scope.logout = function () {
		authentication.logout();
		$location.path('/login');
	}
});