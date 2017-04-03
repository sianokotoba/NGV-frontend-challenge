'use strict';

DirectLoanService.$inject = ['$http'];
function DirectLoanService($http) {
  var _this = this;
  // _this.getStatus = function getStatus() {
  //   return $http({
  //     method: 'jsonp',
  //     url: 'https://status.github.com/api/status.json?callback=JSON_CALLBACK',
  //     transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
  //         return (value.status === 'good');
  //     })
  //   });
  // }
  $http.get('/api/loans')
    .success((data) => {
      console.log("IN GET SUCCESS", data)
      console.log("_this", _this)
    })
}

// function appendTransform(defaults, transform) {
//   defaults = angular.isArray(defaults) ? defaults : [defaults];
//   return defaults.concat(transform);
// }

module.exports = DirectLoanService;
