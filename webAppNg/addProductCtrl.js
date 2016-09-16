var app = angular.module('app');
 
app.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}]);

app.service('insertDB', ['$http', function ($http) {
  var svc = this;

  svc.uploadFileToUrl = function(file, uploadUrl){
     var fd = new FormData();
     fd.append('file', file);

     return $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
     }).then(function (val) {
          return {
              status: 200,
              result: {
                  fileInfo: val.data
              }
          };
      }, function (err) {
          return {
              status: 401
          };
      });
  };

  svc.insert = function (pName, category, filename) {
    var location = '/img/product-image/' + filename;

    return $http.post('/api/products/', {
        productName: pName,
        category: category,
        imageLocation: location
    }).then(function () {
        return {
            status: 200,
            result: {
              location: location
            }
        };
    }, function (err) {
        return {
            status: 404
        };
    })
  };
}]);

app.controller('addProductCtrl', ['$scope', 'insertDB', function($scope, insertDB){
  $scope.insert = function(pName, category){
    var file = $scope.pdctImg,
        uploadUrl = '/api/products/uploadPImg';

    insertDB.uploadFileToUrl(file, uploadUrl)
    .then(function (response) {
        if (response.status === 200) {
          insertDB.insert(pName, category, response.result.fileInfo.filename);
        }
    });
  };
}]);