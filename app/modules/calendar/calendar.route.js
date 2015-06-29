(function () {
    'use strict';

    angular
        .module('myCommunityApp.calendar')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('calendar', {
                abstract: true,
                url: '/calendar',
                template: '<div ui-view></div>',
                controller: 'CalendarController',
                controllerAs: 'calendar',
                resolve: {
                    events: ['DataSourceService', function (DataSourceService) {
                        return DataSourceService.getEvents();
                    }]
                }
            })
            .state('calendar.list', {
                url: '',
                templateUrl: 'modules/calendar/calendar.tpl.html'
            })
            .state('calendar.detail', {
                url: '/:id',
                templateUrl: 'modules/calendar/detail/calendar-detail.tpl.html',
                controller: 'CalendarDetailController',
                controllerAs: 'calendarDetail'
            });
    }

})();