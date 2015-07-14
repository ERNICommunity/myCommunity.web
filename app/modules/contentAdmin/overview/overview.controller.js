(function () {
    'use strict';

    angular
        .module('myCommunityApp.contentAdmin')
        .controller('AdminOverviewController',
        ['$scope', '$state', 'DataSourceService', 'YammerLoginData', AdminOverviewController]);

    function AdminOverviewController($scope, $state, DataSourceService, YammerLoginData) {
        //
        $scope.eventsource = DataSourceService.getEvents();
        $scope.myEvents = [{ title: "waa" }, { title: "ooo" }];

        // make sure we move away from our pages on logout
        $scope.$on('YammerUserLogout', onUserLogout)
        function onUserLogout() {
            console.info('ContentAdminController: onUserLogout, navigate away from admin page.')
            if ($state.includes('contentAdmin')) {
                $state.go('calendar.list');
            }
        }
    }
})();