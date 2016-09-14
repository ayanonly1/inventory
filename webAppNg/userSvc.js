angular.module('app').service('userSvc', function ($http) {
    var svc = this;
    svc.getUser = function () {
        return $http.get('/api/users/', {
            headers : {
                'X-Auth': this.token
            }
        })
    }

    svc.login = function (username, password) {
        return $http.post('/api/sessions/', {
            username: username,
            password: password
        }).then(function (val) {
            svc.token = val.data;
            return {
                status: 200,
                result: {user: svc.getUser()}
            };
        }, function (err) {
            return {
                status: 401
            };
        })
    }
});
