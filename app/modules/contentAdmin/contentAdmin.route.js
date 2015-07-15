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
                controller: 'ContentAdminBaseController',
                controllerAs: 'contentAdminBase',
                resolve: {
                    events: ['DataSourceService', function (DataSourceService) { return DataSourceService.getEvents();  }],
                    news: ['DataSourceService', function (DataSourceService) { return DataSourceService.getNewsItems();  }]
                }
            })

            // child views
            .state('contentAdmin.overview', {
                url: '/',
                templateUrl: 'modules/contentAdmin/overview/adminOverview.tpl.html'
            })
            .state('contentAdmin.editEvent', {
                url: '/editEvent/:id',
                templateUrl: 'modules/contentAdmin/editEvent/editEvent.tpl.html'
            })
            .state('contentAdmin.editNews', {
                url: '/editNews/:id',
                templateUrl: 'modules/contentAdmin/editNews/editNews.tpl.html'
            });
    }
})();