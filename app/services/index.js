var angular = require('angular');

angular.module('main')
  .service('DirectLoanService', DirectLoanService);

DirectLoanService.$inject = ['$http'];
function DirectLoanService($http, $scope) {
  var _this = this;

  _this.executeGet = function($scope) {
    return $http.get('/api/loans')
  }
}
