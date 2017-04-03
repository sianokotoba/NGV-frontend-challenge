var angular = require('angular');

angular.module('main')
  .service('DirectLoanService', DirectLoanService);

DirectLoanService.$inject = ['$http'];
function DirectLoanService($http) {
  var _this = this;
  $http.get('/api/loans')
    .success((data) => {
      console.log("IN GET SUCCESS", data)
      console.log("_this", _this)
    })
}
