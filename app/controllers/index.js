'use strict';

var angular = require('angular');

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
