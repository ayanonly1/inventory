(function () {
	var app = angular.module('app');
	app.controller('registrationController', function ($scope, userSvc) {
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

	});
})();