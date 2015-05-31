(function () {
    'use strict';

    angular
        .module('myCommunityApp.event')
        .factory('EventService', EventService);

    EventService.$inject = ['$resource'];

    function EventService($resource) {


        var service = {
            getEvents: getEvents,
            getEvent: getEvent
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

    }
})();

