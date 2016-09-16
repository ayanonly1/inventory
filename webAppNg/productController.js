var app = angular.module('app');
app.controller('productController', function ($scope, $http) {
	var token = window.sessionStorage.token;
	$scope.products = [];
	$http.get('/api/products').then(function (response) {
		$scope.products = response.data;
	});
});