(function () {
    'use strict';

    angular
        .module('myCommunityApp.contentAdmin')
        .controller('AdminOverviewController',
        ['$scope', 'DataSourceService', 'YammerLoginData', AdminOverviewController]);

    function AdminOverviewController($scope, YammerLoginData) {
        $scope.loginData = YammerLoginData;
    }
})();