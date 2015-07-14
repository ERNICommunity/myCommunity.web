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
                template: '<div ui-view></div>', // template contains only 'view' container for child views
                controller: 'ContentAdminBaseController'
            })

            // child views
            .state('contentAdmin.overview', {
                url: '/',
                templateUrl: 'modules/contentAdmin/overview/adminOverview.tpl.html'
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
})();