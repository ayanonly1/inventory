angular.module('app').service('userSvc', function ($http) {
    var svc = this;
    svc.getUser = function (token, callback) {
        $http.get('/api/users/', {
            headers : {
                'X-Auth': token
            }
        }).then(function(res) {
            callback(res);
        });
    }

    svc.login = function (username, password) {
        return $http.post('/api/sessions/', {
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
        })
    }
});
