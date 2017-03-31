'use strict';

DashboardController.$inject = ['GithubStatusService'];
function DashboardController(gh) {
    var _this = this;
    _this.github = '';
    gh.getStatus().success(function(status) {
        _this.github = status;
    });
}

// angular.module('dashboard').controller('dashboardController', DashboardController);
