angular.module('app').service('userSvc', function ($http, authentication) {
    var svc = this;
    svc.getUser = function (token) {
        return $http.get('/api/users/get', {
            headers : {
                'X-Auth': token
            }
        }).then(function(res) {
            return res;
        });
    };

    svc.login = function (userId, password) {
        return $http.post('/api/sessions/login', {
            userId: userId,
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
        return $http({
                method: 'POST',
                url: '/api/users/add',
                headers: {
                    'X-Auth': authentication.getToken()
                },
                data: userData
            }).then(function (val) {
                return val.data.status;
            });
    };
});
