webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

// angular.module('dashboard').controller('dashboardController', require('./dashboard.controller'));
function ChartController($scope) {
  console.log("HIT?")
  $scope.months = [
    {
      name: 'January'
    }, {
      name: 'February'
    }, {
      name: 'March'
    }, {
      name: 'April'
    }, {
      name: 'May'
    }, {
      name: 'June'
    }, {
      name: 'July'
    }, {
      name: 'August'
    }, {
      name: 'September'
    }, {
      name: 'October'
    }, {
      name: 'November'
    }, {
      name: 'December'
    }
  ]

  $scope.test = "I am a test"
}
angular.module('main')
  .controller('chartCtrl', ChartController);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module('main').directive('chart', __webpack_require__(6));
// angular.module('dashboard').directive('yepNope', require('./yep-nope.directive'));



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);

angular.module('main').service('GithubStatusService', __webpack_require__(7));



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

angular.module('main', [
  'ngAnimate'
]);

__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(1);
// require('./templates');


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

function ChartDirective() {
  return {
    restrict: 'E'
    // templateUrl: '../templates/chart.template.html'
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


GithubStatusService.$inject = ['$http'];
function GithubStatusService($http) {
    var _this = this;
    _this.getStatus = function getStatus() {
        return $http({
            method: 'jsonp',
            url: 'https://status.github.com/api/status.json?callback=JSON_CALLBACK',
            transformResponse: appendTransform($http.defaults.transformResponse, function(value) {
                return (value.status === 'good');
            })
        });
    }
}

// angular.module('dashboard').service('GithubStatusService', GithubStatusService);

function appendTransform(defaults, transform) {
  defaults = angular.isArray(defaults) ? defaults : [defaults];
  return defaults.concat(transform);
}

module.exports = GithubStatusService;


/***/ })
],[4]);
//# sourceMappingURL=app.bundle.js.map