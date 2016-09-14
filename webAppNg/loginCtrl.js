angular.module('app').controller('loginCtrl', function ($scope, userSvc) {
    $scope.login = function (username, password) {
        userSvc.login(username, password)
        .then(function (user) {
            console.log(user);
        })
    }
})
