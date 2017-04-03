var angular = require('angular');

angular.module('main')
  .service('DirectLoanService', DirectLoanService);

DirectLoanService.$inject = ['$http', '$scope'];
function DirectLoanService($http, $scope) {
  // var _this = this;
  // $scope.exists = null;

  $http.get('/api/loans')
    .success((data) => {
      $scope.dls = data;
    })
    .error(() => {
      console.log("There was an error fetching your data.")
    })
}
