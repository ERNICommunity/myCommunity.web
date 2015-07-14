(function () {
    'use strict';

    angular
        .module('myCommunityApp.contentAdmin')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('contentAdmin', {
                abstract: true,
                url: '/contentAdmin',
                template: '<div ui-view></div>', // main container for child views
                controller: contentAdminGlobalController
            })

            // child views
            .state('contentAdmin.overview', {
                url: '/',
                templateUrl: 'modules/contentAdmin/overview/overview.tpl.html'
            })
            .state('contentAdmin.editEvent', {
                url: '/editEvent',
                templateUrl: 'modules/contentAdmin/editEvent/editEvent.tpl.html'
            })
            .state('contentAdmin.editNews', {
                url: '/editNews',
                templateUrl: 'modules/contentAdmin/editNews/editNews.tpl.html'
            });
    }

    // TODO: move to own file
    // make some things available globally
    function contentAdminGlobalController($scope, $state) {

        // make sure we move away from our pages on logout
        $scope.$on('YammerUserLogout', onUserLogout)
        function onUserLogout() {
            console.info('ContentAdminController: onUserLogout, navigate away from admin page.')
            if ($state.includes('contentAdmin')) {
                $state.go('calendar.list');
            }
        }
    };

})();