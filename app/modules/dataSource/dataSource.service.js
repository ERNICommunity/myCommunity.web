(function () {
    'use strict';

    angular
        .module('myCommunityApp.DataSource')
        .factory('DataSourceService', DataSourceService);

    DataSourceService.$inject = ['$resource'];

    function DataSourceService($resource) {

        var service = {
            getEvents: getEvents,
            getEvent: getEvent,
            getNewsItems: getNewsItems,
        };

        return service;

        ////////////

        function getEvents() {
            return $resource('http://mycommunity.nova.swisscloud.io/events', {}).query().$promise.then(function (data) {
                return data;
            });
        }

        function getEvent(id) {
            return $resource('http://mycommunity.nova.swisscloud.io/events', {id: '@id'}).get({id: id}).$promise.then(function (data) {
                return data;
            });
        }

        function getNewsItems() {
            return $resource('http://mycommunity.nova.swisscloud.io/news', {}).query().$promise.then(function (data) {
                return data;
            });
        }
    }
})();

