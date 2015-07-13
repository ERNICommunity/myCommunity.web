(function () {
    'use strict';

    angular
        .module('myCommunityApp.DataSource')
        .factory('DataSourceService', DataSourceService);

    DataSourceService.$inject = ['$resource'];

    function DataSourceService($resource) {

        //var backendUrl = 'http://mycommunity.nova.scapp.io';
        var backendUrl = 'http://localhost:3000';

        ////////////

        function getEvents() {
            return $resource(backendUrl + '/events', {}).query().$promise.then(function (data) {
                return data;
            });
        }


        function getEvent(id) {
            return $resource(backendUrl + '/events', {id: '@id'}).get({id: id}).$promise.then(function (data) {
                return data;
            });
        }

        function getNewsItems() {
            return $resource(backendUrl + '/news', {}).query().$promise.then(function (data) {
                return data;
            });
        }

        var service = {
            getEvents: getEvents,
            getEvent: getEvent,
            getNewsItems: getNewsItems,
        };
        return service;
    }
})();

