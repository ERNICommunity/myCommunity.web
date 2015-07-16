(function () {
    'use strict';

    angular
        .module('myCommunityApp.contentAdmin')
        .controller('AdminOverviewController', function ($scope, $state, DataSourceService) {

            $scope.deleteEvent = function (id) {
                DataSourceService.deleteEvent(id, $scope.loginData, onSubmitted);
            };

            $scope.deleteNewsItem = function (id) {
                DataSourceService.deleteNewsItem(id, $scope.loginData, onSubmitted);
            };

            function onSubmitted(success) {
                if (success) $state.go('contentAdmin.overview', {}, { reload: true });
            }
        });
})();