var app = angular.module('app');
app.controller('profileController', function ($scope, userSvc) {
	var token = window.localStorage.token,
		user = userSvc.getUser(token, function (res) {
			$scope.username = res.data.username;
		});
});