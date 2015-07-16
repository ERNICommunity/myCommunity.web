(function () {
    'use strict';

    // Controller for the empty ui-view (declared in route.js):
    // Sets up the parent-scope with things that are used globally in the admin-content views
    angular.module('myCommunityApp.contentAdmin')
        .controller('ContentAdminBaseController', function ($scope, $state, YammerLoginData, events, news) {

            // share across child views
            $scope.events = events;
            $scope.news = news;
            $scope.loginData = YammerLoginData;

            if (!YammerLoginData.isLoggedIn)
            {
                $state.go('calendar.list');
            }

            // make sure we move away from our pages on logout
            $scope.$on('YammerUserLogout', onUserLogout)
            function onUserLogout() {
                console.info('ContentAdminController: onUserLogout, navigate away from admin page.')
                if ($state.includes('contentAdmin')) {
                    $state.go('calendar.list');
                }
            }


        });
})();