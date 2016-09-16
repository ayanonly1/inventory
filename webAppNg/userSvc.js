angular.module('app').service('userSvc', function ($http) {
    var svc = this;
    svc.getUser = function (token, callback) {
        $http.get('/api/users/get', {
            headers : {
                'X-Auth': token
            }
        }).then(function(res) {
            callback(res);
        });
    };

    svc.login = function (username, password) {
        return $http.post('/api/sessions/login', {
            username: username,
            password: password
        }).then(function (val) {
            svc.token = val.data;
            return {
                status: 200,
                result: {
                    token: svc.token
                }
            };
        }, function (err) {
            return {
                status: 401
            };
        });
    };

    svc.register = function (userData) {
        return $http.post('/api/users/add', userData).then(function (val) {
            return val.data.status;
        });
    };
});
